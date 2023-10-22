import React from "react";
import Header from "./components/header/header";
import './app.css'
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";
import {PrimeReactProvider} from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';

const App = () => {
    return (
        <PrimeReactProvider>
            <div>
                <Header/>
                <div className={'container'}>
                    <RouterProvider router={routes}/>
                </div>
            </div>
        </PrimeReactProvider>
    );
}

export default App;
