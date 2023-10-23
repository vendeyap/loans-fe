import {createBrowserRouter} from "react-router-dom";
import Home from "./views/home/home";
import PaymentForm from "./views/payment/payment-form";
import React from "react";
import Credit from "./views/credits/credit";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/credit/:id",
        element: <Credit />,
    },
    {
        path: "/credit/:creditId/new-payment",
        element: <PaymentForm />,
    },
]);