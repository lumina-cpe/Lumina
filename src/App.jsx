import "../styles/App.css"
import "./utils/SoundManager";
import useAppNavigationHook from "./hooks/AppNavigationHook";
import StateRenderer from "./components/StateRenderer"

import global_StateManager from "./states/StateManager"; 

export default function App() 
{
    const stateInfo = useAppNavigationHook();

    // Create the commander function to change state
    const handleStateChange = (newState) => {
        global_StateManager.setState(newState); 
    };

    return (
        <StateRenderer 
            state={stateInfo[0]} 
            data={stateInfo[1]} 
            changeState={handleStateChange} 
        />
    );
}