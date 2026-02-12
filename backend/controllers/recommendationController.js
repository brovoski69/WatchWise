const axios = require("axios");
const History = require("../models/History");

const recommendMovies = async (req, res) => {
  try {
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    // 1️⃣ GEMINI: Convert mood → genres
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `Convert this mood into 2-3 movie genres only. Return only comma separated genre names. Mood: ${mood}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const genreText =
      geminiResponse.data.candidates[0].content.parts[0].text;

    const genres = genreText
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

    if (!genres.length) {
      return res.json({ genres: [], movies: [] });
    }

    // 2️⃣ TMDB: Get genre list
    const genreListResponse = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    const genreList = genreListResponse.data.genres;

    // 3️⃣ Match Gemini genre to TMDB ID
    const matchedGenre = genreList.find(
      (g) => g.name.toLowerCase() === genres[0].toLowerCase()
    );

    if (!matchedGenre) {
      return res.json({ genres, movies: [] });
    }

    // 4️⃣ TMDB: Fetch movies using genre ID
    const tmdbResponse = await axios.get(
  "https://api.themoviedb.org/3/discover/movie",
  {
    params: {
      api_key: process.env.TMDB_API_KEY,
      with_genres: matchedGenre.id,
      sort_by: "popularity.desc",
      "primary_release_date.lte": new Date().toISOString().split("T")[0],
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  }
);


    const movies = tmdbResponse.data.results.slice(0, 10);

    // 5️⃣ Save to MongoDB history
    await History.create({
      mood,
      genres,
    });

    // 6️⃣ Return response
    res.json({
      genres,
      movies,
    });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { recommendMovies };