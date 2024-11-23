'use client'

import React from 'react';
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="w-full py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 animate-gradient-x"></div>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Welcome to <span className="text-green-300">Dot Dager</span>
          </h1>
          <p className="text-xl mb-6 text-white">Where Creativity Meets Curiosity</p>
          <p className="text-lg mb-8 text-white">
            Exploring the intersections of technology, art, and philosophy.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="w-[300px] h-[300px] relative">
            <Image
              src="/images/Hero.jpg"
              alt="Dot Dager"
              fill
              className="rounded-full border-4 border-green-300 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}