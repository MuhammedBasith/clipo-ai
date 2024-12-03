'use client'

import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CustomLoading from './_components/CustomLoading'
import { v4 as uuidv4 } from 'uuid'
import { VideoDataContext } from '@/app/_context/VideoDataContext'
import { db } from '@/configs/db'
import { VideoData } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'

function Page() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ topic: '', imageStyle: '', duration: '' })
  const [videoScript, setVideoScript] = useState(null)
  const [audioFileURL, setAudioFileURL] = useState(null)
  const [captions, setCaptions] = useState(null)
  const [imageList, setImageList] = useState([])
  const { videoData, setVideoData } = useContext(VideoDataContext)

  const { user } = useUser()

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const GetVideoScript = async () => {
    setLoading(true)
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with Al image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`

    try {
      const response = await axios.post('/api/get-video-script', { prompt })
      const scriptData = response.data.result
      setVideoData(prev => ({ ...prev, videoScript: scriptData }))
      
      setVideoScript(scriptData)
      await GenerateAudioFile(scriptData)
    } catch (error) {
      console.error('Error fetching video script:', error)
    }
    setLoading(false)
  }

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true)

    let script = ''
    const id = uuidv4()
    videoScriptData.forEach(item => {
      script = script + item.ContentText + " "
    })

    try {
      const response = await axios.post('/api/generate-audio', { text: script, id })
      const audioUrl = response.data.result
      setVideoData(prev => ({ ...prev, audioFileUrl: audioUrl }))
      setAudioFileURL(audioUrl)
      await GenerateAudioCaption(audioUrl)
    } catch (error) {
      console.error('Error generating audio:', error)
    }

    setLoading(false)
  }

  const GenerateAudioCaption = async (audioFileURL) => {
    setLoading(true)

    try {
      const response = await axios.post('/api/generate-caption', { audioUrl: audioFileURL })
      const captionsData = response.data.result
      setVideoData(prev => ({ ...prev, captions: captionsData }))
      setCaptions(captionsData)
      await GenerateImage(videoScript)
    } catch (error) {
      console.error('Error generating captions:', error)
    }

    setLoading(false)
  }

  const GenerateImage = async (videoScript) => {
    setLoading(true)

    console.log("inside gen img" + videoScript);
    
    const imagePromises = videoScript.map(async (element) => {
      try {
        const response = await axios.post('/api/generate-image', { prompt: element?.imagePrompt })
        return response.data.result
      } catch (error) {
        console.error('Error generating image:', error)
        return null
      }
    })

    try {
      const images = await Promise.all(imagePromises)
      setVideoData(prev => ({ ...prev, imageList: images.filter(Boolean) }))  // filter out null values
      setImageList(images.filter(Boolean))
    } catch (error) {
      console.error('Error generating images:', error)
    }

    setLoading(false)
  }

  const onCreateClickHandler = () => {
    GetVideoScript()
  }

  useEffect(() => {

    if(Object.keys('videoData').length === 4){
      saveVideoData(videoData)
    }

  }, [videoData])

  const saveVideoData = async (videoData) => {
    setLoading(true)

    const result = await db.insert(VideoData).values({
      script: videoData?.videoScript,
      audioFileUrl: videoData?.captions,
      captions: videoData?.captions,
      imageList: videoData?.imageList,
      createdBy: user?.primaryEmailAddress?.emailAddress
    }).returning({id: VideoData?.id})

    console.log(result);
    
    setLoading(false)

  }

  return (
    <div>
      <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>

      <div className='mt-10 shadow-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />

        <Button onClick={onCreateClickHandler} className='mt-10 w-full'>Create Short Video</Button>
      </div>

      <CustomLoading loading={loading} />
    </div>
  )
}

export default Page
