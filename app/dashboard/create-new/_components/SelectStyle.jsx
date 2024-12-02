'use client'

import Image from 'next/image'
import React, { useState } from 'react'

function SelectStyle({onUserSelect}) {

    const [selectedOption, setSelectedOption] = useState()

    const styleOptions = [
        {
            name: 'Realistic',
            image: 'https://r2.starryai.com/results/1010118994/80d33a06-647a-4810-b500-2630a6acc80a.webp'
        },
        {
            name: 'Cartoon',
            image: 'https://r2.starryai.com/results/1012191310/9ebb11f7-4141-432c-880f-4897ba302311.webp'
        },
        {
            name: 'Comic',
            image: 'https://r2.starryai.com/results/345424645/ca4b9270-e7e4-4664-a935-faa1cb507cec.webp'
        },
        {
            name: 'Water Color',
            image: 'https://img.cdn-pictorem.com/uploads/collection/J/JO1BDP3IFE/900_draszyr_Girl_watercolor_no.3_600.jpg'
        },
        {
            name: 'GTA Style',
            image: 'https://photostylelab.com/wp-content/uploads/2024/10/gta-style-sample.jpeg'
        },
    ]

    return (
        <div>
            <h2 className='font-bold text-2xl text-primary mb-6 mt-7'>Style</h2>
            <p className='text-gray-500'>Select your Video Style</p>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3'>
                {styleOptions.map((item, index) => (
                    <div key={index} className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl ${selectedOption === item.name && 'border-4 border-primary'}`}>
                        <Image src={item.image} alt={item.name} width={100} height={100}
                        className='h-48 object-cover rounded-lg w-full'
                        onClick={() => {
                            setSelectedOption(item.name)
                            onUserSelect('imageStyle', item.name)
                        }}
                        />
                        <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg'>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectStyle