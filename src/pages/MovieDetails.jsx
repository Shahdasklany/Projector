import { useParams } from "react-router-dom"
import { useContext, useEffect ,useState } from "react"

import { LanguageContext } from "../context/LanguageContext"

import FeedbackForm from "../components/FeedbackForm"

import FeedbackList from "../components/FeedbackList"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieDetails () {

    const {movieId} = useParams()

    const [movie, setMovie] = useState(null)

    const { language, text } = useContext(LanguageContext)

    const apiLanguage =
        language === "ar" ? "ar-SA" : "en-US" 

    const URL =
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${apiLanguage}`;   
    
    useEffect(() => {  

            fetch(URL)
              .then(response => response.json())
              .then(data => {
                  setMovie(data)
                })
    
        }, [movieId, language])

        function addToWatchlist() {
            const watchlist =

                JSON.parse(localStorage.getItem("watchlist")) || [];

            const alreadyExists = watchlist.some(

                item => item.id === movie.id
            )

            if (alreadyExists) {
                alert(text.movieAlreadyAdded)
                return
            }

            watchlist.push(movie)
            
            localStorage.setItem(
                "watchlist",
                JSON.stringify(watchlist)
            )
            alert(text.movieAdded)
        }
    return (
        <div className="movie-details">

            <h1>
                {text.movieDetails}
            </h1>

            <p>
                {text.movieId}: {movieId}
            </p>

            {movie && (
                <div className="movie-info">

                    <h1>
                        {movie.title}
                    </h1>

                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />

                    <p>
                        {movie.overview}
                    </p>

                    <p>
                        {text.rating}: {movie.vote_average}
                    </p>

                    <p>
                        {text.releaseDate} : {movie.release_date}
                    </p>

                    <button onClick={addToWatchlist}>
                        {text.addToWatchlist} 
                    </button>

                    <FeedbackForm movie={movie}/>   
                
                    <FeedbackList movieId={movie.id} />
                </div>
            )}

        </div>
    )
}
export default MovieDetails