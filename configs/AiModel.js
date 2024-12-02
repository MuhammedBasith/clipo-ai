const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with Al image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n[\n  {\n    \"imagePrompt\": \"Realistic image of a bustling 1920s speakeasy, dimly lit with jazz musicians playing on a stage, people dancing and laughing, Art Deco style decor.\",\n    \"ContentText\": \"Our story begins in the roaring twenties, a time of jazz, flapper dresses, and...prohibition.  (0-5 seconds)\"\n  },\n  {\n    \"imagePrompt\": \"Realistic portrait of a young, determined woman in 1920s flapper attire, looking slightly mischievous.\",\n    \"ContentText\": \"Meet Nellie Bly, not your average flapper.  She was a fearless investigative journalist. (5-10 seconds)\"\n  },\n  {\n    \"imagePrompt\": \"Realistic image of Nellie Bly disguised as a patient in a mental asylum, showing a bleak and unsettling environment.\",\n    \"ContentText\": \"To expose the horrific conditions in women's asylums, Nellie infiltrated one, posing as a patient. (10-15 seconds)\"\n  },\n  {\n    \"imagePrompt\": \"Realistic depiction of Nellie Bly secretly writing in a notebook, hidden from view of the asylum staff.\",\n    \"ContentText\": \"For ten days, she endured appalling treatment, secretly documenting everything. (15-20 seconds)\"\n  },\n  {\n    \"imagePrompt\": \"Realistic image of newspaper headlines screaming about Nellie Bly's exposé, crowds gathering outside a newspaper office.\",\n    \"ContentText\": \"Her exposé, published in the New York World, caused a nationwide scandal. (20-25 seconds)\"\n  },\n  {\n    \"imagePrompt\": \"Realistic image of Nellie Bly, looking proud and confident, holding a newspaper showcasing her article, surrounded by supportive colleagues.\",\n    \"ContentText\": \"Nellie Bly's bravery led to significant reforms in mental health care. Her story is a testament to the power of investigative journalism. (25-30 seconds)\"\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON provides six scenes for a 30-second video (roughly 5 seconds per scene).  Each scene includes:\n\n* **`imagePrompt`:**  A detailed description for generating a realistic AI image using tools like Midjourney, Stable Diffusion, or Dall-E 2.  The prompts are designed to be evocative and specific to achieve the desired visual style.\n* **`ContentText`:** The narration or text overlay for that specific scene.  The timing is approximate and will need adjustment based on the chosen voiceover speed and text display duration.\n\n**To create the video:**\n\n1. **Generate Images:** Use an AI art generator with the provided `imagePrompt` for each scene.\n2. **Edit Video:** Import the generated images into a video editing software (like Adobe Premiere Pro, DaVinci Resolve, or even simpler tools like iMovie or CapCut).\n3. **Add Audio:** Add narration based on the `ContentText`. You might need to adjust the timing to match the visuals.\n4. **Transitions & Effects:** Add smooth transitions between scenes and any other desired visual effects.\n\n\n**Important Note:**  The quality of the final video will depend heavily on the capabilities of the AI art generator and your video editing skills.  Experiment with different AI art generators and refining the image prompts to get the best results. You might also need to iterate on the `ContentText` to fit the timing of your video.\n" },
            ],
        },
    ],
});

