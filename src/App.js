import { Provider } from 'react-redux';
import React from 'react';
import './App.css';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { store } from './app/store';
import AdminLayout from "./components/admin/Layout";
import AdminLoginPage from "./components/admin/Login";
import DashboardPage from "./components/admin/DashboardPage";
import ExperimentPage from "./components/admin/ExperimentPage";
import AttendantPage from "./components/admin/AttendantPage";

import AttendantLayout from "./components/attendant/Layout";
import LoginPage from "./components/attendant/LoginPage";
import TrialPage from "./components/attendant/trial/TrialPage";
import TrialTrainingPage from "./components/attendant/trial/TrialTrainingPage";
import PaymentPage from "./components/attendant/PaymentPage";
import Instruction1Page from "./components/attendant/instruction/Instruction1Page";
import Instruction2Page from "./components/attendant/instruction/Instruction2Page";
import Instruction3Page from "./components/attendant/instruction/Instruction3Page";
import Instruction4Page from "./components/attendant/instruction/Instruction4Page";
import SkipTrainingPage from "./components/attendant/instruction/SkipTrainingPage";
import QuizPage from "./components/attendant/QuizPage";
import StrategyPage from "./components/attendant/StrategyPage";
import SignupPage from './components/attendant/SignupPage';
import StartGamePage from './components/attendant/StartGamePage';

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
                                <Route path="xp/:alias/signup" element={<SignupPage />} />
                                <Route path="xp/:alias/trial" element={<TrialPage />} />
                                <Route path="xp/:alias/training" element={<TrialTrainingPage />} />
                                <Route path="xp/:alias/payment" element={<PaymentPage />} />
                                <Route path="xp/:alias/instruction1" element={<Instruction1Page />} />
                                <Route path="xp/:alias/instruction2" element={<Instruction2Page />} />
                                <Route path="xp/:alias/instruction3" element={<Instruction3Page />} />
                                <Route path="xp/:alias/instruction4" element={<Instruction4Page />} />
                                <Route path="xp/:alias/skip-training" element={<SkipTrainingPage />} />
                                <Route path="xp/:alias/quiz" element={<QuizPage />} />
                                <Route path="xp/:alias/strategy" element={<StrategyPage />} />
                                <Route path="xp/:alias/start-game" element={<StartGamePage />} />
                            </Route>
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route path="login" element={<AdminLoginPage />} />
                                <Route path="dashboard" element={<DashboardPage />} />
                                <Route path="xp/:alias" element={<ExperimentPage />} />
                                <Route path="xp/:alias/attendant/:username" element={<AttendantPage />} />
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
