"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CarForm from "./form/page";

export default function Home() {
          const router = useRouter();

          useEffect(() => {
                    const getUserDataInToLocalStorage =
                              localStorage.getItem("userData");
                    if (getUserDataInToLocalStorage) {
                              router.push("/");
                    } else {
                              router.push("/login");
                    }
          }, [router]);

          return (
                    <>
                              <CarForm />
                    </>
          );
}
