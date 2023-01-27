import Form from "@rjsf/core";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {submitSettings} from "../slices/gameSettingSlice";
import {money, resetGame} from "../slices/gameDataSlice";


const schema = {
    "title": "Configure random system",
    "description": " ",
    "type": "object",
    "required": [
        "dangerZoneChance",
        "aberrationChance",
        "costToSwitch"
    ],
    "properties": {
        "dangerZoneChance": {
            "type": "string",
            "title": "prob_dangerous Probability that speed departs from threshold value (i.e., we enter the “dangerous zone preceding a regime shift)",
            "default": "1/6"
        },
        "lambda": {
            "type": "string",
            "title": "λ intensity",
            "default": "1/3"
        },
        "aberrationChance": {
            "type": "string",
            "title": "prob_aberration Probability of occurrence of an aberration",
            "default": "1/6"
        },
        "delta": {
            "type": "integer",
            "title": "∆ change_speed",
            "default": 100
        },
        "costToSwitch": {
            "type": "integer",
            "title": "Cost to switch the other screen",
            "default": 6
        },
        "outcomeShowTime": {
            "type": "integer",
            "title": "Outcome stage",
            "default": 2
        },
        "afkTimeout": {
            "type": "integer",
            "title": "Decision stage",
            "default": 2
        },
        "afkTimeoutCost": {
            "type": "integer",
            "title": "Cost if missed trial",
            "default": 1
        },
        "numberOfTrials": {
            "type": "integer",
            "title": "Number of trials T",
            "default": 400
        },
        "thresholdValue": {
            "type": "integer",
            "title": "Threshold value for payment rule",
            "default": 100
        }
    }
};

// const formData = {
//     firstName: "Chuck",
//     "lastName": "Norris",
//     "age": 75,
//     "bio": "Roundhouse kicking asses since 1940",
//     "password": "noneed"
// };

const uiSchema = {

    "firstName": {
        "ui:autofocus": true,
        "ui:emptyValue": "",
        "ui:autocomplete": "family-name"
    },
    "lastName": {
        "ui:emptyValue": "",
        "ui:autocomplete": "given-name"
    },
    "age": {
        "ui:widget": "updown",
        "ui:title": "Age of person",
        "ui:description": "(earthian year)"
    },
    "bio": {
        "ui:widget": "textarea"
    },
    "password": {
        "ui:widget": "password",
        "ui:help": "Hint: Make it strong!"
    },
    "date": {
        "ui:widget": "alt-datetime"
    },
    "telephone": {
        "ui:options": {
            "inputType": "tel"
        }
    }
};

const log = (type) => console.log.bind(console, type);

export function ConfigureSettings() {
    const currMoney = useSelector(money);
    const changeData = useRef(useSelector(state => state.gameSetting));
    const gameData = useRef(useSelector(state => state.gameData));
    const dispatch = useDispatch();
    const onSubmit = ({formData}, e) => {
        // alert(JSON.stringify(formData));
        dispatch(submitSettings(formData))
    }
    const sum = gameData.current._dangerZoneSpeedReset.reduce((prev,next)=>prev+next);
    const chances = gameData.current._dangerZoneSpeedReset.map(item => (item/sum).toFixed(2));
    return (
        <div key="key">
            <Form
                schema={schema}
                formData={changeData.current}
                // uiSchema={uiSchema}
                onChange={data => changeData.current = data.formData}
                onSubmit={onSubmit}
            >
            </Form>

            Number of abberations {gameData.current._numAbberations} / {changeData.current.numberOfTrials} = {gameData.current._numAbberations/changeData.current.numberOfTrials}
            <br/>
            Times entered Dangerzone {gameData.current._numDangerzone} / {changeData.current.numberOfTrials} = {gameData.current._numDangerzone/changeData.current.numberOfTrials}
            <br/>
            Trial n Dangerzone reset {JSON.stringify(gameData.current._dangerZoneSpeedReset)}
            <br/>
            Trial n Dangerzone reset % chance {JSON.stringify(chances)}
            <br/>
            Trial n Dangerzone reset expected {JSON.stringify(gameData.current._dangerZoneResetCalc)}
        </div>
    )
}