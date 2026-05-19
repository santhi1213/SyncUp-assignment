"use client";

import { useEffect, useState } from "react";

import API from "../services/api";
import socket from "../services/socket";

interface Feed {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
}

export default function HomePage() {
  const [feeds, setFeeds] = useState<Feed[]>([]);

  const fetchFeeds = async () => {
    try {
      const response = await API.get("/feed");

      setFeeds(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeeds();

    socket.on("newFeed", (feed) => {
      setFeeds((prev) => [feed, ...prev]);
    });

    return () => {
      socket.off("newFeed");
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Realtime Coaching Feed
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {feeds.map((feed) => (
          <div
            key={feed._id}
            className="bg-white shadow-lg rounded-xl p-5"
          >
            <h2 className="text-2xl font-bold">
              {feed.title}
            </h2>

            <p className="mt-3 text-gray-700">
              {feed.message}
            </p>

            <p className="mt-4 text-sm text-gray-400">
              {new Date(feed.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}