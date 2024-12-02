'use client'

import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CustomLoading from './_components/CustomLoading'

function page() {

  const [loading, setLoading] = useState()
  const [formData, setFormData] = useState([])
  const [videoScript, setVideoScript] = useState()

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const GetVideoScript = async () => {
    setLoading(true)
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with Al image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`
    
    const result = await axios.post('/api/get-video-script', {
      prompt: prompt
    }).then((response) => {
      console.log(response.data.result);
      setVideoScript(response.data.result)
    })
    setLoading(false)
  }

  const onCreateClickHandler = () => {
    GetVideoScript()
  }
  

  return (
    <div>
      <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>

      <div className='mt-10 shadow-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange}/>

        <Button onClick={onCreateClickHandler} className='mt-10 w-full'>Create Short Video</Button>
      </div>

      <CustomLoading loading={loading}/>
    </div>
  )
}

export default page
