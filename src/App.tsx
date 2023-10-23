import React from "react";
import Header from "./components/header/header";
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";
import {PrimeReactProvider} from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';

const App = () => {
    return (
        <PrimeReactProvider>
                <Header/>
                <div className={'flex-row col-12'}>
                    <RouterProvider router={routes}/>
                </div>
        </PrimeReactProvider>
    );
}

export default App;
