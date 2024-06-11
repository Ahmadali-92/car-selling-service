'use client'
import React, { useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

const CarForm = () => {
  const router = useRouter()
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const notify = () => toast("Submited Successfully!");
  const exeedImage = () => toast("Increase the no of copies");

  const [form, setForm] = useState({
    carModel: "",
    price: "",
    phoneNumber: "",
    city: "",
    maxNumberOfCopies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    const getUserDataInToLocalStorage = localStorage.getItem("userData");
    e.preventDefault();

    const formData = new FormData();
    formData.append('model', form.carModel);
    formData.append('price', Number(form.price));
    formData.append('phoneNumber', Number(form.phoneNumber));
    formData.append('city', form.city);
    formData.append('maxNumberOfCopies', Number(form.maxNumberOfCopies));
    formData.append('userId', getUserDataInToLocalStorage);

    //upload images on cloudinary you can see image on new tab for the response 'url'
    images.forEach((image) => {
      formData.append("images", image);
    });
    if (images.length <= form.maxNumberOfCopies) {
      try {
        const response = await axios.post('/api/carForm', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.status == 201) {
          notify();
          setForm({
            carModel: "",
            price: "",
            phoneNumber: "",
            city: "",
            maxNumberOfCopies: "",
          })
          setImagesPreview([])
          console.log('Form submitted successfully',response);
        } else {
          console.error('Form submission failed:');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      exeedImage();
    }
   
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagesPreview(imagesPreview.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    router.push('/login')
    
  }

  return (
    <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={handleChange}
          value={form.carModel}
          type="text"
          name="carModel"
          id="car_model"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 focus:outline-none focus:ring-0 peer"
          placeholder=" "
          required
        />
        <label htmlFor="car_model" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Car Model</label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={handleChange}
          value={form.price}
          type="number"
          name="price"
          id="price"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 focus:outline-none focus:ring-0 peer"
          placeholder=" "
          required
        />
        <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={handleChange}
          value={form.phoneNumber}
          type="number"
          name="phoneNumber"
          id="phone_number"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 focus:outline-none focus:ring-0 peer"
          placeholder=" "
          required
          pattern="\d{11}"
          title="Please enter exactly 11 digits"
        />
        <label htmlFor="phone_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
      </div>
      <div className="flex mb-5">
        <label className="text-sm font-medium text-gray-900 dark:text-gray-500 mr-1">City :</label>
        <div className="flex items-center me-4">
          <input
            id="lahore"
            type="radio"
            value="Lahore"
            name="city"
            onChange={handleChange}
            checked={form.city === "Lahore"}
            className="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-500 dark:border-gray-600"
          />
          <label htmlFor="lahore" className="text-sm font-medium text-gray-900 dark:text-gray-700">Lahore</label>
        </div>
        <div className="flex items-center me-4">
          <input
            id="karachi"
            type="radio"
            value="Karachi"
            name="city"
            onChange={handleChange}
            checked={form.city === "Karachi"}
            className="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-500 dark:border-gray-600"
          />
          <label htmlFor="karachi" className="text-sm font-medium text-gray-900 dark:text-gray-700">Karachi</label>
        </div>
      </div>
       <div className="flex gap-10">
        <label htmlFor="maxNumberOfCopies" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">No of copies</label>
        <select
          id="maxNumberOfCopies"
          name="maxNumberOfCopies"
          type="number"
          onChange={handleChange}
          value={form.maxNumberOfCopies}
          className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-0 focus:outline-none block p-1 dark:text-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:bg-white dark:focus:ring-0 transition duration-300 transform"
          required
        >
          <option>Select</option>
          {[...Array(10).keys()].map(num => (
            <option key={num + 1} value={num + 1}>{num + 1}</option>
          ))}
        </select>
      </div>



      <div className="max-w-md mx-auto mt-10">
      <div className="flex flex-col items-center mb-5">
        <input
          type="file"
          name="avatar"
          accept="image/*"
            multiple
            required
          onChange={handleImagesChange}
          className="cursor-pointer w-full h-12 border-none transition-all duration-500 p-2 text-gray-700 bg-white hover:bg-gray-200"
        />
      </div>

      <div className="w-full overflow-auto flex flex-wrap">
  {imagesPreview.map((image, index) => (
    <div key={index} className="relative w-16 h-16 m-1">
      <div className="relative">
        <button
          className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-100 transition-opacity duration-300 "
          style={{ fontSize: '10px' }} 
          onClick={() => handleDeleteImage(index)}
        >
          X
        </button>
        <div className="w-full h-full">
          <Image src={image} alt="Product Preview" width={80} height={80} /> 
        </div>
      </div>
    </div>
  ))}
        </div>
        
  <ToastContainer />
    </div>
      <div className='flex justify-between'>
      <button type="submit" className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Form</button>
      <button onClick={handleLogout} type="button" className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log out</button>
      </div>
    </form>
  );
};

export default CarForm;
