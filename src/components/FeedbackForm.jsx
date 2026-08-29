import { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";

function FeedbackForm({movie}) {
    const [feedback, setFeedback] = useState("")
    const [rating, setRating] = useState("")

    const { text } = useContext(LanguageContext)

    function handleSubmit(e) {
    e.preventDefault();

    if (feedback.trim() === "") {
        alert(text.feedbackRequired)
        return
    }

    if (rating < 1 || rating > 5) {
        alert(text.ratingError)
        return
    }
//feedback object
    const newFeedback = {
        id: Date.now(),   
        movieId: movie.id, 
        movieName: movie.title,
        feedback: feedback,
        rating: rating
    };
//previous feedback   
    const savedFeedback =
    JSON.parse(localStorage.getItem("feedback")) || []; // <--- [] if there's nothing  yet 

    savedFeedback.push(newFeedback);
//adds the new feedback to the array
    localStorage.setItem(   //saves the whole array
        "feedback",
        JSON.stringify(savedFeedback)
    );

    alert(text.feedbackSubmitted);

    setFeedback("");
    setRating("");
}

    return (
        <div className="feedback-form">
            <h2>{text.leaveFeedback}</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    {text.movieName}
                </label>

                <input
                    type="text"
                    value={movie.title}
                    readOnly
                />

                <label>
                        {text.movieId}
                </label>
                <input
                    type="text"
                    value={movie.id}
                    readOnly
                />
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    maxLength="200"
                    placeholder={text.yourFeedback}
                />

                <p>
                    {feedback.length}/200
                </p>

                <label>
                    Rating
                </label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder={text.rateFrom}
                />
                <button type="submit">
                        {text.submitFeedback}
                </button>

            </form>

        </div>
    )
}
export default FeedbackForm