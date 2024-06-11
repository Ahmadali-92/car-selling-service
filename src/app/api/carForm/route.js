import { NextResponse } from 'next/server';
import { db } from '@/dataBase/db';
import carModel from '@/model/carModel';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
        const { model, price, phoneNumber, maxNumberOfCopies, city, userId, images } = await request.json();
        await db()    

    // Handle images array
    let imagesArray = [];
    if (typeof images === 'string') {
      imagesArray.push(images);
    } else if (Array.isArray(images)) {
      imagesArray = images;
    } else {
      throw new Error("Images should be a string or an array");
    }

    // Upload images to Cloudinary and collect their URLs
    let imagesLink = [];
    for (let i = 0; i < imagesArray.length; i++) {
      const result = await cloudinary.v2.uploader.upload(imagesArray[i], {
        folder: 'car-selling-services-Images',
      });
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    // Create the car form entry in the database
    const createFormData = await carModel.create({ 
      model, 
      price, 
      phoneNumber, 
      maxNumberOfCopies, 
      city, 
      user: userId,
      images: imagesLink 
    });
    
    if (!createFormData) {
      return NextResponse.json({ status: 401, data: "Something went wrong" });
    }

    return NextResponse.json({ status: 201, data: createFormData });
  } catch (error) {
    console.error('Error processing request:', error.message);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
}
