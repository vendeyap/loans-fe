import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import './styles.css'
import {Link} from "react-router-dom";
import axios from "axios";

const Home = () => {

    const [data, setData] = useState([])

    const getPayments = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment`);
        const paymentsList = response.data.map((item: { amount: any; }, idx: number) => {
            return {
                id: idx + 1,
                year: '1988',
                month: 'Octubre',
                paymentDate: '10/01/2023',
                value: item.amount,
                outstandingBalance: '$ 42.000.000',
                statusPayment: 'Validado',
            }
        })
        setData(paymentsList);
    }

    useEffect(() => {
        getPayments()
    }, []);

    const columns = [
        {
            name: 'No de pago',
            selector: (row) => row.id,
        },
        {
            name: 'Año',
            selector: (row) => row.year,
        },
        {
            name: 'Mes',
            selector: (row) => row.month,
        },
        {
            name: 'Fecha de pago',
            selector: (row) => row.paymentDate,
        },
        {
            name: 'Valor',
            selector: (row) => row.value,
        },
        {
            name: 'Saldo pendiente',
            selector: (row) => row.outstandingBalance,
        },
        {
            name: 'Estado del pago',
            selector: (row) => row.statusPayment,
        },
        {
            name: 'Acciones',
            selector: (row) => row.statusPayment,
        },
    ];

    return (
        <div className={'home'}>

            <div className={'money-content text-center'}>
                <span className={'money-title'}> Saldo total a la fecha </span>
                <span className={'money-price'}> $ 44.000.000</span>
            </div>

            <div className={'button-content'}>
                <Link to={'/nuevo-pago'} className={'button-generic'}>
                    Registrar Pago
                </Link>
            </div>

            <div className={'table-content'}>
                <DataTable
                    columns={columns as any}
                    data={data}
                />
            </div>

        </div>
    );
};

export default Home;
