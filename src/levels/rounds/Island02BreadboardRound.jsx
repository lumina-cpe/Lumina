import { useState } from "react";
import "../../../styles/Island02BreadboardRound.css";

export default function Island02BreadboardRound({ levelHandler }) {
    const [placedOrder, setPlacedOrder] = useState([]);
    const [shaking, setShaking] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [consecutiveMistakes, setConsecutiveMistakes] = useState(0);
    const [draggedItem, setDraggedItem] = useState(null);

    const correctOrder = [
        "breadboard", "battery", "switch", "resistor", 
        "led", "led_2", "buzzer", "push_button"
    ];

    const inventoryItems = [
        { id: "battery", label: "Battery" },
        { id: "switch", label: "Switch" },
        { id: "resistor", label: "Resistor" },
        { id: "led", label: "LED 1" },
        { id: "led_2", label: "LED 2" },
        { id: "buzzer", label: "Buzzer" },
        { id: "push_button", label: "Push Button" }
    ];

    const handleDrop = (itemType) => {
        const nextExpected = correctOrder[placedOrder.length];

        if (itemType === nextExpected) {
            const newOrder = [...placedOrder, itemType];
            setPlacedOrder(newOrder);
            setConsecutiveMistakes(0);

            if (newOrder.length === correctOrder.length) {
                if(levelHandler) {
                    levelHandler.pushAchievement({ id: "circuit_crusader", name: "Circuit Crusader" });
                    setTimeout(() => levelHandler.setNextRound(), 3500);
                }
            }
        } else {
            setShaking(true);
            setTimeout(() => setShaking(false), 500);
            setConsecutiveMistakes(prev => {
                const val = prev + 1;
                if (val >= 3) setShowGuide(true);
                return val;
            });
        }
        setDraggedItem(null);
    };

    return (
        <div className={`circuit-level-root ${shaking ? "screen-shake" : ""}`}>
            <div className="circuit-sidebar">
                <h2 className="sidebar-title">INVENTORY</h2>
                <div className="inventory-scroll">
                    {!placedOrder.includes("breadboard") && (
                        <div className="inv-card" draggable onDragStart={() => setDraggedItem("breadboard")}>
                            <img src="/assets/images/circuitround/breadboard.png" alt="BB" />
                            <span>Breadboard</span>
                        </div>
                    )}
                    {inventoryItems.map(item => !placedOrder.includes(item.id) && (
                        <div key={item.id} className="inv-card" draggable onDragStart={() => setDraggedItem(item.id)}>
                            <img src={`/assets/images/circuitround/${item.id.replace('_2', '')}.png`} alt={item.label} />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="circuit-area" onDragOver={e => e.preventDefault()} onDrop={() => handleDrop(draggedItem)}>
                <div className={`board-target ${placedOrder.includes("breadboard") ? "is-placed" : "is-empty"}`}>
                    {!placedOrder.includes("breadboard") ? (
                        <div className="drop-prompt">DRAG BREADBOARD HERE</div>
                    ) : (
                        <div className="board-container">
                            <img src="/assets/images/circuitround/breadboard.png" className="bb-image" />
                            {placedOrder.map(id => id !== "breadboard" && (
                                <img key={id} src={`/assets/images/circuitround/${id.replace('_2', '')}.png`} className={`part ${id}`} />
                            ))}
                        </div>
                    )}
                </div>

                {showGuide && (
                    <div className="guide-tooltip">
                        NEXT: {correctOrder[placedOrder.length].toUpperCase().replace('_', ' ')}
                    </div>
                )}
            </div>

            {placedOrder.length === correctOrder.length && (
                <div className="victory-overlay">
                    <div className="victory-card">
                        <h1>CIRCUIT CRUSADER!</h1>
                        <p>Your circuit is complete. System design is the backbone of engineering.</p>
                    </div>
                </div>
            )}

            
        </div>
    );
}