import React, { useState } from 'react'
import { Thumbnail } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';

function VideoList({ videoList, setDurationInFrame }) {

    const [openPlayDialog, setOpenPlayerDialog] = useState(false)
    const [videoId, setVideoId] = useState()

    return (
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:gird-cols-4 gap-10'>
            {videoList.map((video, index) => {
                <div
                onClick={() => {setOpenPlayerDialog(Date.now()); setVideoId(video?.id)}}
                className='cursor-pointer hover:scale-105 transition-all'>
                    <Thumbnail
                        component={RemotionVideo}
                        compositionWidth={300}
                        compositionHeight={390}
                        frameToDisplay={30}
                        durationInFrames={120}
                        style={{
                            borderRadius: 15
                        }}
                        fps={30}
                        inputProps={{
                            ...video,
                            setDurationInFrame: (v) => console.log(v)
                            
                        }}
                    />

                </div>
            })}

            <PlayerDialog playVideo={openPlayDialog} videoId={videoId} />
        </div>
    )
}

export default VideoList