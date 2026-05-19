// "use client";

// import { useEffect, useState } from "react";

// import API from "../services/api";
// import socket from "../services/socket";

// interface Feed {
//   _id: string;
//   title: string;
//   message: string;
//   createdAt: string;
// }

// export default function HomePage() {
//   const [feeds, setFeeds] = useState<Feed[]>([]);

//   const fetchFeeds = async () => {
//     try {
//       const response = await API.get("/feed");

//       setFeeds(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchFeeds();

//     socket.on("newFeed", (feed) => {
//       setFeeds((prev) => [feed, ...prev]);
//     });

//     return () => {
//       socket.off("newFeed");
//     };
//   }, []);

//   return (
//     <main className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-4xl font-bold text-center mb-8">
//         Realtime Coaching Feed
//       </h1>

//       <div className="max-w-2xl mx-auto space-y-4">
//         {feeds.map((feed) => (
//           <div
//             key={feed._id}
//             className="bg-white shadow-lg rounded-xl p-5"
//           >
//             <h2 className="text-2xl font-bold">
//               {feed.title}
//             </h2>

//             <p className="mt-3 text-gray-700">
//               {feed.message}
//             </p>

//             <p className="mt-4 text-sm text-gray-400">
//               {new Date(feed.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

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
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeeds = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/feed");
      setFeeds(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();

    socket.on("newFeed", (feed: Feed) => {
      setFeeds((prev) => [feed, ...prev]);
    });

    return () => {
      socket.off("newFeed");
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Realtime Coaching Feed
              </h1>
              <p className="text-slate-500 text-sm mt-1 text-center">
                Stay updated with the latest announcements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feeds Container */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && feeds.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-200 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              No feeds yet
            </h3>
            <p className="text-slate-500">
              Check back later for updates and announcements
            </p>
          </div>
        )}

        {/* Feeds Grid/List */}
        <div className="space-y-4">
          {feeds.map((feed, index) => (
            <div
              key={feed._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-slate-100"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {feed.title.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {feed.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-xs text-slate-400">
                          {new Date(feed.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="hidden sm:flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-green-600">New</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 py-5">
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {feed.message}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  <span>Feed ID: {feed._id.slice(-8)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Indicator */}
        {!isLoading && feeds.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2 border border-slate-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-slate-600">
              Live updates
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}