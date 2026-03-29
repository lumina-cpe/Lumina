import "../../../styles/Component_MenuSideBar.css";

import { useEffect, useState } from "react";

import TextButton from "../TextButton";
import IconButton from "../IconButton";
import PopupPanel from "../PopupPanel";

export default function SideBar() {
    const [activePanel, setActivePanel] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    return (
        <>
            <div className="component-sidebar">
                <div className="component-sidebar-text_buttons">
                    {isMobile ? (
                        <>
                            <IconButton
                                imagePath="../../assets/svgs/achivement_icon.svg"
                                callback={() => setActivePanel("achievements")}
                            />
                            <IconButton
                                imagePath="../../assets/svgs/settings_icon.svg"
                                callback={() => setActivePanel("settings")}
                            />
                            <IconButton
                                imagePath="../../assets/svgs/moresettings_icon.svg"
                                callback={() => setActivePanel("more-settings")}
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
                                text="More Settings"
                                callback={() => setActivePanel("more-settings")}
                            />
                        </>
                    )}
                </div>

                <PopupPanel
                    isActive={activePanel === "achievements"}
                    setActive={setActivePanel}
                    children={<h1>Achievements</h1>}
                />
                <PopupPanel
                    isActive={activePanel === "settings"}
                    setActive={setActivePanel}
                    children={<h1>Settings</h1>}
                />
                <PopupPanel
                    isActive={activePanel === "more-settings"}
                    setActive={setActivePanel}
                    children={<h1>More Settings</h1>}
                />

                <div className="component-sidebar-icon_buttons">
                    <IconButton
                        imagePath="../../assets/svgs/github_icon.svg"
                        callback={() => {
                            window.open("https://github.com/liantomate/web_design_cpe_olympiad_2026", "_blank");
                        }}
                    />
                    <IconButton
                        imagePath="../../assets/svgs/info_icon.svg"
                        callback={() => {
                            window.open("https://www.computerscience.org/careers/computer-engineering/", "_blank");
                        }}
                    />
                </div>
            </div>
        </>
    );
}