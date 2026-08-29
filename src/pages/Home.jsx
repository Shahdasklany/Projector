import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

import { LanguageContext } from "../context/LanguageContext";

function Home () {

    const [movies , setMovies] = useState([]);
    const [search, setSearch] = useState("")

    const { language, text } =
        useContext(LanguageContext);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const apiLanguage =
        language === "ar" ? "ar-SA" : "en-US";    

    const URL = search
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}&language=${apiLanguage}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${apiLanguage}`;

    useEffect (() => {

        fetch(URL)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results)
            })

    }, [search, language])

 return (
    <div className="home">
        <h1>Projector</h1>

        <input
            type="text"
            placeholder={text.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <div className="movie-grid">

            {movies.map(movie => (
            
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </div>
    </div>
 )
    
}
export default Home