import React, {FC} from 'react';

const Title: FC<any> = ({title}) => {
    return (
        <div className="font-semibold text-center py-2 text-3xl">
            <span className="text-900">{title}</span>
        </div>
    );
};

export default Title;
