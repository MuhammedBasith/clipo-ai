'use client'

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";

export default function Dashboard() {

    const [videoList, setVideoList] = useState([])

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
        </>
    )
}