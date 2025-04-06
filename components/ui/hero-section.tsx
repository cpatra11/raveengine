"use client";

import { cn } from "@/lib/utils";
// import { motion } from "motion/react";
import { motion } from "framer-motion";
import { ArrowRight, Wand2 } from "lucide-react";

function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-purple-200 opacity-20 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-200 opacity-20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center space-x-2 mb-8"
            >
              <span className="inline-flex items-center px-3 py-1 text-sm text-blue-600 bg-blue-50 border border-blue-100 rounded-full">
                <Wand2 className="w-4 h-4 mr-2" />
                Powered by AI
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-purple-700">
              Turn Testimonials into
              <br />
              <span className="text-blue-600">Powerful Marketing Assets</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-600">
              Transform boring customer feedback into compelling case studies,
              sales decks, and social proof using AI magic.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all duration-200"
            >
              See How It Works
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-8 mt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-4">
              Trusted by marketing teams worldwide
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              {/* Add your client logos here */}
              <div className="h-8 w-24 bg-gray-200 rounded-md" />
              <div className="h-8 w-24 bg-gray-200 rounded-md" />
              <div className="h-8 w-24 bg-gray-200 rounded-md" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Moving gradient effect */}
      <div className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
}
export default HeroSection;
