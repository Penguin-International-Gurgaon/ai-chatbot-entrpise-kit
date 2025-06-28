'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { generateWelcomeMessage } from '@/lib/greetings';

export const Greeting = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to PenguinChat! How can I help you today?");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWelcomeMessage = async () => {
      try {
        const message = await generateWelcomeMessage();
        setWelcomeMessage(message);
      } catch (error) {
        console.warn('Failed to generate welcome message:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWelcomeMessage();
  }, []);

  return (
    <div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-semibold"
      >
        {isLoading ? (
          <div className="animate-pulse bg-muted rounded-md h-8 w-80" />
        ) : (
          welcomeMessage
        )}
      </motion.div>
    </div>
  );
};
