import React, {useEffect, useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import './styles.css'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Calendar} from "primereact/calendar";
import {addLocale} from "primereact/api";
import {FileUpload} from "primereact/fileupload";
import {Toast} from 'primereact/toast';
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {formatCurrency} from "../../utils";
import BreadCrumbClub from "../../components/breadcrumb-club/breadcrumb-club";

const PaymentForm = () => {

    const routeParams = useParams();

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });


    const navigate = useNavigate();
    const [sent, setSent] = useState(false);
    const [responseCreated, setResponseCreated] = useState(null);
    const [credit, setCredit] = useState(null);
    const defaultValues = {
        paymentDate: new Date(),
        file: null,
        amount: null,
        description: null
    };
    const {
        register, setValue,
        setError,
        clearErrors,
        getValues,
        handleSubmit, formState: {errors}
    } = useForm({
        defaultValues
    });
    const toast = useRef(null);

    const getCredit = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/credit/${routeParams.creditId}`);
        const creditFounded = response.data;
        setCredit(creditFounded);
        setValue('amount', creditFounded.amount/creditFounded.quotas);
    }

    useEffect(() => {
        getCredit();
        // eslint-disable-next-line
    }, []);

    const onUpload = async (event) => {
        const formData = new FormData();
        formData.append('file', event.files[0]);
        formData.append('credit', credit.title);
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.status === 201) {
            clearErrors("file")
            setValue('file', res.data.data.fileUrl)
            toast.current.show({
                severity: 'success',
                summary: 'Exito',
                detail: `Comprobante cargado como:  ${res.data.data.fileUrl}`
            });
        }
    };
    const onSubmit = async (data) => {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment`, {
            amount: data.amount,
            description: data.description,
            fileUrl: data.file,
            paymentDate: data.paymentDate,
            credit: routeParams.creditId
        });
        if (res.status === 201) {
            toast.current.show({
                severity: 'success', summary: 'Exito', life: 5000, detail: `El pago "${data.description}" se ha guardado 
            correctamente por un valor de ${formatCurrency(data.amount)} de pesos!`
            });
            setResponseCreated(res.data)
            setSent(true);
        }
    };

    const toCredits = () => {
        return navigate(`/credit/${routeParams.creditId}`);
    }

    register('amount', {required: true});

    if (!credit) {
        return (
            <div className={'px-6 py-8 text-center justify-content-center'}>
                <div className={'text-primary-500 font-medium'}>
                    Cargando ...
                </div>
            </div>
        );
    }

    return (
        <div className={'col-12 md:col-12 lg:col-12'}>
            {sent ? (
                <div className="surface-0 text-700 text-center py-7">
                    <div className="text-900 font-bold text-5xl mb-3">Pago registrado</div>
                    <div className="text-700 text-2xl my-7">El pago de la
                        cuota <strong>{+responseCreated?.updateCredit?.quotasPaid + 1}</strong> para <strong>{responseCreated?.updateCredit?.title}</strong> se
                        ha registrado con exito!</div>
                    <Button label="Aceptar" icon="pi pi-check"
                            onClick={toCredits}
                            className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"/>
                </div>
            ) : (
                <>
                    <BreadCrumbClub items={[{label: 'Creditos' , url: '/'}, {label: credit.title, url: `/credit/${credit.id}`}, {label: 'Nuevo pago', url: `/credit/${credit.id}/new-payment`}]}/>
                    <div className={'col-12 py-3'}>
                        <span className="text-xl text-900 font-bold">Registrar nuevo pago</span>
                    </div>
                    <div className={'col-12 md:col-12 lg:col-6 py-0'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Toast ref={toast}></Toast>
                            <div className={'flex mt-3 flex-column'}>
                                <label htmlFor="paymentDate" className="block text-900 font-medium mb-2">Fecha del pago</label>
                                <Calendar showIcon dateFormat="dd/mm/yy"
                                          value={defaultValues.paymentDate}
                                          maxDate={new Date()}
                                          showButtonBar
                                          locale={'es'}
                                          className={'input-control'} {...register("paymentDate", {required: true})}/>
                                {errors.paymentDate && <span className={'error'}>La fecha es requerida</span>}
                            </div>

                            <div className={'flex mt-3 flex-column'}>
                                <label htmlFor="file" className="block text-900 font-medium mb-2">Comprobante de pago</label>
                                <div className="card">
                                    <FileUpload chooseLabel={'Seleccionar comprobante'}
                                                auto
                                                uploadLabel={'Cargar'}
                                                cancelLabel={'Cancelar'}
                                                customUpload uploadHandler={onUpload}
                                                className={'input-control'}
                                                accept="image/*, application/pdf"
                                                maxFileSize={1000000}
                                                {...register("file", {required: true})}
                                                emptyTemplate={<p className="m-0">Arrastra el comprobante para
                                                    cargar.</p>}/>
                                </div>
                                {errors.file && <span className={'error mt-2'}>Falta cargar un comprobante!</span>}
                            </div>

                            <div className={'flex mt-3 flex-column'}>
                                <label htmlFor="amount" className="block text-900 font-medium mb-2">Valor a pagar</label>
                                <InputNumber inputId="amount"
                                             name={'amount'}
                                             className={'input-control'}
                                             value={getValues('amount')} onValueChange={(e) => {
                                    if (e.value >= 1000) {
                                        setValue('amount', e.value)
                                        clearErrors("amount")
                                    } else {
                                        setValue('amount', null)
                                        setError("amount", {
                                            type: "custom",
                                            message: "El valor minimo debe ser $1.000,00 pesos"
                                        })
                                    }
                                }}
                                             mode="currency" currency="COP" locale="es-CO"/>
                                {errors.amount && <span
                                    className={'error mt-2'}> {errors.amount.message as string || 'El valor no es valido'}</span>}
                            </div>

                            <div className={'flex mt-3 flex-column'}>
                                <label htmlFor="description" className="block text-900 font-medium mb-2">Descripcion del pago</label>
                                <InputTextarea className={'input-control'} rows={5} cols={30}
                                               {...register("description", {required: true})}
                                />
                                {errors.description &&
                                    <span className={'error mt-2'}>Debe contener una corta descripcion</span>}
                            </div>
                            <Divider/>
                            <div className={'pb-4 flex justify-content-end align-items-center'}>
                                <Button label="Volver" link icon="pi pi-angle-left" onClick={toCredits}/>
                                <Button type={'submit'} label="Guardar pago"/>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentForm;
