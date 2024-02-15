import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const PORT = process.env.PORT || 4444;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/proxy-image', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).send('Missing image URL');
  }

  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    res.set('Content-Type', response.headers.get('Content-Type'));
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching image');
  }
});

app.listen(PORT, () => {
  console.log(`Server started in http://localhost:${PORT}`);
});
