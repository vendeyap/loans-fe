import React from "react";
import Header from "./components/header/header";
import './app.css'
import Home from "./views/home/home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PaymentForm from "./views/payment/payment-form";

const App = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/nuevo-pago",
            element: <PaymentForm />,
        },
    ]);

    return (
    <div>
        <Header />
        <div className={'container'}>
            <RouterProvider router={router} />
        </div>
    </div>
  );
}

export default App;
