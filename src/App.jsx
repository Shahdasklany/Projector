import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Watchlist from "./pages/Watchlist.jsx";

import LanguageProvider, 
      {LanguageContext} from "./context/LanguageContext";

function AppContent() {

    const { language } = useContext(LanguageContext);

    return (
        <div dir={language === "ar" ? "rtl" : "ltr"}>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/movie/:movieId"
                    element={<MovieDetails />}
                />

                <Route
                    path="/watchlist"
                    element={<Watchlist />}
                />

            </Routes>

        </div>
    );
}

function App() {

    return (
        <LanguageProvider>

            <BrowserRouter>

                <AppContent />

            </BrowserRouter>

        </LanguageProvider>
    );
}

export default App;