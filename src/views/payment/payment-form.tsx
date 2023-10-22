import React from 'react';
import {useForm} from "react-hook-form";
import './styles.css'
import {Link} from "react-router-dom";
import axios from "axios";

const PaymentForm = () => {

    const defaultValues = {
        paymentDate: new Date(),
        paymentFile: null
    }
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues
    });
    const onSubmit = async (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append('file', data.paymentFile[0]);
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res);
    };


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
