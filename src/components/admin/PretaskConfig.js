import Form from '@rjsf/mui';
import validator from "@rjsf/validator-ajv8";
import { updatePretask } from "../../database/pretask";

const schema = {
    "title": "Configure pretask",
    "description": "",
    "type": "object",
    "required": [

    ],
    "properties": {
        "totalQty": {
            "type": "number",
            "title": "Total number of balls",
            "default": "100"
        },
        "ballAQty": {
            "type": "number",
            "title": "Total number of ball A. e.g. n = 50",
            "default": "50"
        },
        "repeatLimit": {
            "type": "integer",
            "title": "N, how many reset to terminate the trails",
            "default": 5
        },
        "x": {
            "type": "integer",
            "title": "x",
            "default": 1
        },
        "ballAWin": {
            "type": "number",
            "title": "$ earned when winning bet on ball A",
            "default": "4"
        },
        "ballALose": {
            "type": "number",
            "title": "$ losed when losing bet on ball A",
            "default": "-4"
        },
        "ballBWin": {
            "type": "number",
            "title": "$ earned when winning bet on ball B",
            "default": "3"
        },
        "ballBLose": {
            "type": "number",
            "title": "$ losed when losing bet on ball B",
            "default": "-5"
        },
        "missLose": {
            "type": "integer",
            "title": "$ losed when missing a trial",
            "default": -1
        },
        "afkTimeout": {
            "type": "integer",
            "title": "Decision stage, milliseconds that allow attendant to do decision, e.g. 2000 ms = 2 sec",
            "default": 4000
        },
        "choiceDelay": {
            "type": "integer",
            "title": "Delay in milliseconds after submit, 1000 ms = 1 sec",
            "default": 0
        },
        "outcomeShowTime": {
            "type": "integer",
            "title": "Outcome stage, millisecond showing the output result, 2000 ms = 2 sec",
            "default": 2000
        },
    }
};

const uiSchema = {
    "ui:options": {
        "submitButtonOptions": {
            "props": {
                "className": "btn btn-info",
            },
            "norender": false,
            "submitText": "Save"
        }
    }
}

const PretaskConfig = ({ pretask, setPretask }) => {
    const onSaveConfig = async ({ formData }, e) => {
        e.preventDefault();
        await updatePretask(formData);
        setPretask(formData);
        window.alert("Pretask config has been saved successfully");
    };

    return (
        <>
            {pretask && <Form schema={schema} uiSchema={uiSchema} formData={pretask} onSubmit={onSaveConfig} validator={validator} />}
        </>
    )
}

export default PretaskConfig