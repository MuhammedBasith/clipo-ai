import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
    return (
        <div className='p-3 px-5 flex items-center justify-between shadow-md'>
            <div className='flex gap-3 items-center'>
                <Image src={'/ClipAILogo.png'} width={40} height={40} alt='Clipo AI Logo'/>
                <h2 className='font-bold text-xl'>AI Short Video Generator</h2>
            </div>
            <div className='flex gap-3 px-5'>
                <Button>Dashboard</Button>
                <UserButton />
            </div>
        </div>
    )
}

export default Header