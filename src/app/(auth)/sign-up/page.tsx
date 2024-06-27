"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import InputForm from '@/components/InputForm';
import { Button } from "@/components/ui/button";
import { signInFormInputs } from '../../../../constants/constants';
import { addUserDoc, createAccountWithEmailAndPassword } from '../../../../lib/firebase';
import Image from 'next/image';
import { uploadImage } from '../../../../lib/firebase';
import Link from 'next/link';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  reEnterPassword: string;
  imageURL: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  reEnterPassword?: string;
  image?: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: '',
    password: '',
    reEnterPassword: "",
    imageURL: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setIsUploading(true);

      try {
        const downloadURL = await uploadImage(file, setUploadProgress);
        setFormData((prevFormData) => ({
          ...prevFormData,
          imageURL: downloadURL,
        }));
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setIsUploading(false);
      }
    } else {
      setImagePreview(null);
    }
  };

  const validate = () => {
    const errors: FormErrors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (formData.reEnterPassword !== formData.password) {
      errors.reEnterPassword = "Passwords do not match";
    }
    if (!formData.imageURL) {
      errors.image = "Image is required";
    }
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      await createAccountWithEmailAndPassword(formData.email, formData.password);
      await addUserDoc(formData);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <motion.div 
      className='h-[100vh] flex flex-col justify-center items-center w-full'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className='bg-white p-8 rounded shadow-md w-[90%] max-w-md'
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
      >
        <h1 className='text-3xl font-bold text-gray-700 mb-6'>BLENDER SIGN UP</h1>
        <motion.form 
          onSubmit={handleSubmit} 
          className='flex flex-col gap-5'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {signInFormInputs.map((input) => (
            <div key={input.name} className="w-full">
              <InputForm 
                type={input.type} 
                placeholder={input.placeHolder} 
                name={input.name}
                value={formData[input.name as keyof FormData]} 
                onChange={handleChange} 
              />
              {formErrors[input.name as keyof FormErrors] && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors[input.name as keyof FormErrors]}
                </p>
              )}
            </div>
          ))}
          <div className="flex items-center justify-between">
            <div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
              />
              {formErrors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.image}
                </p>
              )}
            </div>
            {imagePreview && (
              <div>
                <Image src={imagePreview} alt="Image Preview" width='80' height="80" className='rounded'/>
              </div>
            )}
          </div>
          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          )}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <Button type="submit" variant="outline" className='w-full' disabled={isUploading}>
              {isUploading ? "Uploading..." : "Submit"}
            </Button>
          </motion.div>
        </motion.form>
        <motion.div className="flex justify-between mt-4 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        >
          <Link href="/sign-in" className='underline'>
            Already have an account?
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Page;
