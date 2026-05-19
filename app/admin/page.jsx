// "use client";

// import { useState } from "react";

// import API from "../../services/api";

// export default function AdminPage() {
//   const [formData, setFormData] = useState({
//     title: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/feed", formData);

//       alert("Feed Added Successfully");

//       setFormData({
//         title: "",
//         message: "",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-100 flex justify-center items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
//       >
//         <h1 className="text-3xl font-bold text-center mb-6">
//           Admin Feed Panel
//         </h1>

//         <input
//           type="text"
//           name="title"
//           placeholder="Enter feed title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-lg p-3 mb-4"
//           required
//         />

//         <textarea
//           name="message"
//           placeholder="Enter feed message"
//           value={formData.message}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-black text-white py-3 rounded-lg"
//         >
//           Add Feed
//         </button>
//       </form>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import API from "../../services/api";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await API.post("/feed", formData);
      alert("Feed Added Successfully");
      setFormData({
        title: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add feed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[90vh] bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-white/50 transition-all duration-300 hover:shadow-3xl"
      >
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-lg mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Admin Feed Panel
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Create and publish new announcements
          </p>
        </div>

        {/* Title Input */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Feed Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-400"
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
            </div>
            <input
              type="text"
              name="title"
              placeholder="e.g., System Maintenance"
              value={formData.title}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-slate-50/50"
              required
            />
          </div>
        </div>

        {/* Message Textarea */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Feed Message
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <textarea
              name="message"
              placeholder="Write your announcement details here..."
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-slate-50/50 resize-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Publishing...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Feed
            </>
          )}
        </button>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Your announcement will be visible to all users immediately
        </p>
      </form>
    </main>
  );
}