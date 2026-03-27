import "../styles/App.css"

import { useEffect, useState } from "react"

import useAppNavigationHook from "./hooks/AppNavigationHook";

import global_StateManager from "./states/StateManager";

import StateRenderer from "./components/StateRenderer"
import { STATE_TYPES } from "./states/StateTypes"

export default function App() 
{
	const state = useAppNavigationHook();

	return <StateRenderer state={state} />;
}