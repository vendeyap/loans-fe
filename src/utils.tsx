export const formatCurrency = (value) => {
    return value.toLocaleString('es-CO', {style: 'currency', currency: 'COP'});
};