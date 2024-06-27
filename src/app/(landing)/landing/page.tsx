"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Page = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const router = useRouter();

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0, y: -10 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            staggerChildren: 0.27,
          },
        },
      }}
      className="h-screen w-full flex items-center justify-center flex-col text-center bg-landing bg-no-repeat bg-cover bg-center"
    >
      <motion.h3
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="text-gray-500 text-lg mb-3"
      >
        Welcome To
      </motion.h3>
      <motion.h1
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="text-4xl font-bold text-gray-800 mb-4"
      >
        BLENDER
      </motion.h1>
      <motion.p
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="text-gray-700 text-lg w-[70%]"
      >
        Blender is a social media website that supports seamless connections,
        creative sharing, and vibrant communities. Join us to discover new
        friends, share your passions, and engage in meaningful conversations.
        Welcome to the future of social networking!
      </motion.p>
      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="mt-6 flex justify-center space-x-4"
      >
        <motion.button
          onClick={() => {router.push("/sign-in")}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
        >
          Sign In
        </motion.button>
        <motion.button
          onClick={() => {router.push("/sign-up")}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border border-gray-400 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
        >
          Sign Up
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Page;
