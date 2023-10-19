import React from "react";
import Header from "./components/header/header";
import './app.css'
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";

const App = () => {
    return (
    <div>
        <Header />
        <div className={'container'}>
            <RouterProvider router={routes} />
        </div>
    </div>
  );
}

export default App;
