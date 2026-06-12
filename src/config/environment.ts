export const environment = {
    production: process.env.NODE_ENV === 'production',
    apiUrl: process.env.REACT_APP_API_URL || 'https://itx-frontend-test.onrender.com/',
    apiTimeout: Number(process.env.REACT_APP_API_TIMEOUT) || 5000,

    products: 'api/product',
    productDetail: 'api/product/',

    cart: 'api/cart'
};