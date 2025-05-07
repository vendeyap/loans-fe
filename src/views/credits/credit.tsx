import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import BreadCrumbClub from "../../components/breadcrumb-club/breadcrumb-club";
import {formatCurrency} from "../../utils";
import moment from "moment/moment";
import {Chart} from "primereact/chart";
import {Message} from "primereact/message";
import { Image } from 'primereact/image';
import Title from "../../components/title/title";

const Credit = () => {

    const [payments, setPayments] = useState([]);
    const [credit, setCredit] = useState(null);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const routeParams = useParams();

    const getCredit = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/credit/${routeParams.id}`);
        const creditFounded = response.data;
        setCredit(creditFounded);
        const paymentsList = response.data.payments.map((item: any, idx: number) => {
            return {
                id: idx + 1,
                description: item.description,
                paymentDate: moment(item.paymentDate).format("DD/MM/YYYY"),
                createdAt: moment(item.createdAt).format("DD/MM/YYYY hh:mm:ss a"),
                value: formatCurrency(item.amount),
                pendingAmount: formatCurrency(item.pendingAmount || 0),
                supportImage: item.fileUrl,
            }
        }).sort((a, b) => b.id - a.id);
        setPayments(paymentsList);
    }


    useEffect(() => {
        getCredit();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (credit) {
            const documentStyle = getComputedStyle(document.documentElement);
            const data = {
                labels: ['Pendiente', 'Pagado'],
                datasets: [
                    {
                        data: [credit.pendingAmount, credit.amountPaid],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--orange-400'),
                            documentStyle.getPropertyValue('--primary-400')
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--orange-300'),
                            documentStyle.getPropertyValue('--primary-300')
                        ]
                    }
                ]
            };
            const options = {
                cutout: '70%'
            };
            setChartData(data);
            setChartOptions(options);
        }
    }, [credit]);

    const imageBodyTemplate = (payment) => {
        if (payment.supportImage.includes('pdf')) {
            return <a href={payment.supportImage} target={'_blank'} rel="noreferrer">
                <div className="block text-primary-500 font-medium my-2">Ver recibo</div>
            </a>;
        }
        return <Image src={`${payment.supportImage}`} alt={payment.supportImage} width={'60'} preview />
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Informe de pagos</span>
            <Button icon="pi pi-refresh" rounded raised onClick={getCredit}/>
        </div>
    );
    const footer = `Total de pagos registrados: ${credit?.payments ? credit.payments.length : 0}`;

    return (
        <div className={'flex-row px-2 py-2'}>
            {credit ? (
                <>
                    <BreadCrumbClub items={[{label: 'Creditos' , url: '/'}, {label: credit.title}]}/>
                    <Title title={credit.title} />

                    <div className={'grid'}>

                        <div className={'grid pt-4 col-12 sm:col-6 md:col-9 lg:col-9'}>

                            <div className={'col-12'}>
                                <span className="text-xl text-900 font-bold">Resumen de credito</span>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="block text-500 font-medium mb-3">Total del credito</span>
                                            <div
                                                className="text-900 font-medium text-xl">{formatCurrency(credit.amount)}</div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="block text-500 font-medium mb-3">Saldo pendiente</span>
                                            <div
                                                className="text-900 font-medium text-xl text-red-500">{formatCurrency(credit.pendingAmount)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="block text-500 font-medium mb-3">Total pagado</span>
                                            <div
                                                className="text-900 font-medium text-xl text-green-500">{formatCurrency(credit.amountPaid)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="block text-500 font-medium mb-3">Cuotas pactadas</span>
                                            <div
                                                className="text-900 font-medium text-xl">{credit.quotas}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="block text-500 font-medium mb-3">Cuotas pendientes</span>
                                            <div
                                                className="text-900 font-medium text-xl text-orange-500">{credit.amountPaid >= credit.amount ? 'Credito pagado' : credit.pendingQuotas}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <div className="flex justify-content-between mb-3">
                                        <div>
                                            <span className="block text-500 font-medium mb-3">Cuotas pagadas</span>
                                            <div
                                                className="text-900 font-medium text-xl text-teal-500">{credit.quotasPaid}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={'grid pt-4 col-12 sm:col-6 md:col-3 lg:col-3 justify-content-center align-content-start align-items-center'}>
                            <div className={'col-12'}>
                                <span className="text-xl text-900 font-bold">Progreso de credito</span>
                            </div>
                            <div className="card flex justify-content-center align-content-center align-items-center">
                                <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full h-15rem md:w-15rem lg:w-15rem pt-3" />
                            </div>
                        </div>


                    </div>


                    <div className="grid">

                        <div className={'grid col-12 md:col-12 lg:col-12'}>
                            <div className={'col-6'}>
                                <Message className={'flex justify-content-start'} severity="info" text={`Cuota de ${formatCurrency(credit.amount/credit.quotas)} de pesos`} />
                            </div>

                            <div className={'col-6'}>
                                <Message className={'flex justify-content-start'} severity="info" text={`Termina el ${moment(credit.createdAt).add(+credit.quotas, 'months').format('DD/MM/YYYY')}`} />
                            </div>
                        </div>


                        <div className={'grid col-12 md:col-12 lg:col-12 justify-content-end pb-2'}>
                            <Link to={`/credit/${credit.id}/new-payment`}>
                                <Button label="Registrar pago" link icon="pi pi-money-bill"/>
                            </Link>
                        </div>

                        {/*<div className={'col-12 md:col-12 lg:col-12'}>
                            <div className="font-medium text-xl text-900">Informe de pagos</div>
                        </div>*/}

                        <div className={'col-12 md:col-12 lg:col-12 my-2'}>
                            <div className="card shadow-2">
                                <DataTable value={payments} stripedRows tableStyle={{minWidth: '5rem'}} header={header}
                                           paginator
                                           rows={50} rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                                           resizableColumns
                                           removableSort
                                           footer={footer}>
                                    <Column sortable field="id" header="ID"></Column>
                                    <Column sortable field="paymentDate" header="Fecha de pago"></Column>
                                    <Column sortable field="description" header="Descripcion"></Column>
                                    {/*<Column field="createdAt" header="Fecha de registro"></Column>*/}
                                    <Column sortable field="value" header="Valor"></Column>
                                    <Column sortable field="pendingAmount" header="Saldo restante"></Column>
                                    <Column field="supportImage" header="Comprobante"
                                            body={imageBodyTemplate}></Column>
                                </DataTable>
                            </div>
                        </div>

                    </div>
                </>
            ) : <div className={'px-6 py-8 text-center justify-content-center'}>
              <div className="flex flex-column align-items-center justify-content-center p-8">
                <i className="pi pi-spin pi-spinner text-6xl p-4 text-blue-600"></i>
                <span className="text-900 font-medium text-xl mb-2">Cargando...</span>
              </div>
            </div>}


        </div>
    );
};

export default Credit;
