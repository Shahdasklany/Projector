import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";

function FeedbackList({ movieId }) {

    const [feedbacks, setFeedbacks] = useState([]);

    const { text } = useContext(LanguageContext);


    useEffect(() => {

        const savedFeedback =
            JSON.parse(localStorage.getItem("feedback")) || [];

        const movieFeedback = savedFeedback.filter(
            item => item.movieId === movieId
        );

        setFeedbacks(movieFeedback);

    }, [movieId]);


    return (

        <div className="feedback-list">

            <h2>
                {text.movieFeedback}
            </h2>


            {feedbacks.length === 0 && (
                <p>
                    {text.noFeedback}
                </p>
            )}


            {feedbacks.map(item => (

                <div
                    className="feedback-item"
                    key={item.id}
                >

                    <p>
                        <strong>
                            {item.movieName}
                        </strong>
                    </p>

                    <p>
                        {item.feedback}
                    </p>

                    <p>
                        ⭐ {item.rating}/5
                    </p>

                </div>

            ))}

        </div>
    );
}

export default FeedbackList;