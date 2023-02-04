import {
    Container, Box, Typography, Button, Alert,
    FormControlLabel, RadioGroup, Radio, Backdrop, CircularProgress,
    Dialog, DialogActions, DialogContent, DialogContentText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import { loginAttendant } from "../../slices/attendantSlice";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../database/firebase";

const QuizPage = () => {
    const { alias } = useParams();
    const navigate = useNavigate();
    const loginAttendantS = useSelector(loginAttendant);
    const { xpConfig } = loginAttendantS;
    const [mcq1, setMcq1] = useState(0);
    const [mcq2, setMcq2] = useState(0);
    const [mcq3, setMcq3] = useState(0);
    const [mcq4, setMcq4] = useState(0);
    const [mcq5, setMcq5] = useState(0);
    const [mcq6, setMcq6] = useState(0);
    const [mcq7, setMcq7] = useState(0);
    const [mcq8, setMcq8] = useState(0);
    const [correction, setCorrection] = useState({});
    const [disableForm, setDisableForm] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loadingOpen, setLoadingOpen] = useState(true);

    const solution = {
        mcq1: 2,
        mcq2: 2,
        mcq3: 2,
        mcq4: 2,
        mcq5: 3,
        mcq6: 3,
        mcq7: 2,
        mcq8: 2,
    }

    const solutionText = {
        mcq1: 'It is about .28',
        mcq2: 'It is about .48',
        mcq3: 'It is about .6',
        mcq4: `You lose ${xpConfig.afkTimeoutCost} every time you do not reply within the imparted ${xpConfig.afkTimeout / 1000} sec`,
        mcq5: 'Win of $2',
        mcq6: 'Win of $2',
        mcq7: 'It can switch; if that occurs, you know that the value will return to its current value next trial (this is “an aberration”)',
        mcq8: 'If you play well you can earn up to $150, but if you don’t, you may end up with nothing but the show-up $5. In other words, your earnings in this experiment will be highly contingent on how well you play the game.',
    }

    const fetchAttdendantAnswer = async () => {
        const attendantRef = doc(db, "attendant", loginAttendantS.id);
        const docSnap = await getDoc(attendantRef);
        setLoadingOpen(false);
        if (!docSnap.exists()) {
            window.alert("Submit failed, Please refresh the page and try again");
        }
        const attendant = docSnap.data();
        if (attendant.quizAnswers) {
            setMcq1(attendant.quizAnswers.mcq1);
            setMcq2(attendant.quizAnswers.mcq2);
            setMcq3(attendant.quizAnswers.mcq3);
            setMcq4(attendant.quizAnswers.mcq4);
            setMcq5(attendant.quizAnswers.mcq5);
            setMcq6(attendant.quizAnswers.mcq6);
            setMcq7(attendant.quizAnswers.mcq7);
            setMcq8(attendant.quizAnswers.mcq8);
            validateForm(attendant.quizAnswers)
        }
    }

    const validateForm = (quizAnswers) => {
        const correction = {};
        let diffCount = 0;
        for (let fieldName in solution) {
            if (solution[fieldName] !== quizAnswers[fieldName]) {
                diffCount++;
                correction[fieldName] = solutionText[fieldName];
            }
        }

        // save attendant quiz response
        setDisableForm(true);
        setCorrection(correction);

        if (diffCount > 1) {
            setDialogOpen(true);
        } else {
            navigate(`/xp/${alias}/strategy`);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        switch (true) {
            case mcq1 === undefined:
                return window.alert("Please fill question #1");
            case mcq2 === undefined:
                return window.alert("Please fill question #2");
            case mcq3 === undefined:
                return window.alert("Please fill question #3");
            case mcq4 === undefined:
                return window.alert("Please fill question #4");
            case mcq5 === undefined:
                return window.alert("Please fill question #5");
            case mcq6 === undefined:
                return window.alert("Please fill question #6");
            case mcq7 === undefined:
                return window.alert("Please fill question #7");
            case mcq8 === undefined:
                return window.alert("Please fill question #8");
            default:
                break;
        }

        const quizAnswers = { mcq1, mcq2, mcq3, mcq4, mcq5, mcq6, mcq7, mcq8 };
        const attendantRef = doc(db, "attendant", loginAttendantS.id);
        await updateDoc(attendantRef, { quizAnswers });

        validateForm(quizAnswers);
    }

    const onKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'm') {
            navigate(`/xp/${alias}/strategy`);
        }
    }

    useEffect(() => {
        fetchAttdendantAnswer();
        document.addEventListener("keydown", onKeyDown, false);
        return () => {
            document.removeEventListener("keydown", onKeyDown, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container maxWidth="md">
            <Typography variant="h5" align="center" sx={{ my: 3 }}>
                Pre-Game Quiz
            </Typography>

            <Alert variant="outlined" icon={false} severity="info" sx={{ my: 3 }}>
                <Typography variant="body1">
                    Please focus on the following quiz which is to check your understanding of the game before you start to play. Your quizAnswers will be recorded and replying incorrectly to several questions may lead to your exclusion from the experiment, so please be very careful.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    If you find the wording of a question unclear, please make sure you seek clarification with the experimenter before you answer, to avoid any penalty.
                </Typography>
            </Alert>

            <form onSubmit={onSubmit}>
                <Typography variant="h6" sx={{ mt: 3 }}>
                    1. The probability that the value switches in the first trial of the dangerous zone is above .5 (more than 50% chance that it will happen).
                </Typography>
                <RadioGroup sx={{ mx: 3 }} >
                    {
                        ["True", "False", "It depends on the trials"].map((v, idx) =>
                            <Fragment key={idx}>
                                <FormControlLabel
                                    control={<Radio disabled={disableForm}
                                        value={idx + 1}
                                        checked={mcq1 === idx + 1}
                                        onChange={() => setMcq1(idx + 1)} />}
                                    label={v} />
                            </Fragment>
                        )
                    }
                </RadioGroup>
                {correction.mcq1 && <Alert severity="error">{correction.mcq1}</Alert>}

                <Typography variant="h6" sx={{ mt: 3 }}>
                    2. The probability that the value switches in the second trial of the dangerous zone is just below .5 (almost 50% chance that it will happen).
                </Typography>
                <RadioGroup sx={{ mx: 3 }} >
                    {
                        ["True", "False", "It depends on the trials"].map((v, idx) =>
                            <Fragment key={idx}>
                                <FormControlLabel
                                    control={<Radio disabled={disableForm}
                                        value={idx + 1}
                                        checked={mcq2 === idx + 1}
                                        onChange={() => setMcq2(idx + 1)} />}
                                    label={v} />
                            </Fragment>
                        )
                    }
                </RadioGroup>
                {correction.mcq2 && <Alert severity="error">{correction.mcq2}</Alert>}

                <Typography variant="h6" sx={{ mt: 3 }}>
                    3. The probability that the value switches in the third trial of the dangerous zone is above .5 (more than 50% chance that it will happen).
                </Typography>
                <RadioGroup sx={{ mx: 3 }} >
                    {
                        ["True", "False", "It depends on the trials"].map((v, idx) =>
                            <Fragment key={idx}>
                                <FormControlLabel
                                    control={<Radio disabled={disableForm}
                                        value={idx + 1}
                                        checked={mcq3 === idx + 1}
                                        onChange={() => setMcq3(idx + 1)} />}
                                    label={v} />
                            </Fragment>
                        )
                    }
                </RadioGroup>
                {correction.mcq3 && <Alert severity="error">{correction.mcq3}</Alert>}

                <Typography variant="h6" sx={{ mt: 3 }}>
                    4. If I so not reply within the imparted time, I proceed to the next trial without any penalty.
                </Typography>
                <RadioGroup sx={{ mx: 3 }} >
                    {
                        ["True", "False"].map((v, idx) =>
                            <Fragment key={idx}>
                                <FormControlLabel
                                    control={<Radio disabled={disableForm}
                                        value={idx + 1}
                                        checked={mcq4 === idx + 1}
                                        onChange={() => setMcq4(idx + 1)} />}
                                    label={v} />
                            </Fragment>
                        )
                    }
                </RadioGroup>
                {correction.mcq4 && <Alert severity="error">{correction.mcq4}</Alert>}

                <Typography variant="h6" sx={{ mt: 3 }}>
                    5. Say at Trial 3 I pop the balloon at line 1, and the value at Trial 4 is $2. In this case my
                    payoff is:
                </Typography>
                <RadioGroup sx={{ mx: 3 }} >
                    {
                        ["Win of $4", "Loss of $4", "Win of $2", "Loss of $2"].map((v, idx) =>
                            <Fragment key={idx}>
                                <FormControlLabel
                                    control={<Radio disabled={disableForm}
                                        value={idx + 1}
                                        checked={mcq5 === idx + 1}
                                        onChange={() => setMcq5(idx + 1)} />}
                                    label={v} />
                            </Fragment>
                        )
                    }
                </RadioGroup>
                {correction.mcq5 && <Alert severity="error">{correction.mcq5}</Alert>}

                <Typography variant="h6" sx={{ mt: 3 }}>
                    6. Say at Trial 3 I pop the balloon at line -1, and the value at Trial 4 is -$2. In this case my payoff is:
                </Typography>
                <RadioGroup sx={{ mx: 3 }} >
                    {
                        ["Win of $4", "Loss of $4", "Win of $2", "Loss of $2"].map((v, idx) =>
                            <Fragment key={idx}>
                                <FormControlLabel
                                    control={<Radio disabled={disableForm}
                                        value={idx + 1}
                                        checked={mcq6 === idx + 1}
                                        onChange={() => setMcq6(idx + 1)} />}
                                    label={v} />
                            </Fragment>
                        )
                    }
                </RadioGroup>
                {correction.mcq6 && <Alert severity="error">{correction.mcq6}</Alert>}

                <Typography variant="h6" sx={{ mt: 3 }}>
                    7. The value cannot switch if the speed indicator is at its baseline value.
                </Typography>
                <RadioGroup sx={{ mx: 3 }} >
                    {
                        ["True", "False"].map((v, idx) =>
                            <Fragment key={idx}>
                                <FormControlLabel
                                    control={<Radio disabled={disableForm}
                                        value={idx + 1}
                                        checked={mcq7 === idx + 1}
                                        onChange={() => setMcq7(idx + 1)} />}
                                    label={v} />
                            </Fragment>
                        )
                    }
                </RadioGroup>
                {correction.mcq7 && <Alert severity="error">{correction.mcq7}</Alert>}

                <Typography variant="h6" sx={{ mt: 3 }}>
                    8. I can expect to leave the lab with $25 on average.
                </Typography>
                <RadioGroup sx={{ mx: 3 }} >
                    {
                        ["True", "False"].map((v, idx) =>
                            <Fragment key={idx}>
                                <FormControlLabel
                                    control={<Radio disabled={disableForm}
                                        value={idx + 1}
                                        checked={mcq8 === idx + 1}
                                        onChange={() => setMcq8(idx + 1)} />}
                                    label={v} />
                            </Fragment>
                        )
                    }
                </RadioGroup>
                {correction.mcq8 && <Alert severity="error">{correction.mcq8}</Alert>}

                <Box textAlign="center" sx={{ my: 3 }}>
                    <Button disabled={disableForm} type="submit" variant="contained" size="large">Submit</Button>
                </Box>
            </form>

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please wait, the experimenter will come shortly.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Dismiss</Button>
                </DialogActions>
            </Dialog>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingOpen}
                onClick={() => setLoadingOpen(false)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container >
    )
}

export default QuizPage