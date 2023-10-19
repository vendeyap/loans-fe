import {createBrowserRouter} from "react-router-dom";
import Home from "./views/home/home";
import PaymentForm from "./views/payment/payment-form";
import React from "react";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/nuevo-pago",
        element: <PaymentForm />,
    },
]);