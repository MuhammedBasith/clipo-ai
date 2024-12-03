// pages/api/polly.js
import { storage } from '@/configs/FirebaseConfig';
import AWS from 'aws-sdk';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

// Configure AWS Polly
AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const polly = new AWS.Polly();

export async function POST(req) {
    const { text, id } = await req.json();
    const storageRef = ref(storage, 'ai-short-videos/' + id + '.mp3')

    const params = {
        Text: text,
        OutputFormat: 'mp3',
        VoiceId: 'Joanna',
    };

    try {
        // Synthesize the speech using Polly
        const data = await polly.synthesizeSpeech(params).promise();

        const audioBuffer = Buffer.from(data.AudioStream, 'binary')

        await uploadBytes(storageRef, audioBuffer, {
            contentType: 'audio/mp3'
        })

        const downloadUrl = await getDownloadURL(storageRef)

        // Uncomment the below code if you want to save the audio to local as well.

        // // Define the path where the MP3 file will be saved
        // const filePath = path.join(process.cwd(), 'public', 'generated', 'speech.mp3');

        // // Make sure the directory exists
        // const dir = path.dirname(filePath);
        // if (!fs.existsSync(dir)) {
        //     fs.mkdirSync(dir, { recursive: true });
        // }

        // // Write the audio stream to the file
        // fs.writeFileSync(filePath, data.AudioStream);

        return NextResponse.json({
            message: 'MP3 file uploaded successfully',
            result: downloadUrl,
        });
    } catch (error) {
        console.error('Error synthesizing speech:', error);
    }
}

