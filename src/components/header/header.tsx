import React, {FC, useEffect, useState} from 'react';
import { Image } from 'primereact/image';
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {Sidebar} from "primereact/sidebar";

const Header: FC = () => {

    const navigate = useNavigate();
    const [visibleSidebar, setVisibleSidebar] = useState(false);
    const [user, setUser] = useState(null)

    useEffect(() => {

        const dataUser = localStorage.getItem('club-auth');
        if (!dataUser) {
            navigate(`/login`);
        }
        setUser(JSON.parse(dataUser));

    }, [navigate]);

    const logOut = () => {
        localStorage.removeItem('club-auth');
        navigate(`/login`);
    }

    return (
            <div className={'col-12 bg-primary-100 shadow-3 border-50 p-0'}>

                <div className="col-12 font-normal text-base justify-content-end text-right bg-blue-900 mb-1">
                    <span className="text-white pl-5">{user?.name} {user?.lastName}</span>
                    <span className="text-white pl-5">Conectado</span>
                </div>


                <div className={'col-12 md:col-12 lg:col-12'}>

                    <div className={'flex gap-2 flex-wrap'}>
                        <div className="flex flex-1 justify-content-start md:justify-content-start sm:justify-content-center">
                            <Image src={'../../../assets/images/clubember-short-logo.png'} alt="Image" width="35" className={'pr-2'} />
                            <div className="font-bold text-3xl ">
                                <span className="text-900 text-primary-800">Clubember</span>
                            </div>
                        </div>

                        <div className="flex flex-1 justify-content-end md:justify-content-end sm:justify-content-center">
                            <Button onClick={() => navigate(`/`)} className="text-900 text-primary-600" text label="Inicio" />
                            <Button onClick={() => navigate(`/`)} className="text-900 text-primary-600" text label="Mis Creditos" />
                            <Button onClick={() => setVisibleSidebar(true)} type="button" icon="pi pi-cog" outlined/>
                        </div>
                    </div>


                </div>



                <Sidebar visible={visibleSidebar} position="right" onHide={() => setVisibleSidebar(false)}>
                    <div className="font-bold text-xl pb-2">
                        <span className="text-800">{user?.name} {user?.lastName}</span>
                    </div>

                    <div className="font-light text-base pb-4">
                        <span className="text-500">{user?.email}</span>
                    </div>

                    <div className={'py-4'}>
                        <Button onClick={logOut} type="button" icon="pi pi-sign-out" outlined label={'Cerrar sesion'}/>
                    </div>
                </Sidebar>

        </div>
    );
};

export default Header;
