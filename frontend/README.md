# 🎬 WatchWise — AI Powered Movie Recommendation Platform

## 🚀 Overview

WatchWise is a full-stack AI-powered movie recommendation web application that curates personalized movie suggestions based on a user’s mood.

Users can:

* Describe their mood
* Convert mood → movie genres using Google Gemini API
* Fetch real movie recommendations from TMDB API
* Save favourite movies
* View previous search history
* Experience a modern cinematic UI

This project was built as part of the AWS Cloud Club Web Development Task.

---

## 🧠 Features

* AI Mood-Based Recommendations (Gemini API)
* TMDB Movie Data Integration
* Smart Genre Mapping System
* Save Favourites
* View Search History
* MongoDB Database Integration
* Fully API-Based Frontend-Backend Communication
* Responsive Netflix-style UI

---

## 🏗 Tech Stack

### Frontend

* React
* Vite
* Axios
* React Router DOM
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* Axios

### APIs Used

* Google Gemini API (Mood → Genre conversion)
* TMDB API (Movie database)

---

## 📂 Project Structure

```
WatchWise/
 ├── backend/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── config/
 │   └── server.js
 │
 ├── frontend/
 │   ├── src/
 │   ├── components/
 │   ├── pages/
 │   └── services/
 │
 └── README.md
```

---

## ⚙️ How To Run Locally

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file inside backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
TMDB_API_KEY=your_tmdb_api_key
```

Run backend:

```bash
node server.js
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

