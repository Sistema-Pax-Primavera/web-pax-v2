import React from 'react';

const ErrorComponent = ({ message, errorCode }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Erro {errorCode}</h2>
            <p>{message}</p>
        </div>
    );
};

export default ErrorComponent;
