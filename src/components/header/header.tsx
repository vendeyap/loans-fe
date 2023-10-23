import React, {FC} from 'react';
import './styles.css'

const Header: FC = () => {

    return (
        <div className={'flex-row col-12 header'}>
            <div className={' font-medium text-3xl text-white py-2 px-2'}>Clubember</div>
        </div>
    );
};

export default Header;
