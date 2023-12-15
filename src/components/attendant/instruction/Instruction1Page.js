import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { loginAttendant } from "../../../slices/attendantSlice";
import { useSelector } from "react-redux";
import pickBalloon from "../../../assets/pickBalloon.png";
import valueHistoryChart from "../../../assets/valueHistoryChart.png";
import video1 from "../../../assets/video1.mp4";
// import YouTube from 'react-youtube';

const Instruction1Page = () => {
  const { alias } = useParams();
  const loginAttendantS = useSelector(loginAttendant);
  const { xpConfig } = loginAttendantS;
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" sx={{ my: 5 }}>
            Welcome to the Balloon Game!
          </Typography>

          <Grid container alignItems="center" sx={{ my: 10 }}>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <Box component="img" alt="" src={pickBalloon} sx={{ height: 360 }} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" sx={{ my: 5 }}>
                If you play well you can earn a lot of money in this game (up to $150),
                so please read the following instructions very carefully.
              </Typography>
              <Typography variant="h6" sx={{ my: 5 }}>
                In this game, in each of {xpConfig.numberOfTrials} trials, you are
                to choose whether and where to pop a balloon on a screen with 2
                panels. You can choose to pop the balloon on the top panel (line 1
                or line 2) or the bottom panel (line -1 or line -2).
              </Typography>
              <Typography variant="h6" sx={{ my: 5 }}>
                Alternatively, you can choose to pass, in which case you get $0 for
                sure (i.e., you are guaranteed to not lose any money at the trial,
                but you cannot win money either).
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" sx={{ my: 10 }}>
            <Grid item xs={7} alignContent="center">
              <Box
                component="img"
                alt=""
                src={valueHistoryChart}
                sx={{ width: "100%", ml: -5 }}
              />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h6" sx={{ my: 5 }}>
                If you choose to pop the balloon, you win money if you pop in the
                panel that matches the realization of a random variable that
                randomly switches between two possible values ($2 and -$2):
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" sx={{ my: 10 }}>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <TableContainer component={Paper} elevation={6}>
                <Table>
                  <TableHead sx={{ fontSize: 24 }}>
                    <TableRow sx={{ "td, th": { border: 0 } }}>
                      <TableCell sx={{ "td, th": { border: 0 } }}></TableCell>
                      <TableCell
                        sx={{
                          "td, th": {
                            borderBottom: 0,
                            borderRight: "1px solid #eee",
                          },
                        }}
                      ></TableCell>
                      <TableCell
                        colSpan={3}
                        align="center"
                        sx={{ fontSize: 20 }}
                      >
                        Pop at Line:
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>-2</b>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>-1</b>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>1</b>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>2</b>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        rowSpan={4}
                        component="th"
                        width={200}
                        sx={{ fontSize: 20, color: "primary.main" }}
                      >
                        Stock Value Next Trial
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderLeft: "1px solid #eee",
                          borderRight: "1px solid #eee",
                        }}
                      >
                        <Typography variant="h5">
                          <b>$2</b>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>-$4</b>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>-$2</b>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>$2</b>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>$4</b>
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { borderBottom: 0 },
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          borderLeft: "1px solid #eee",
                          borderRight: "1px solid #eee",
                        }}
                      >
                        <Typography variant="h5">
                          <b>-$2</b>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>$4</b>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>$2</b>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>-$2</b>
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <b>-$4</b>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={1} />
          </Grid>

          <Divider />

          <Grid container alignItems="center" sx={{ my: 10 }}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 3 }} align="center">
                Switching to the other panel costs ${xpConfig.costToSwitch}. So the
                game works like this:
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={8}>
              {/* <YouTube videoId="7NWvhfjGAVY" opts={{ width: '100%', height: 500 }} /> */}
              <video width="100%" controls styles={{ objecFit: 'fill' }}>
                <source src={video1} type="video/mp4" />
              </video>
            </Grid>
          </Grid>

          <Box textAlign="center" sx={{ my: 10 }}>
            <Button
              component={Link}
              variant="contained"
              size="large"
              to={`/xp/${alias}/instruction1_2`}
            >
              Next
            </Button>
          </Box>

          <Divider />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Instruction1Page;
