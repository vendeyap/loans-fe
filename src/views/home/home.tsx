import React, {useEffect, useState} from 'react';
import './styles.css'
import {Link} from "react-router-dom";
import axios from "axios";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const Home = () => {

    const [payments, setPayments] = useState([])

    const getPayments = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment`);
        const paymentsList = response.data.map((item: { amount: any; }, idx: number) => {
            return {
                id: idx + 1,
                year: '1988',
                month: 'Octubre',
                paymentDate: '10/01/2023',
                value: item.amount,
                outstandingBalance: 42000000,
                statusPayment: 'Validado',
                supportImage: 'https://loan-bck.s3.us-east-2.amazonaws.com/supports/vende-ya.png',
            }
        })
        setPayments(paymentsList);
    }

    useEffect(() => {
        console.log('ls')
        getPayments()
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    };

    const imageBodyTemplate = (payment) => {
        return <a href={payment.supportImage} target={'_blank'} rel="noreferrer">
            <img src={`${payment.supportImage}`} alt={payment.statusPayment} className="w-6rem shadow-2 border-round" />
        </a> ;
    };

    const valueBodyTemplate = (payment) => {
        return formatCurrency(payment.value);
    };
    const outstandingBodyTemplate = (payment) => {
        return formatCurrency(payment.outstandingBalance);
    };


    return (
        <>
            <Card title="Informe de pago" subTitle={'Resumen de pagos para prestamo vehicular'} className={'mt-5'}>

                <div className={'flex'}>
                    <div className={'money-content text-center'}>
                        <span className={'text-2xl'}> Total de prestamo </span>
                        <span className={'text-4xl font-light pt-5'}> $ 44.000.000</span>
                    </div>

                    <div className={'money-content text-center'}>
                        <span className={'text-2xl'}> Saldo a la fecha </span>
                        <span className={'text-4xl font-light pt-5'}> $ 42.000.000</span>
                    </div>
                </div>


                <div className={'flex justify-content-end py-4'}>
                    <Link to={'/nuevo-pago'}>
                        <Button label="Registrar pago" link icon="pi pi-money-bill" />
                    </Link>
                </div>

                <div className={'flex-row'}>
                    <div className="card">
                        <DataTable value={payments} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="paymentDate" header="Fecha de pago"></Column>
                            <Column field="value" header="Valor" body={valueBodyTemplate}></Column>
                            <Column field="outstandingBalance" header="Saldo restante" body={outstandingBodyTemplate}></Column>
                            <Column field="statusPayment" header="Estado de pago"></Column>
                            <Column field="supportImage" header="Comprobante" body={imageBodyTemplate}></Column>
                        </DataTable>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default Home;
