export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { videoId } = req.query;
  if (!videoId) return res.status(400).json({ error: 'videoId is required' });

  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return res.status(500).json({ error: 'API key not configured on server' });

  const ytUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${key}`;
  const ytRes = await fetch(ytUrl);
  const data = await ytRes.json();
  res.status(ytRes.ok ? 200 : ytRes.status).json(data);
}
