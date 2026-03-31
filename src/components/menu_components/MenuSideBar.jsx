import "../../../styles/Component_MenuSideBar.css";
import { useEffect, useState } from "react";

import TextButton from "../TextButton";
import IconButton from "../IconButton";
import PopupPanel from "../PopupPanel";

export default function SideBar({ activePanel, setActivePanel, userData = { achievements: [] } })
{
    const [isMobile, setIsMobile] = useState(false);
    const [achievements, setAchievements] = useState([]);

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );

    useEffect(() =>
    {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() =>
    {
        const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() =>
    {
        async function fetchAchievements()
        {
            try
            {
                const response = await fetch("../../assets/data/achievements.json");
                const data = await response.json();
                setAchievements(data);
            }
            catch (error)
            {
                console.error("Failed to load achievements.json:", error);
                setAchievements([]);
            }
        }
        fetchAchievements();
    }, []);

    const ThemeToggleInline = () =>
    {
        const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

        return (
            <TextButton
                text={theme === "dark" ? "Dark" : "Light"}
                callback={toggleTheme}
                toggled={theme === "dark"}
            />
        );
    };

    const renderAchievements = () =>
    {
        if (!achievements || achievements.length === 0) return <p>No achievements yet.</p>;

        return achievements.map((achievement) =>
        {
            const collected = userData?.achievements?.includes(achievement.level_id) ?? false;

            return (
                <div
                    key={achievement.id}
                    className={`component-achievements_item ${collected ? "collected" : "uncollected"}`}
                >
                    <h3 className="component-achievements_name">{achievement.name}</h3>
                    <p className="component-achievements_description">{achievement.description}</p>
                    <span className="component-achievements_level">
                        Island {Math.floor(achievement.level_id / 10)} Level {achievement.level_id % 10}
                    </span>
                </div>
            );
        });
    };

    return (
        <div className="component-sidebar">
            <div className="component-sidebar-text_buttons">
                {isMobile ? (
                    <>
                        <IconButton
                            imagePath="../../assets/svgs/achievement_icon.svg"
                            callback={() => setActivePanel("achievements")}
                        />
                        <IconButton
                            imagePath="../../assets/svgs/settings_icon.svg"
                            callback={() => setActivePanel("settings")}
                        />
                        <IconButton
                            imagePath="../../assets/svgs/moresettings_icon.svg"
                            callback={() => setActivePanel("about us")}
                        />
                    </>
                ) : (
                    <>
                        <TextButton
                            text="Achievements"
                            callback={() => setActivePanel("achievements")}
                        />
                        <TextButton
                            text="Settings"
                            callback={() => setActivePanel("settings")}
                        />
                        <TextButton
                            text="About Us"
                            callback={() => setActivePanel("about us")}
                        />
                    </>
                )}
            </div>

            {/* Achievements Popup */}
            <PopupPanel
                isActive={activePanel === "achievements"}
                setActive={setActivePanel}
            >
                
                <div className="component-achievements_popup">
        <h1 className="component-achievements_title">Achievements</h1>
        <div className="component-achievements_list">
            {achievements.length === 0 ? (
                <span className="component-achievements_empty">No achievements yet</span>
            ) : (
                achievements.map((achievement) =>
                {
                    const collected = userData?.achievements?.includes(achievement.level_id) ?? false;
                    return (
                        <div
                            key={achievement.id}
                            className={`component-achievements_item ${collected ? "collected" : "uncollected"}`}
                        >
                            <small className="component-achievements_badge">
                                {collected ? "Collected" : "Not Collected"}
                            </small>
                            <h3 className="component-achievements_name">{achievement.name}</h3>
                            <p className="component-achievements_description">{achievement.description}</p>
                            <span className="component-achievements_level">
                                Island {Math.floor(achievement.level_id / 10)} Level {achievement.level_id % 10}
                            </span>
                        </div>
                    );
                })
            )}
        </div>
    </div>
            </PopupPanel>

            {/* Settings Popup */}
            <PopupPanel
                isActive={activePanel === "settings"}
                setActive={setActivePanel}
            >
                <h1>Settings</h1>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        paddingLeft: "20px",
                        marginTop: "20px"
                    }}
                >
                    <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>THEME:</span>
                    <div className="component-sidebar-theme_toggle">
                        <ThemeToggleInline />
                    </div>
                </div>
            </PopupPanel>

            {/* About Us Popup */}
            <PopupPanel
                isActive={activePanel === "about us"}
                setActive={setActivePanel}
            >
                <div className="component-about_container">
                    <h1>About Us</h1>
                    <div className="component-about_content">
                        <section className="component-about_section">
                            <h1 className="component-about_subtitle">
                                Introduction to Computer Engineering
                            </h1>
                            <p className="component-about_text">
                                This interactive website simulates the journey of a Computer
                                Engineering student. It converts the official curriculum into
                                islands, levels, and rounds to help incoming freshmen understand
                                what they will study before they even begin their first class.
                            </p>
                        </section>
                        <section className="component-about_section">
                            <h1 className="component-about_subtitle">
                                Islands, Levels, and Rounds
                            </h1>
                            <p className="component-about_text">
                                Each island gives an interactive experience to introduce Computer
                                Engineering. Levels correspond to subjects, and rounds represent
                                learning activities such as quizzes, design tasks, and logic
                                challenges that mirror real academic experiences.
                            </p>
                        </section>
                        <section className="component-about_section">
                            <h1 className="component-about_subtitle">Purpose</h1>
                            <p className="component-about_text">
                                Choosing a degree program can be overwhelming. This project helps
                                future students visualize how topics connect, what skills they
                                will gain, and how their knowledge progresses throughout four
                                years.
                            </p>
                        </section>
                        <section className="component-about_section">
                            <h1 className="component-about_subtitle">What Makes This Unique</h1>
                            <ul className="component-about_list">
                                <li>Curriculum presented as an interactive game</li>
                                <li>Problem-solving rounds based on real topics</li>
                                <li>Progression system tied to learning flow</li>
                                <li>Responsive, modular component architecture</li>
                                <li>Built following SRP principles</li>
                            </ul>
                        </section>
                        <section className="component-about_section">
                            <h1 className="component-about_subtitle">For Future CPE Students</h1>
                            <p className="component-about_text">
                                This is more than a website. It is a preview of the mindset, logic,
                                creativity, and technical thinking required in Computer Engineering.
                            </p>
                        </section>
                    </div>
                </div>
            </PopupPanel>

            {/* Sidebar Icon Buttons */}
            <div className="component-sidebar-icon_buttons">
                <IconButton
                    imagePath="../../assets/svgs/github_icon.svg"
                    callback={() =>
                        window.open(
                            "./",   // TODO: BRING BACK THE REPOSITORY
                            "_blank"
                        )
                    }
                />
                <IconButton
                    imagePath="../../assets/svgs/info_icon.svg"
                    callback={() =>
                        window.open(
                            "https://www.computerscience.org/careers/computer-engineering/",
                            "_blank"
                        )
                    }
                />
            </div>
        </div>
    );
}