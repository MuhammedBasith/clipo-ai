import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useContext } from 'react'

function Header() {
    const {userDetail, setUserDetail} = useContext(UserDetailContext)

    return (
        <div className='p-3 px-5 flex items-center justify-between shadow-md'>
            <div className='flex gap-3 items-center'>
                <Image src={'/ClipAILogo.png'} width={40} height={40} alt='Clipo AI Logo'/>
                <h2 className='font-bold text-xl'>AI Short Video Generator</h2>
            </div>
            <div className='flex gap-3 px-5 items-center'>
                <div className='flex gap-2 items-center'>
                    <Image src={'./coin.png'} width={20} height={20}/>
                    <h2>{userDetail?.credits}</h2>
                </div>
                <Button>Dashboard</Button>
                <UserButton />
            </div>
        </div>
    )
}

export default Header