import { useState, useEffect } from "react";
import PopupPanel from "../../components/PopupPanel";
import TextButton from "../../components/TextButton";
import careerRoomBg from "../../../assets/images/backgrounds/career_room.png";

const careerIcons = [
    "/assets/images/careers/software.png",
    "/assets/images/careers/hardware.png",
    "/assets/images/careers/embedded.png",
    "/assets/images/careers/network.png",
    "/assets/images/careers/cybersecurity.png",
    "/assets/images/careers/ai.png",
    "/assets/images/careers/data.png",
    "/assets/images/careers/robotics.png",
    "/assets/images/careers/firmware.png"
];

const facePositions = [
    { top: "8%", left: "12%" }, { top: "8%", left: "42%" }, { top: "8%", left: "72%" },
    { top: "38%", left: "12%" }, { top: "38%", left: "42%" }, { top: "38%", left: "72%" },
    { top: "68%", left: "12%" }, { top: "68%", left: "42%" }, { top: "68%", left: "72%" }
];

export default function Island03CareerRounds({ levelHandler })
{
    const roundData = levelHandler.getCurrentRoundData();
    const careerPaths = roundData?.career_paths || [];

    const [ activeIndex, setActiveIndex ] = useState(null);
    const [ readCareers, setReadCareers ] = useState([]);

    useEffect(() =>
    {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/styles/CareerRound.css";
        document.head.appendChild(link);

        return () => document.head.removeChild(link);
    }, []);

    const openCareer = (index) =>
    {
        if (!readCareers.includes(index))
        {
            setReadCareers([ ...readCareers, index ]);
        }

        setActiveIndex(index);
    };

    const closePopup = () => setActiveIndex(null);

    const allRead = careerPaths.length > 0 && readCareers.length === careerPaths.length;

    return (
        <div className="round-career_room" style={{ backgroundImage: `url(${careerRoomBg})` }}>
            {careerPaths.map((career, index) => (
                <div
                    key={index}
                    style={facePositions[index]}
                    className={`round-career_face ${readCareers.includes(index) ? "round-career_face-read" : ""}`}
                    onClick={() => openCareer(index)}
                >
                    <img src={careerIcons[index]} className="round-career_icon" />
                    <p className="round-career_title">{career.title}</p>
                </div>
            ))}

            {allRead && (
                <div className="round-career_leave">
                    <TextButton
                        text="Leave Room"
                        callback={() =>
                        {
                            levelHandler.setNextRound();
                        }}
                    />
                </div>
            )}

            <PopupPanel isActive={activeIndex !== null} setActive={closePopup}>
                {activeIndex !== null && careerPaths[activeIndex] && (
                    <div className="round-career_popup_content">
                        <img src={careerIcons[activeIndex]} className="round-career_popup_icon" />
                        <h2 className="round-career_popup_title">
                            {careerPaths[activeIndex].title}
                        </h2>
                        <div className="round-career_popup_section">
                            {careerPaths[activeIndex].description}
                        </div>
                        <div className="round-career_popup_section">
                            <p>{careerPaths[activeIndex].salary.philippines}</p>
                            <p>{careerPaths[activeIndex].salary.international_usd}</p>
                            <p>{careerPaths[activeIndex].salary.international_php}</p>
                        </div>
                        <div className="round-career_popup_section">
                            Difficulty: {careerPaths[activeIndex].difficulty_level}
                        </div>
                        <div className="round-career_popup_section">
                            {careerPaths[activeIndex].skills_required.join(", ")}
                        </div>
                    </div>
                )}
            </PopupPanel>
        </div>
    );
}