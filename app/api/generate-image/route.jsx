import { storage } from "@/configs/FirebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
    try {

        const { prompt } = await req.json()
        console.log("Inside gen image route** " + prompt);
        

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const output = await replicate.run(
            "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
            {
              input: {
                width: 1024,
                height: 1280,
                prompt: prompt,
                num_outputs: 1,
              }
            }
          );
          
          const base64Image = "data:image/png;base64," + await ConvertImage(output[0])
          const fileName = 'ai-short-video-files/' + Date.now() + ".png"
          const storageRef = ref(storage, fileName)

          await uploadString(storageRef, base64Image, 'data_url')

          const downlaodUrl = await getDownloadURL(storageRef)
          console.log(downlaodUrl);
          
          return NextResponse.json({'result': downlaodUrl})

    } catch (error) {

    }
}

const ConvertImage = async (imageUrl) => {
    try {
        const response = await axios.get(imageUrl, {responseType: 'arraybuffer'})
        const base64Image = Buffer.from(response.data).toString("base64")
        return base64Image
    } catch (error) {
        console.log(error);
        
    }

}