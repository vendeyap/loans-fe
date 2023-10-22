import React, {useRef} from 'react';
import {useForm} from "react-hook-form";
import './styles.css'
import {Link} from "react-router-dom";
import axios from "axios";
import {Calendar} from "primereact/calendar";
import {addLocale} from "primereact/api";
import {FileUpload} from "primereact/fileupload";
import { Toast } from 'primereact/toast';
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";
import {Divider} from "primereact/divider";

const PaymentForm = () => {

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

    const defaultValues = {
        paymentDate: null,
        file: null,
        amount: null,
        description: null
    }
    const {register, setValue,
        setError,
        clearErrors,
        handleSubmit, formState: {errors}} = useForm({
        defaultValues
    });
    const toast = useRef(null);

    const onUpload = async (event) => {
        const formData = new FormData();
        formData.append('file', event.files[0]);
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.status === 201) {
            clearErrors("file")
            setValue('file', res.data.data.fileUrl)
            toast.current.show({severity: 'info', summary: 'Exito', detail: `Comprobante cargado como:  ${res.data.data.fileUrl}`});
        }
    };
    const onSubmit = async (data) => {
        console.log(data)
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment`, {
            amount: data.amount,
            description: data.description,
            fileUrl: data.file,
            paymentDate: data.paymentDate
        } );
        if (res.status === 201) {
            toast.current.show({severity: 'sucess', summary: 'Exito', detail: `Se ha registrado el pago`});
        }
    };

    register('amount', { required: true });


    return (
        <div className={'content-form'}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Toast ref={toast}></Toast>

                <div className={'flex mt-3 flex-column'}>
                    <label htmlFor="paymentDate" className="font-bold block mb-3">Fecha del pago</label>
                    <Calendar showIcon dateFormat="dd/mm/yy"
                              maxDate={new Date()}
                              showButtonBar
                              locale={'es'}
                              className={'input-control'} {...register("paymentDate", {required: true})}/>
                    {errors.paymentDate && <span className={'error'}>La fecha es requerida</span>}
                </div>

                <div className={'flex mt-3 flex-column'}>
                    <label htmlFor="paymentDate" className="font-bold block mb-3">Comprobante de pago</label>
                    <div className="card">
                        <FileUpload chooseLabel={'Seleccionar comprobante'}
                                    uploadLabel={'Cargar'}
                                    cancelLabel={'Cancelar'}
                                    customUpload uploadHandler={onUpload}
                                    className={'input-control'}
                                    accept="image/*, application/pdf"
                                    maxFileSize={1000000}
                                    {...register("file", {required: true})}
                                    emptyTemplate={<p className="m-0">Arrastra el comprobante para cargar.</p>} />
                    </div>
                    {/*<input className={'input-control'} type={'file'}
                           accept="image/*, application/pdf"
                           {...register("paymentFile", {required: true})} />*/}
                    {errors.file && <span className={'error mt-2'}>Falta cargar un comprobante!</span>}
                </div>

                <div className={'flex mt-3 flex-column'}>
                    <label htmlFor="amount" className="font-bold block mb-3">Valor a pagar</label>
                    <InputNumber inputId="amount"
                                 name={'amount'}
                                 className={'input-control'}
                                 value={defaultValues.amount} onValueChange={(e) => {
                                     if (e.value >= 10000) {
                                         setValue('amount', e.value)
                                         clearErrors("amount")
                                     } else {
                                         setValue('amount', null)
                                         setError("amount", { type: "custom", message: "El valor minimo deben ser $10.000,00 pesos" })
                                     }
                                 }}
                                 mode="currency" currency="COP" locale="es-CO" />
                    {errors.amount && <span className={'error mt-2'}> {errors.amount.message as string || 'El valor no es valido'}</span>}
                </div>

                <div className={'flex mt-3 flex-column'}>
                    <label htmlFor="description" className="font-bold block mb-3">Descripcion del pago</label>
                    <InputTextarea  className={'input-control'} rows={5} cols={30}
                                    {...register("description", {required: true})}
                    />
                    {errors.description && <span className={'error mt-2'}>Debe contener una corta descripcion</span>}
                </div>

                <Divider />

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
