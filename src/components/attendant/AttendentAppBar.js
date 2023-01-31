import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { loginAttendant, logout } from "../../slices/attendantSlice";
import { useNavigate, useParams } from "react-router-dom"

export default function AttendentAppBar() {
  const { alias } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginAttendantS = useSelector(loginAttendant);

  const onClickLogout = () => {
    dispatch(logout());
    navigate(`/xp/${alias}/login`)
  }

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Balloon XP
          </Typography>
          {loginAttendantS && <Button color="inherit" onClick={onClickLogout}>Logout</Button>}
          {!loginAttendantS && <Button component={Link} to={`/xp/${alias}/login`} color="inherit">Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}