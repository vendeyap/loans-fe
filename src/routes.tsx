import {createBrowserRouter, Outlet} from "react-router-dom";
import Home from "./views/home/home";
import PaymentForm from "./views/payment/payment-form";
import React from "react";
import Credit from "./views/credits/credit";
import Header from "./components/header/header";
import Login from "./views/login/login";

const Layout = () => (
    <div className={'py-0'}>
        <Header/>
        <div className={'flex-row col-12 md:px-6 lg:px-6 py-0'}>
            <Outlet />
        </div>
    </div>
);
export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
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
            }]
    },
    {
      path: '/login',
      element: <Login />
    }
]);