"use client";

import { cn } from "@/lib/utils";
// import { motion } from "motion/react";
import { motion } from "framer-motion";
import { Sparkles, Target, Rocket, BarChart4 } from "lucide-react";

const benefits = [
  {
    title: "Win More Deals",
    description:
      "Convert skeptical prospects into customers by showcasing real success stories that resonate with their needs",
    icon: Target,
    color: "blue",
  },
  {
    title: "Build Trust Instantly",
    description:
      "Leverage social proof strategically across all channels to establish credibility and authority in your market",
    icon: Sparkles,
    color: "purple",
  },
  {
    title: "Scale Your Impact",
    description:
      "Turn one testimonial into multiple marketing assets - from social media snippets to detailed case studies",
    icon: Rocket,
    color: "indigo",
  },
  {
    title: "Measure Results",
    description:
      "Track how your social proof performs and optimize your marketing with data-driven insights",
    icon: BarChart4,
    color: "green",
  },
];

function BenefitsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Transform Customer Stories into Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Stop letting powerful testimonials gather dust. Turn them into your
            strongest marketing assets.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg" />
              <div className="relative bg-white p-8 rounded-lg border border-gray-100 hover:border-blue-100 transition-all duration-300 hover:shadow-xl">
                <div
                  className={cn(
                    "inline-block p-3 rounded-lg mb-4",
                    benefit.color === "blue" && "bg-blue-50 text-blue-600",
                    benefit.color === "purple" &&
                      "bg-purple-50 text-purple-600",
                    benefit.color === "indigo" &&
                      "bg-indigo-50 text-indigo-600",
                    benefit.color === "green" && "bg-green-50 text-green-600"
                  )}
                >
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Start Converting Testimonials Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default BenefitsSection;
