import React from 'react';
import './App.css';
// import { BrowserRouter, Link, Outlet } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { TrialPage } from "./components/trial/TrialPage";
import { ConfigureSettings } from "./components/ConfigureSettings";
import LoginPage from "./components/admin/Login";
import { store } from './app/store';
import { Provider } from 'react-redux';

const theme = createTheme();

function App() {
    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <BrowserRouter basename="/">
                        <nav>
                            <ul>
                                <li>
                                    <Link to="trial">Trial</Link>
                                </li>
                                <li>
                                    <Link to="config">Config</Link>
                                </li>
                            </ul>
                        </nav>
                        <Routes>
                            <Route path="trial" element={<TrialPage />} />
                            <Route path="config" element={<ConfigureSettings />} />
                            <Route path="admin/login" element={<LoginPage />} />
                        </Routes>
                        <Outlet />
                    </BrowserRouter>
                </ThemeProvider>
            </StyledEngineProvider>
        </Provider>
    );
}

export default App;
