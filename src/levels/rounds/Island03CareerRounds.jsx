import { useState } from "react";
import PopupPanel from "../../components/PopupPanel";
import TextButton from "../../components/TextButton";
import careerData from "../../assets/data/r3201.json";
import careerRoomBg from "../../assets/images/backgrounds/career_room.png";

import softwareIcon from "../../assets/images/careers/software.png";
import hardwareIcon from "../../assets/images/careers/hardware.png";
import embeddedIcon from "../../assets/images/careers/embedded.png";
import networkIcon from "../../assets/images/careers/network.png";
import cybersecurityIcon from "../../assets/images/careers/cybersecurity.png";
import aiIcon from "../../assets/images/careers/ai.png";
import dataIcon from "../../assets/images/careers/data.png";
import roboticsIcon from "../../assets/images/careers/robotics.png";
import firmwareIcon from "../../assets/images/careers/firmware.png";

import "../../styles/CareerRound.css";

const careerIcons =
[
	softwareIcon,
	hardwareIcon,
	embeddedIcon,
	networkIcon,
	cybersecurityIcon,
	aiIcon,
	dataIcon,
	roboticsIcon,
	firmwareIcon
];

const facePositions =
[
	{ top: "8%", left: "12%" },
	{ top: "8%", left: "42%" },
	{ top: "8%", left: "72%" },

	{ top: "38%", left: "12%" },
	{ top: "38%", left: "42%" },
	{ top: "38%", left: "72%" },

	{ top: "68%", left: "12%" },
	{ top: "68%", left: "42%" },
	{ top: "68%", left: "72%" }
];

export default function Island03CareerRound({ levelHandler })
{
	const [activeIndex, setActiveIndex] = useState(null);
	const [readCareers, setReadCareers] = useState([]);

	const openCareer = (index) =>
	{
		if (!readCareers.includes(index))
		{
			setReadCareers([...readCareers, index]);
		}
		setActiveIndex(index);
	};

	const closePopup = () =>
	{
		setActiveIndex(null);
	};

	const allRead = readCareers.length === careerData.career_paths.length;

	return (
		<div
			className="round-career_room"
			style={{ backgroundImage: `url(${careerRoomBg})` }}
		>
			{careerData.career_paths.map((career, index) => (
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
					<TextButton text="Leave Room" callback={() => levelHandler.endLevel()} />
				</div>
			)}

			<PopupPanel isActive={activeIndex !== null} setActive={closePopup}>
				{activeIndex !== null && (
					<div className="round-career_popup_content">
						<img src={careerIcons[activeIndex]} className="round-career_popup_icon" />

						<h2 className="round-career_popup_title">
							{careerData.career_paths[activeIndex].title}
						</h2>

						<div className="round-career_popup_section">
							{careerData.career_paths[activeIndex].description}
						</div>

						<div className="round-career_popup_section">
							<p>{careerData.career_paths[activeIndex].salary.philippines}</p>
							<p>{careerData.career_paths[activeIndex].salary.international_usd}</p>
							<p>{careerData.career_paths[activeIndex].salary.international_php}</p>
						</div>

						<div className="round-career_popup_section">
							Difficulty: {careerData.career_paths[activeIndex].difficulty_level}
						</div>

						<div className="round-career_popup_section">
							{careerData.career_paths[activeIndex].skills_required.join(", ")}
						</div>
					</div>
				)}
			</PopupPanel>
		</div>
	);
}