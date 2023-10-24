import React, {FC, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {Image} from "primereact/image";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Toast} from "primereact/toast";
import {Message} from "primereact/message";

const Login: FC = () => {

    const navigate = useNavigate();
    const defaultValues = {
        email: null,
        password: null,
    };
    const {
        register,
        handleSubmit, formState: {errors}
    } = useForm({
        defaultValues
    });

    const toast = useRef(null);
    const [checked, setChecked] = useState(false);

    const onSubmit = async (data) => {

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, {
                email: data.email,
                password: data.password
            });
            if (res.status === 200) {
                toast.current.show({
                    severity: 'success', summary: 'Te has autenticado con exito'
                });

                localStorage.setItem('club-auth', JSON.stringify(res.data));
                setTimeout(()=> navigate('/'), 1000);
            }
        } catch (e) {
            toast.current.show({
                severity: 'error', summary: 'Error de autenticacion!', detail: e.response?.data?.message
            });
        }

    };


    return (
        <div className="flex align-items-center justify-content-center flex-1 " style={{
            backgroundImage: 'url("https://dynamicwallpaper.club/landing-vids/1.png")',
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%'
        }}>
            <Toast ref={toast}></Toast>
            <div className="surface-card px-5 py-6 shadow-2 border-round w-full md:w-8 lg:w-4">
                <div className="text-center mb-5">
                    <Image src={'../../../assets/images/clubember-short-logo.png'} alt="Image" height={'50'} className={'mb-3'} />
                    <div className="text-900 text-3xl font-medium mb-3">Clubember</div>
                    <span className="text-600 font-medium line-height-3">Aun no tienes una cuenta?</span>
                    <Link to={'/'} className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Crear cuenta aqui!</Link>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Correo electronico</label>
                    <InputText id="email" type="text" placeholder="Ingresar tu correo electronico" className="w-full mb-1"
                    {...register("email", {required: true})}
                    />
                    {errors.email && (<Message className={'mb-3'} severity="error" text="Correo electronico es requerido!" />)}

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
                    <InputText id="password" type="password" placeholder="Ingresa tu contraseña" className="w-full mb-1"
                    {...register("password", {required: true})}
                    />
                    {errors.password && (<Message className={'mb-3'} severity="error" text="Contraseña es requerida!" />)}

                    <div className="flex align-items-center justify-content-between mb-6 mt-2">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                            <label htmlFor="rememberme">Recuerdame</label>
                        </div>
                        <Link to={'/'} className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Olvidaste tu contraseña?</Link>
                    </div>

                    <div className={'justify-content-center text-center'}>
                        <Button type={'submit'} label="Ingresar" icon="pi pi-sign-in" iconPos={'right'} className="w-full sm:w-4" />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
