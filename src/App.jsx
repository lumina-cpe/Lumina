import "../styles/App.css"

import { useEffect, useState } from "react"

import StateRenderer from "./components/StateRenderer"
import { STATE_TYPES } from "./states/StateTypes"

export default function App() 
{
	const [state, setCurrentState] = useState(STATE_TYPES.MENU);
	return <StateRenderer state={state} setState={setCurrentState}/>;
}