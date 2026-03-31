import "../../../styles/Component_MenuScrollView.css";

import { useEffect } from "react";

const mouseMultiplier = 30;
export default function MenuScrollView()
{
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * mouseMultiplier;
            const y = (e.clientY / window.innerHeight - 0.5) * mouseMultiplier;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
    <div className="menu-scroll_view">
    </div>);
}