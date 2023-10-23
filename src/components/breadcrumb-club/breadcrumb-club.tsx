import React, {FC} from 'react';
import {BreadCrumb} from "primereact/breadcrumb";

const BreadCrumbClub: FC<{
    items: any[]
}> = ({items = []}) => {
    const home = { icon: 'pi pi-home', url: '/' }
    return (
        <BreadCrumb model={items} home={home} />
    );
};

export default BreadCrumbClub;
