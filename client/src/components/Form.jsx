import React, { useRef, useState } from 'react';

function Form(props) {
  const [search, setSearch] = useState('');
  const [videos, setVideos] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.unclearItems()

    fetch('/api/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownload = (videoId) => {
    fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error downloading video');
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `video_${videoId}.mp4`;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(console.log);
  };
  
  const handleDownloadAudio = (videoId) => {
    props.unclearItems
    fetch('/api/download/audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error downloading audio');
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audio_${videoId}.mp3`;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(console.log);
  };
  

  

  return (
    <>
    <form method="post" className="inputForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='inputSearch'
        required
      />
      <button type="submit">Search</button>
    </form>
    <div className="videoList" style={{display: props.clear? 'none':'block'}}>
      <div className="gallery">
        {videos.map((video, index) => (
          <div key={index} className="videoItem">
            <div className="video-thumbnail">
              <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank">
                <img src={video.thumbnail} alt={video.title} />
              </a>
            </div>
            <div className="video-details">
              <div className="video-title">{video.title}</div>
              <div className="video-info">
                <p>{video.author}</p>
                <p>{video.timestamp}</p>
              </div>
              <div className="video-actions">
                <button onClick={() => { handleDownload(video.id) }}>Video</button>
                <button onClick={() => { handleDownloadAudio(video.id) }}>Audio</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="description">Disclaimer: The app "YouTube Downloader" is provided for educational purposes only and users are responsible for ensuring compliance with copyright laws while using the app to download YouTube videos.</div>

    </>
  );
}

export default Form;
