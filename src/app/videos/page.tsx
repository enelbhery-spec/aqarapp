"use client";

import { useEffect, useState } from "react";

interface Video {
  title: string;
  link: string;
  pubDate: string;
  videoId: string;
  thumbnail: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch("/api/youtube")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎬 فيديوهات العقارات
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <iframe
              className="w-full h-52"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              allowFullScreen
            ></iframe>

            <div className="p-4">
              <h2 className="font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-500">
                {new Date(video.pubDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
