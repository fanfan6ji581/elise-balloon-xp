import {
  Container, Box, Grid, Typography,
  Backdrop, CircularProgress, Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  trialIndex,
  ballAQty,
  reset,
  recordChoice
} from "../../../slices/pretaskSlice";
import { useDispatch, useSelector } from "react-redux";
import TrialTimerProgress from "./TrialTimerProgress";
import { getPretask } from "../../../database/pretask"
import { useParams } from "react-router-dom"
import Jar from "./Jar"
import BallOption from "./BallOption"
import BallOptionSkip from "./BallOptionSkip"
import profitImg from "../../../assets/profit.png";
import lossImg from "../../../assets/loss.png";
import coinImg from "../../../assets/coin.png";
import trendDownImg from "../../../assets/trend_down.png";
import trendUpImg from "../../../assets/trend_up.png";
import outcomeLossImg from "../../../assets/outcome_loss.png";
import outcomeProfitsImg from "../../../assets/outcome_profits.png";
import laughingImg from "../../../assets/laughing.png";
import MoneyOutcome from "./MoneyOutcome";

const Pretask = ({ isTraining }) => {
  const dispatch = useDispatch();
  const { alias } = useParams()
  const [pretask, setPretask] = useState(null);
  const [loadingOpen, setLoadingOpen] = useState(true);
  // const [betA, setBetA] = useState(false);
  // const [betB, setBetB] = useState(false);
  // const [betSkip, setBetSkip] = useState(false);


  // const loginAttendantS = useSelector(loginAttendant);
  const trialIndexS = useSelector(trialIndex);
  const ballAQtyS = useSelector(ballAQty);
  // const choiceHistoryS = useSelector(choiceHistory);
  // const outcomeHistoryS = useSelector(outcomeHistory);
  // const missHistoryS = useSelector(missHistory);
  // const reactionHistoryS = useSelector(reactionHistory);

  const fetchPretask = async () => {
    try {
      console.log('fetching pretask')
      const pretask = await getPretask(alias);
      setPretask(pretask)
      dispatch(reset(pretask));
      setLoadingOpen(false);
    } catch (error) {
      console.error(error)
    }
  }
  // const storeToDB = async () => {

  // };
  const onSubmit = () => {
    dispatch(recordChoice({
      missed: false,
      choices: [1, 2],
    }));
  }

  useEffect(() => {
    fetchPretask();
    return () => {
      // reset game data
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  // }, [trialIndexS])

  return (
    <>
      <img id="profitImg" src={profitImg} alt="coin" style={{ display: 'none' }} />
      <img id="lossImg" src={lossImg} alt="coin" style={{ display: 'none' }} />
      <img id="coinImg" src={coinImg} alt="coin" style={{ display: 'none' }} />
      <img id="outcomeLossImg" src={outcomeLossImg} alt="coin" style={{ display: 'none' }} />
      <img id="outcomeProfitsImg" src={outcomeProfitsImg} alt="coin" style={{ display: 'none' }} />
      <img id="coinImg" src={coinImg} alt="coin" style={{ display: 'none' }} />
      <img id="trendUpImg" src={trendUpImg} alt="coin" style={{ display: 'none' }} />
      <img id="trendDownImg" src={trendDownImg} alt="coin" style={{ display: 'none' }} />
      <img id="laughingImg" src={laughingImg} alt="coin" style={{ display: 'none' }} />
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {pretask &&
        <Container maxWidth="lg">
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h5" align="center" sx={{ mt: 2, mb: 1 }}>
                Trial: {trialIndexS + 1}
              </Typography>
              <TrialTimerProgress pretask={pretask} />
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ height: 0, my: 0, textAlign: 'center' }}>
                    <MoneyOutcome pretask={pretask} />
                  </Box>
                </Grid>
              </Grid>
              <Grid container alignItems="center" sx={{mt: 5}}>
                <Grid item xs={12}>
                  <Jar totalQty={pretask.totalQty} ballAQty={ballAQtyS[trialIndexS]} />
                </Grid>

                <Grid container alignItems="center" sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    <BallOption
                      type="a"
                      winQty={ballAQtyS[trialIndexS]}
                      lossQty={pretask.totalQty - ballAQtyS[trialIndexS]}
                      winCash={pretask.ballAWin}
                      lossCash={pretask.ballALose}
                      label="Bet Blue"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <BallOption
                      type="b"
                      winQty={pretask.totalQty - ballAQtyS[trialIndexS]}
                      lossQty={ballAQtyS[trialIndexS]}
                      winCash={pretask.ballBWin}
                      lossCash={pretask.ballBLose}
                      label="Bet Green"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <BallOptionSkip />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button variant="contained" onClick={() => onSubmit()} sx={{ my: 3 }}>Submit</Button>
          </Grid>
        </Container>
      }
    </>

  );
};

export default Pretask;
