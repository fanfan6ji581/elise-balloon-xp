import { Provider } from 'react-redux';
import React from 'react';
import './App.css';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { store } from './app/store';
import AdminLayout from "./components/admin/Layout";
import AdminLoginPage from "./components/admin/Login";
import DashboardPage from "./components/admin/Dashboard";
import Experiment from "./components/admin/Experiment";
import Attedent from "./components/admin/Attedent";

import AttendantLayout from "./components/attendant/Layout";
import LoginPage from "./components/attendant/Login";
import BalloonTrialPage from "./components/attendant/BalloonTrial";
import PaymentPage from "./components/attendant/Payment";

const theme = createTheme();

function App() {
    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <BrowserRouter basename="/">
                        <Routes>
                            <Route path="/" element={<AttendantLayout />}>
                                <Route path="xp/:alias/login/:username?/:password?" element={<LoginPage />} />
                                <Route path="xp/:alias/trial" element={<BalloonTrialPage />} />
                                <Route path="xp/:alias/payment" element={<PaymentPage />} />
                            </Route>
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route path="login" element={<AdminLoginPage />} />
                                <Route path="dashboard" element={<DashboardPage />} />
                                <Route path="xp/:alias" element={<Experiment />} />
                                <Route path="xp/:alias/attendant/:username" element={<Attedent />} />
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
