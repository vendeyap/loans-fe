import React, {FC} from 'react';
import './styles.css'

const Header: FC = () => {

    return (
        <div className={'header'}>
                <a href={'/'} className={'title'}>
                    <h1>Prestamo Mazda 3</h1>
                </a>
        </div>
    );
};

export default Header;
