module.exports = {

    server: {
        port: process.env.PORT || 8081,
        host: process.env.HOST || '127.0.0.1',
    },
    database: {
        uri: process.env.URI_DB || 'mongodb://localhost:27017/contacts',
        promise: Promise,
        options: {
            useNewUrlParser: true,
            useCreateIndex : true
        }
    }
};