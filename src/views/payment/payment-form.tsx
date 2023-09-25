import React from 'react';
import {useForm} from "react-hook-form";
import './styles.css'
import {Link} from "react-router-dom";

const PaymentForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);


    return (
        <div className={'content-form'}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className={'form-control'}>
                    <label>Fecha de pago</label>
                    <input className={'input-control'} type={'date'} {...register("paymentDate", { required: true })} />
                    {errors.paymentDate && <span className={'error'}>La fecha es requerida</span>}
                </div>

                <div className={'form-control'}>
                    <label>Comprobante de pago</label>
                    <input className={'input-control'} type={'file'}
                           accept="image/*, application/pdf"
                           {...register("paymentFile", { required: true })} />
                    {errors.paymentFile && <span className={'error'}>El comprobante es requerido</span>}
                </div>

                <hr/>

                <div style={{
                    margin: '20px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end'
                }}>
                    <Link className={'button-back'} to={'/'} style={{
                        marginRight: '20px'
                    }}>
                        Volver
                    </Link>
                    <input type={'submit'} className={'button-generic'} value={'Registrar'} style={{
                        minHeight: '41px'
                    }}/>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;
