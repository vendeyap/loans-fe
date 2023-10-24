import React from "react";
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";
import {PrimeReactProvider} from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';

const App = () => {
    return (

        <PrimeReactProvider>
                    <RouterProvider router={routes}/>
        </PrimeReactProvider>
    );
}

export default App;
