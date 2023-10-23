import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import BreadCrumbClub from "../../components/breadcrumb-club/breadcrumb-club";
import {Link} from "react-router-dom";
import moment from "moment";

const Home: FC<any> = () => {

    const [credits, setCredits] = useState([])

    const getCredits = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/credit`);
        const creditsList = response.data.map(c => {
            return {
                id: c.id,
                title: c.title,
                amount: formatCurrency(c.amount),
                amountPaid: formatCurrency(c.amountPaid),
                pendingAmount: formatCurrency(c.pendingAmount),
                totalPayments: c.payments.length,
                createdAt: moment(c.createdAt).format("DD/MM/YYYY hh:mm:ss a")
            }
        });
        setCredits(creditsList);
    }

    useEffect(() => {
        getCredits()
        // eslint-disable-next-line
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('es-CO', {style: 'currency', currency: 'COP'});
    };

    return (
        <div className={'flex-row px-2 py-2'}>
            <BreadCrumbClub items={[{label: 'Creditos', url: '/'}]}/>

            <div className={'col-12 mt-2 text-center pt-2'}>
                <div className="font-semibold text-2xl text-900">Listado de creditos</div>
            </div>

            <div className={'grid py-4'}>
                {credits.map((credit) => {
                    return (
                            <div className="col-12 md:col-6 lg:col-4" key={credit.id}>
                                <Link to={`/credit/${credit.id}`} style={{
                                    textDecoration: 'none'
                                }}>
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-2">
                                        <div>
                                            <div className="text-900 font-medium text-xl mb-4">{credit.title}</div>
                                            <div className="block text-500 font-medium my-2">Total pagado: <span className={'text-green-500'}>{credit.amountPaid}</span> </div>
                                            <div className="block text-500 font-medium my-2">Saldo pendiente: <span className={'text-red-500'}>{credit.pendingAmount}</span> </div>
                                            <div className="block text-500 font-medium my-2">Pagos realizados: <span className={'text-blue-500'}>{credit.totalPayments}</span> </div>
                                        </div>
                                        <div className="flex align-items-center justify-content-center bg-gray-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                            <i className="pi pi-dollar text-green-900 text-xl"></i>
                                        </div>
                                    </div>
                                    <span className="text-500">{credit.createdAt}</span>
                                </div>
                                </Link>
                            </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Home;
