import React from 'react';
import './App.css';
import {TrialPage} from "./components/trial/TrialPage";
import {ConfigureSettings} from "./components/ConfigureSettings";
import {MainPage} from "./components/MainPage";
import {BrowserRouter, Link, Outlet} from "react-router-dom";
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

const theme = createTheme();

const useStyles = makeStyles((theme) => {
    root: {
        // some CSS that accesses the theme
    }
});

function App() {
    const classes = useStyles(); // ❌ If you have this, consider moving it
    // inside of a component wrapped with <ThemeProvider />
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}><Outlet /></ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
