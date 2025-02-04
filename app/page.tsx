"use client";

import React, { useState } from "react";

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [deletedMood, setDeletedMood] = useState(null);
  const [activeTab, setActiveTab] = useState("list");

  const handleAddMood = () => {
    const newMood = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      emoji: selectedMood,
    };
    setMoods([newMood, ...moods]);
    setSelectedMood("");
  };

  const handleDeleteMood = (id) => {
    const moodToDelete = moods.find((mood) => mood.id === id);
    setDeletedMood(moodToDelete);
    setMoods(moods.filter((mood) => mood.id !== id));
  };

  const handleUndo = () => {
    if (deletedMood) {
      setMoods([deletedMood, ...moods]);
      setDeletedMood(null);
    }
  };

  const handleClearMoods = () => {
    setMoods([]);
    setDeletedMood(null);
  };

  return (
    <div className="h-screen bg-purple-700 text-white flex flex-col items-center justify-center p-4">
      <div className="mb-6">
        <h1 className="font-black text-4xl text-center">Mood Tracker</h1>
        <h1 className="text-2xl text-center">Track your mood swings</h1>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "list"
              ? "bg-purple-600"
              : "bg-purple-500 hover:bg-purple-400"
          }`}
          onClick={() => setActiveTab("list")}
        >
          Mood List
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "analytics"
              ? "bg-purple-600"
              : "bg-purple-500 hover:bg-purple-400"
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          Mood Analytics
        </button>
      </div>

      {activeTab === "list" && (
        <div className="w-full max-w-md bg-purple-800 p-6 rounded-xl shadow-lg">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Select a Mood:</label>
            <select
              className="w-full p-2 rounded-md text-black"
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
            >
              <option value="" disabled>
                Choose your mood
              </option>
              <option value="😊">😊 Happy</option>
              <option value="😒">😒 Annoyed</option>
              <option value="😢">😢 Sad</option>
            </select>
          </div>

          <button
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-md"
            onClick={handleAddMood}
            disabled={!selectedMood}
          >
            Add Mood
          </button>
        </div>
      )}

      {activeTab === "list" && moods.length > 0 && (
        <div className="w-full max-w-md mt-6">
          <button
            className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded-md mb-4"
            onClick={handleClearMoods}
          >
            Clear All Moods
          </button>

          {deletedMood && (
            <button
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 rounded-md mb-4"
              onClick={handleUndo}
            >
              Undo Last Action
            </button>
          )}

          <ul className="space-y-4">
            {moods.map((mood) => (
              <li
                key={mood.id}
                className="bg-purple-800 p-4 rounded-xl shadow-md flex justify-between items-center"
              >
                <div>
                  <div className="font-bold">{mood.date}</div>
                  <div>{mood.text}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{mood.emoji}</div>
                  <button
                    className="bg-red-600 hover:bg-red-500 text-white font-semibold px-3 py-1 rounded-md"
                    onClick={() => handleDeleteMood(mood.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="w-full max-w-md bg-purple-800 p-6 rounded-xl shadow-lg text-center">
          <h2 className="font-bold text-xl mb-4">Mood Analytics</h2>
          <p className="text-white">TODO: Analytics</p>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
