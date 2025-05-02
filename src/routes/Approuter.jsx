// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home/Home";


const AppRoutes = () => {
    return <>
        <Routes>
            <Route path="/" element={<Home />} />

        </Routes>

    </>
};

export default AppRoutes;
