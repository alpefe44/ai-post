import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", async (req, res) => {
    const { prompt, image } = req.body;

    const fullPrompt = `Bir kullanıcı şu metni girdi: "${prompt}". Görsel: (bir görsel var). Bu içerik için sosyal medyada paylaşılacak etkileyici bir başlık ve kısa açıklama üret.`;

    const aiResponse = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: fullPrompt }],
    });

    const text = aiResponse.data.choices[0].message.content;

    console.log(text)

    const [title, ...contentLines] = text.split("\n");
    res.status(200).json({
        title: title.replace(/^Başlık[:：]?\s*/, ''),
        content: contentLines.join('\n').replace(/^İçerik[:：]?\s*/, '')
    })
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'));