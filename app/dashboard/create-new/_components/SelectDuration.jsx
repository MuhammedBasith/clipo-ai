'use client'

'use client'

import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

function SelectDuration({ onUserSelect }) {
    return (
        <div>
            <h2 className='font-bold text-2xl text-primary mb-6 mt-7'>Duration</h2>
            <p className='text-gray-500'>Select the duration of your video</p>
            <Select onValueChange={(value) => {
                onUserSelect('duration', value)
            }}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg">
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>

                    <SelectItem value='30 Seconds'>30 Seconds</SelectItem>
                    <SelectItem value='60 Seconds'>60 Seconds</SelectItem>

                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectDuration