import { useContext, useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"

import { LanguageContext } from "../context/LanguageContext"

function Watchlist () {

    const [watchlist, setWatchlist] = useState([])

    const { text } = useContext(LanguageContext)

    useEffect(() => {

        const savedMovies = 
            JSON.parse(localStorage.getItem("watchlist")) || []

        setWatchlist(savedMovies)
    
    }, [])
function removeFromWatchlist(movieId) {

    const updatedWatchlist = watchlist.filter(
        movie => movie.id !== movieId
    )

    setWatchlist(updatedWatchlist)

    localStorage.setItem(
        "watchlist",
        JSON.stringify(updatedWatchlist)
    )
}

    return (
        <div className="watchlist">

            <h1>
                {text.myWatchlist}
            </h1>

            {watchlist.length === 0 && (
                <p>
                    {text.emptyWatchlist}
                </p>
            )}

            <div className="movie-grid">

                {watchlist.map(movie => (
                
                    <div key={movie.id}>

                        <MovieCard movie={movie} />

                        <button
                            onClick={() => removeFromWatchlist(movie.id)}
                        >
                            {text.remove}
                        </button>
                    
                    </div>
                
                ))}
            
            </div>
            
        </div>
    )
}
export default Watchlist