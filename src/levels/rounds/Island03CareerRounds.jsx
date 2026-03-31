import { useState } from "react";
import PopupPanel from "../../components/PopupPanel";
import TextButton from "../../components/TextButton";
import careerData from "../../assets/data/r3201.json";
import "../../styles/CareerRound.css";
import softwareIcon from "../../assets/images/careers/software.png";
import hardwareIcon from "../../assets/images/careers/hardware.png";
import embeddedIcon from "../../assets/images/careers/embedded.png";
import networkIcon from "../../assets/images/careers/network.png";
import cybersecurityIcon from "../../assets/images/careers/cybersecurity.png";
import aiIcon from "../../assets/images/careers/ai.png";
import dataIcon from "../../assets/images/careers/data.png";
import roboticsIcon from "../../assets/images/careers/robotics.png";
import firmwareIcon from "../../assets/images/careers/firmware.png";

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

	const allRead = readCareers.length === careerData.r3201.length;

	return (
		<div className="round-career_room">
			<div className="round-career_grid">
				{careerData.r3201.map((career, index) => (
					<div
						key={index}
						className={`round-career_face ${readCareers.includes(index) ? "round-career_face-read" : ""}`}
						onClick={() => openCareer(index)}
					>
						<img src={careerIcons[index]} className="round-career_icon" />
						<p className="round-career_title">{career.title}</p>
					</div>
				))}
			</div>

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
							{careerData.r3201[activeIndex].title}
						</h2>

						<div className="round-career_popup_section">
							{careerData.r3201[activeIndex].description}
						</div>

						<div className="round-career_popup_section">
							<p>{careerData.r3201[activeIndex].salary.philippines}</p>
							<p>{careerData.r3201[activeIndex].salary.international_usd}</p>
							<p>{careerData.r3201[activeIndex].salary.international_php}</p>
						</div>

						<div className="round-career_popup_section">
							Difficulty: {careerData.r3201[activeIndex].difficulty_level}
						</div>

						<div className="round-career_popup_section">
							{careerData.r3201[activeIndex].skills_required.join(", ")}
						</div>
					</div>
				)}
			</PopupPanel>
		</div>
	);
}