import { useEffect, useState } from "react";
import global_UserData from "../../core/UserData"; 
import "../../../styles/CongratulationsRound.css";

export default function CongratulationsRound({ levelHandler, onMenuReturn, title = "Level Complete!", subtitle = "Achievements Unlocked" }) 
{
    const [achievements, setAchievements] = useState([]);

    useEffect(() => 
    {
        if (!levelHandler) return;

        const currentLevelId = parseInt(`${global_UserData.currentIsland}${global_UserData.currentLevel}`);
        const newlyUnlocked = levelHandler.collectAchievementsForLevel(currentLevelId);
        
        const obtainedAchievements = newlyUnlocked.map(achievement => ({
            ...achievement,
            status: "obtained"
        }));
        
        global_UserData.saveAchievements(obtainedAchievements);
        
        setAchievements(obtainedAchievements);

    }, [levelHandler]);

    if (!levelHandler) 
    {
        return (
            <div className="round-congratulations_container">
                <h1 className="round-congratulations_title">
                    Loading results...
                </h1>
            </div>
        );
    }

    const handleDoneClick = () => 
    {
        global_UserData.incrementLevel();

        if (onMenuReturn) 
        {
            onMenuReturn();
        }
    };

    return (
        <div className="round-congratulations_container">
            <div className="round-congratulations_left">
                <h1 className="round-congratulations_title">
                    {title}
                </h1>
                <button 
                    className="round-congratulations_button" 
                    onClick={handleDoneClick}
                    style={{ position: "relative", zIndex: 9999, cursor: "pointer" }}
                >
                    Done
                </button>
            </div>
            
            <div className="round-congratulations_right">
                <h2 className="round-congratulations_subtitle">
                    {subtitle}
                </h2>
                {achievements.length > 0 ? (
                    <div className="round-congratulations_achievement_list">
                        {achievements.map((achievement) => (
                            <AchievementCard 
                                key={achievement.id} 
                                achievement={achievement} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="round-congratulations_empty_message">
                        <p className="round-congratulations_text">
                            No achievements obtained for this level.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function AchievementCard({ achievement }) 
{
    return (
        <div className="round-congratulations_card">
            <div className="round-congratulations_card_info">
                <h3 className="round-congratulations_card_title">
                    {achievement.name}
                </h3>
                <p className="round-congratulations_card_description">
                    {achievement.description}
                </p>
            </div>
        </div>
    );
}