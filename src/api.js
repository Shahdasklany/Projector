const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

fetch(URL)
    .then(response => {
        console.log("Response:", response);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        console.log("Movie data:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
