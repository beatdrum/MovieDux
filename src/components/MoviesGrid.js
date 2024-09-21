import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    filterMovies(genre, rating, searchValue);
  };

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    setGenre(selectedGenre);
    filterMovies(selectedGenre, rating, searchTerm);
  };

  const handleRatingChange = (e) => {
    const selectedRating = e.target.value;
    setRating(selectedRating);
    filterMovies(genre, selectedRating, searchTerm);
  };

  const matchesGenre = (movie, genre) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    if (rating === "All") return true;
    if (rating === "Good") return movie.rating >= 8;
    if (rating === "Ok") return movie.rating >= 5 && movie.rating < 8;
    if (rating === "Bad") return movie.rating < 5;
    return false;
  };

  const filterMovies = (selectedGenre, selectedRating, search) => {
    const filtered = movies.filter((movie) => {
      return (
        matchesGenre(movie, selectedGenre) &&
        matchesRating(movie, selectedRating) &&
        matchesSearchTerm(movie, search)
      );
    });
    setFilteredMovies(filtered);
  };

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search some movies bruh!!"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>

        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            toggleWatchlist={toggleWatchlist}
            isWatchlisted={watchlist.includes(movie.id)}
          ></MovieCard>
        ))}
      </div>
    </div>
  );
}
