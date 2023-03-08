import {
  Container, Box, Grid, Typography,
  Backdrop, CircularProgress, Button,
  FormControlLabel, Checkbox
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  trialIndex,
  ballAQty,
  reset,
  next,
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

const PretaskPage = ({ isTrainingMode, onFinish }) => {
  const dispatch = useDispatch();
  const { alias } = useParams()
  const [pretask, setPretask] = useState(null);
  const [loadingOpen, setLoadingOpen] = useState(true);

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
  const onclick = () => {
    dispatch(next());
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
              <TrialTimerProgress />
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ height: 64, my: 1, textAlign: 'center' }}>
                    TODO: display money outcome here
                  </Box>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Jar totalQty={pretask.totalQty} ballAQty={ballAQtyS[trialIndexS]} />
                </Grid>

                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <BallOption winQty={ballAQtyS[trialIndexS]}
                      lossQty={pretask.totalQty - ballAQtyS[trialIndexS]}
                      winCash={pretask.ballAWin}
                      lossCash={pretask.ballALose}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                      <FormControlLabel control={<Checkbox />} label="Bet blue" align="center" />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <BallOption
                      winQty={pretask.totalQty - ballAQtyS[trialIndexS]}
                      lossQty={ballAQtyS[trialIndexS]}
                      winCash={pretask.ballBWin}
                      lossCash={pretask.ballBLose}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                      <FormControlLabel control={<Checkbox />} label="Bet purple" align="center" />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <BallOptionSkip />
                    <Box sx={{ textAlign: 'center' }}>
                      <FormControlLabel control={<Checkbox />} label="Skip" align="center" />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button variant="contained" onClick={() => onclick()} sx={{ mt: 3 }}>Submit</Button>
          </Grid>
        </Container>
      }
    </>

  );
};

export default PretaskPage;
