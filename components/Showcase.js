import React from "react"
import Image from "next/image"

function Showcase() {
  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800">Showcase</h2>
      <div className="flex justify-center items-center gap-8">
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <Image
            src="/bento-grid.png"
            alt="Bento Grid"
            width={500}
            height={500}
            className="w-full h-auto transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <Image
            src="/bento-grid (1).png"
            alt="Bento Grid (1)"
            width={500}
            height={500}
            className="w-full h-auto transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  )
}

export default Showcase
