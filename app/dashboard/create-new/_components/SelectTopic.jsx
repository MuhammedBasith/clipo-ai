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


function SelectTopic({ onUserSelect }) {

    const options = ["Custom Prompt", "Random AI Story", "Scary Story", "Historical Fact", "Bed Time Story", "Motivational", "Fun Facts"]
    const [selectedTopic, setSelectedTopic] = useState()

    return (
        <div>
            <h2 className='font-bold text-2xl text-primary mb-6'>Content</h2>
            <p className='text-gray-500'>What is the topic of your video?</p>
            <Select onValueChange={(value) => {
                setSelectedTopic(value)
                value !== "Custom Prompt" && onUserSelect('topic', value)
            }}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg">
                    <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((item, index) => (
                        <SelectItem key={index} value={item}>{item}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {selectedTopic === 'Custom Prompt' &&
                <Textarea className="mt-4"
                    onChange={(event) => onUserSelect('topic', event.target.value)}
                    placeholder="Write a detailed prompt on what kind of video you want to generate." />
            }

        </div>
    )
}

export default SelectTopic