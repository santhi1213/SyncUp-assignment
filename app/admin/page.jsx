"use client";

import { useState } from "react";

import API from "../../services/api";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/feed", formData);

      alert("Feed Added Successfully");

      setFormData({
        title: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Admin Feed Panel
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Enter feed title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          required
        />

        <textarea
          name="message"
          placeholder="Enter feed message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Add Feed
        </button>
      </form>
    </main>
  );
}