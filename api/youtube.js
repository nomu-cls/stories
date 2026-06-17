export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { videoId } = req.query;
  if (!videoId) return res.status(400).json({ error: 'videoId is required' });

  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return res.status(500).json({ error: 'API key not configured on server' });

  // 動画データ取得
  const vtRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${key}`);
  const videoData = await vtRes.json();

  if (!videoData.items?.length) {
    return res.status(404).json({ error: 'Video not found' });
  }

  // チャンネル登録者数取得
  const channelId = videoData.items[0].snippet.channelId;
  const chRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=statistics&key=${key}`);
  const chData = await chRes.json();
  const subscriberCount = parseInt(chData.items?.[0]?.statistics?.subscriberCount || 0);

  res.status(200).json({ ...videoData, subscriberCount });
}
