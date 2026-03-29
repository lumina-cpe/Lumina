import { STATE_TYPES } from "../states/StateTypes";

import MenuState from "../states/MenuState";
import QuestionnaireState from "../states/QuestionnaireState";

export default function StateRenderer({ state, data })
{
    switch(state)
    {
        case STATE_TYPES.MENU: 
            return <MenuState/>;
        case STATE_TYPES.QUESTIONNAIRE:
            return <QuestionnaireState levelData={data}/>;
        case STATE_TYPES.GAME:
            return <></>;
        default: 
            console.log(`Error: State ${state} not found`);
            return null;
    }
}