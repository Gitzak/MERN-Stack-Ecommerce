module.exports = {
    app: {
        name: 'Mern Stack - Ecommerce Api',
    },
    port: process.env.PORT || 6000,
    database: {
        url: process.env.MONGO_URI
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        tokenLife: '1d'
    },
};