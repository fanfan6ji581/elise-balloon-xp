import {useSelector} from "react-redux";
import {money, trials} from "../../slices/gameDataSlice";
import {numberOfTrials, thresholdValue} from "../../slices/gameSettingSlice";
import styled from "styled-components";
import {Winwheel} from "../winwheel/Winwheel";
import {useEffect, useRef, useState} from "react";
import wheelConfig from "../winwheel/WheelConfig";
import {Button} from "@mui/material";

const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    text-align: center;
    width: 60%;
    height: 700px;
    padding-bottom: 60px;
`

export function PaymentScreen() {
    const moneyy = useSelector(money);
    const threshold = useSelector(thresholdValue);
    const [spinning, setSpinning] = useState(false);
    const [wheelEarnings, setWheelEarnings] = useState(0);

    const earnings = moneyy - threshold;
    const trialNumber = useSelector(trials);
    const maxTrialNumber = useSelector(numberOfTrials);
    const winwheel = useRef(null);

    const alertPrize = (segment) => {
        // alert("You won " + segment.value);
        setWheelEarnings(segment.value);
    }

    useEffect(()=> {
        if (trialNumber >= maxTrialNumber) {
            setTimeout(()=> {
                winwheel.current = new Winwheel(wheelConfig(alertPrize,Math.abs(earnings)),true);
            },5)
        }
    }, [earnings])

    if (wheelEarnings > 0) {
        return (

            <Container2>
                <h2>
                    Game over!
                </h2>

                <p>
                    Lucky you, you’ve just won ${wheelEarnings+Math.abs(earnings)} at the wheel of fortune! Your net final outcomes in the experiment are thus ${wheelEarnings}.
                    <br/>
                    <br/>
                    Note that you will further receive $5 (the show-up reward), and your earnings at the pre-game test.
                    <br/>
                    <br/>
                    Thanks again for your participation! The experimenter is going to proceed to the payment procedure very soon, thanks for your patience.
                </p>
            </Container2>
        )
    }

    return (
        <Container2>
            <h2>
                Game over!
            </h2>
            {earnings > 0 &&
            <p>
                Your net accumulated outcomes in the task are ${moneyy}, and the threshold has been set at ${threshold}, so your earnings are ${earnings}.
                <br/>
                <br/>
                Congratulations! The experimenter is going to proceed to the payment procedure very soon, thanks for your patience.
            </p>
            }
            {earnings <= 0 &&
            <p>
                Your net accumulated outcomes in the task are -${Math.abs(earnings)}.
                <br/>
                <br/>
                Sorry! However, to thank you for your participation in this research project, we wish to invite you to participate in a wheel of fortune lottery in which you can only win money
                <div className='container'>
                    <div className="the_wheel">
                        <canvas id="canvas" height={434} width={434} className="the_canvas">
                            <p style={{color: 'white'}} align="center">Sorry, your browser doesn't support canvas. Please try another.</p>
                        </canvas>
                    </div>
                </div>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: "#00A8F3",
                        padding: "8px 15px",
                        fontSize: "18px",
                        color: "black"
                    }}
                    disabled={spinning}
                    onClick={()=>{
                    winwheel.current.startAnimation()
                    setSpinning(true)
                }}>Spin</Button>
            </p>
            }
        </Container2>
    )
}