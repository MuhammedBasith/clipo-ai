'use client'

import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { VideoData } from "@/configs/schema";
import VideoList from "./_components/VideoList";

export default function Dashboard() {

    const [videoList, setVideoList] = useState([])
    const { user } = useUser()

    /**
     * Used to get users video.
     */

    const GetVideoList = async () => {
        const result = await db.select().from(VideoData)
            .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress))
        setVideoList(result)
    }

    useEffect(() => {
        user && GetVideoList()
    })

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
                <Link href={'/dashboard/create-new'}>
                    <Button> + Create New</Button>
                </Link>
            </div>

            {videoList?.length === 0 && <div>
                <EmptyState />
            </div>}

            <VideoList videoList={videoList}/>
        </>
    )
}