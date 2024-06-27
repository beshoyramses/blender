"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import InputForm from '@/components/InputForm';
import { Button } from "@/components/ui/button";
import { signInWithEmail } from '../../../../lib/firebase';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors: FormErrors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        await signInWithEmail(formData.email, formData.password);
        // Redirect or show success message
      } catch (error) {
        console.error('Sign-in failed:', error);
        setErrorMessage('Invalid email or password.');
      } finally {
        setIsLoading(false);
      }
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
        <h1 className='text-3xl font-bold text-gray-700 mb-6'>BLENDER SIGN IN</h1>
        <motion.form 
          onSubmit={handleSubmit} 
          className='flex flex-col gap-5'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="w-full">
            <InputForm 
              type="email" 
              placeholder="Email" 
              name="email"
              value={formData.email} 
              onChange={handleChange} 
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.email}
              </p>
            )}
          </div>
          <div className="w-full">
            <InputForm 
              type="password" 
              placeholder="Password" 
              name="password"
              value={formData.password} 
              onChange={handleChange} 
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.password}
              </p>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">
              {errorMessage}
            </p>
          )}
          {isLoading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
          )}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <Button type="submit" variant="outline" className='w-full' disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </motion.div>
        </motion.form>
        <motion.div className="flex justify-between mt-4 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        >
          <Link href="/sign-up" className='underline'>
            Dont have an account?
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignInPage;
