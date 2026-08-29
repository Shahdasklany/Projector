import {Link} from "react-router-dom"
import { useContext } from "react"

import { LanguageContext } from "../context/LanguageContext"

function Navbar () {

    const { language, setLanguage, text } = useContext(LanguageContext)


    function handleLanguageChange(e) {
    
        setLanguage(e.target.value)
    
    }

    return (
        <nav>

            <h2>Projector</h2>

            <div>

                <Link to="/">
                   {text.movies}
                </Link>

                <Link to="/watchlist">
                    {text.watchlist}
                </Link>

                <select
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <option value="en">
                        EN
                    </option>

                    <option value="ar">
                        AR
                    </option>

                </select>

            </div>

        </nav>
    )
}
export default Navbar