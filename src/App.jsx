import "../styles/App.css"

import useAppNavigationHook from "./hooks/AppNavigationHook";
import StateRenderer from "./components/StateRenderer"

export default function App() 
{
	const stateInfo = useAppNavigationHook();

	return <StateRenderer state={stateInfo[0]} data={stateInfo[1]} />;
}