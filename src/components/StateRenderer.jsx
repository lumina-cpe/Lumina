import { STATE_TYPES } from "../states/StateTypes";

import MenuState from "../states/MenuState";
import QuestionnaireState from "../states/QuestionnaireState";

// TODO: remove this
import levelData from "../../assets/data/l11.json";

export default function StateRenderer({ state })
{
    // TODO: implement state components
    switch(state)
    {
        case STATE_TYPES.MENU: 
            return <MenuState/>;
            // TODO: dynamic questions pls
        case STATE_TYPES.QUESTIONNAIRE:
            return <QuestionnaireState levelData={levelData}/>;
        case STATE_TYPES.GAME:
            return <></>;
        default: 
            console.log(`Error: State ${state} not found`);
            return null;
    }
}