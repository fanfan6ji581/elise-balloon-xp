import { Provider } from 'react-redux';
import React from 'react';
import './App.css';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { store } from './app/store';
import AdminLayout from "./components/admin/Layout";
import LoginPage from "./components/admin/Login";
import DashboardPage from "./components/admin/Dashboard";
import TrialLayout from "./components/trial/Layout";
import { TrialPage } from "./components/trial/TrialPage";
import { ConfigureSettings } from "./components/ConfigureSettings";

const theme = createTheme();

function App() {
    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <BrowserRouter basename="/">
                        {/* <nav>
                            <ul>
                                <li>
                                    <Link to="trial">Trial</Link>
                                </li>
                                <li>
                                    <Link to="config">Config</Link>
                                </li>
                            </ul>
                        </nav> */}
                        <Routes>
                            <Route path="/" element={<TrialLayout />}>
                                <Route path="trial" element={<TrialPage />} />
                                <Route path="config" element={<ConfigureSettings />} />
                            </Route>
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route path="login" element={<LoginPage />} />
                                <Route path="dashboard" element={<DashboardPage />} />
                            </Route>
                        </Routes>
                        <Outlet />
                    </BrowserRouter>
                </ThemeProvider>
            </StyledEngineProvider>
        </Provider>
    );
}

export default App;
