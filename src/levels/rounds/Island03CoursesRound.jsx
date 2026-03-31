import { useState } from "react";
import TextButton from "../../components/TextButton";
import "../../../styles/CurriculumRound.css";

export default function Island03CoursesRound({ levelHandler })
{
    const roundData = levelHandler.getCurrentRoundData();
    const years = roundData?.years || [];

    const [currentIndex, setCurrentIndex] = useState(0);

    const currentYear = years[currentIndex];

    const handleNext = () =>
    {
        if (currentIndex < years.length - 1)
        {
            setCurrentIndex(currentIndex + 1);
        }
        else
        {
            levelHandler.setNextRound();
        }
    };

    return (
        <div className="round-curriculum_container">
            <div className="round-curriculum_card">

                <h2 className="round-curriculum_title">
                    {currentYear?.theme} / {currentYear?.yearLabel}
                </h2>

                <div className="round-curriculum_content">
                    {currentYear?.courses.map((course, index) => (
                        <p key={index} className="round-curriculum_text">
                            <strong>{course.title}:</strong> {course.description}
                        </p>
                    ))}
                </div>

                <div className="round-curriculum_button_container">
                    <button
                        className="round-curriculum_button"
                        onClick={handleNext}
                    >
                        {currentIndex < years.length - 1 ? "NEXT YEAR" : "NEXT"}
                    </button>
                </div>

            </div>
        </div>
    );
}