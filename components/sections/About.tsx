"use client"

import { Check } from 'lucide-react'
import { motion } from 'framer-motion';

export default function About() {
  const interests = ['Programming', 'Cats', 'Guitars', 'Philosophy', 'Pickles']

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="w-full bg-background py-24"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-400 text-center">About Me</h2>
        <div className="flex flex-col md:flex-row items-start justify-between space-y-8 md:space-y-0 md:space-x-24">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <p className="text-lg mb-6">
            Hi there! I'm Mariano, but you might know me as Dot Dager. I'm deeply passionate about creativity and have an unquenchable curiosity for the world around us.
            </p>
            <p className="text-lg">
            My wide range of interests constantly sparks my creativity and motivates me to explore new ideas and concepts.
            </p>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-6 text-green-400">Key Interests:</h3>
            <ul className="space-y-2">
              {interests.map((interest, index) => (
                <li key={index} className="flex items-center">
                  <Check className="text-green-500 mr-2" />
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
