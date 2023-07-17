const express = require('express');
const app = express();
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('/api running');
});

app.post('/api/request', async (req, res) => {
  try {
    const { search } = req.body;
    const r = await yts(search);
    const videos = r.videos.slice(0, 50);
    const videoData = videos.map((v) => ({
      title: v.title,
      author: v.author.name,
      timestamp: v.timestamp,
      thumbnail: v.thumbnail,
      id: v.videoId,
    }));
    res.json(videoData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'An error occurred while searching for videos.' });
  }
});

app.post('/api/download', async (req, res) => {
  try {
    const { videoId } = req.body;
    const { formats, videoDetails } = await ytdl.getInfo(`http://www.youtube.com/watch?v=${videoId}`);
    const format = ytdl.chooseFormat(formats, { filter: 'audioandvideo', quality:'highestvideo' });
    res.attachment(`${videoDetails.title}.mp4`);
    ytdl(`http://www.youtube.com/watch?v=${videoId}`, { format }).pipe(res);
  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).send({ error: 'Error downloading the video.' });
  }

  
});



app.post('/api/download/audio',async(req,res)=>{
  try {
    const { videoId } = req.body;
    const { formats, videoDetails } = await ytdl.getInfo(`http://www.youtube.com/watch?v=${videoId}`);
    const format = ytdl.chooseFormat(formats, { filter:'audioonly', quality:'highestaudio' });
    res.attachment(`${videoDetails.title}.mp3`);
    ytdl(`http://www.youtube.com/watch?v=${videoId}`, { format }).pipe(res);
  } catch (error) {
    console.error('Error downloading audio:', error);
    res.status(500).send({ error: 'Error downloading the audio.' });
  }
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
