"use client"

import React, { useEffect, useState } from 'react'
import { Player } from "@remotion/player";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';


function PlayerDialog({ playVideo, videoId }) {

    const [openDialog, setOpenDialog] = useState(false)
    const [videoData, setVideoData] = useState()
    const [durationInFrame, setDurationInFrame] = useState(100)
    const router = useRouter()


    useEffect(() => {

        setOpenDialog(!openDialog)
        videoData && GetVideoData()

    }, [playVideo])

    const GetVideoData = async () => {
        const result = await db.select().from(VideoData)
            .where(eq(VideoData.id, videoId))

        setVideoData(result[0])
    }

    return (
        <div>
            <Dialog open={openDialog}>
                <DialogContent className='bg-white flex flex-col items-center'>
                    <DialogHeader>
                        <DialogTitle className='text-3xl font-bold my-5'>Your Video is Ready! 🎉</DialogTitle>
                        <DialogDescription>
                            <Player
                                component={RemotionVideo}
                                durationInFrames={Number(durationInFrame.toFixed(0))}
                                compositionWidth={300}
                                compositionHeight={450}
                                fps={30}
                                controls={true}
                                inputProps={{
                                    ...videoData,
                                    setDurationInFrame: (val) => setDurationInFrame(val)
                                }}
                            />
                            <div className='flex gap-10 mt-10'>
                                <Button variant='ghost' onClick={() => {router.replace('/dashboard'); setOpenDialog(false)}}>Cancel</Button>
                                <Button>Export</Button>
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default PlayerDialog