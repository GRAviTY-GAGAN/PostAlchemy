import { Sparkles } from 'lucide-react';
import React from 'react'

const HeroSection = () => {
  return (
    <div className=' m-10'>
        <div className='flex flex-col justify-center items-center'>
          <div className=' flex justify-center items-center gap-2 bg-[#E7E7E9] w-fit p-1.5 pl-5 pr-5 rounded-2xl'>
            <Sparkles className="h-4 w-4" />
            AI-Powered Content Generation
          </div>
          <h1 style={{wordSpacing: '8px'}} className=' text-5xl font-extrabold flex flex-col justify-center items-center m-8 bg-clip-text text-transparent bg-[linear-gradient(90deg,_rgba(15,23,42,1)_0%,_rgba(124,130,141,1)_50%)]'>
            Turn Ideas Into
            <br />
            <span>Viral Posts</span>
          </h1>
          <p style={{wordSpacing: '6px'}} className=' max-w-3xl text-center'>
            Transform any topic into compelling social media content for LinkedIn, Twitter, and Instagram. 
            Powered by AI research and expert copywriting techniques.
          </p>
        </div>
    </div>
  )
}

export default HeroSection;