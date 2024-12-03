import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'; // import the VisuallyHidden component

function CustomLoading({ loading }) {
    return (
        <div>
            <AlertDialog open={loading}>
                <AlertDialogContent className='bg-white'>
                    <AlertDialogHeader>
                        {/* Wrap AlertDialogTitle in VisuallyHidden if you want to hide it visually */}
                        <VisuallyHidden>
                            <AlertDialogTitle>Loading...</AlertDialogTitle>
                        </VisuallyHidden>
                    </AlertDialogHeader>
                    <div className='bg-white flex flex-col items-center my-10 justify-center'>
                        <Image src={'/progressCrane.gif'} width={100} height={100} alt='Progress animation.' />
                        <h2>Generating your video. Do not refresh! 👀</h2>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default CustomLoading
