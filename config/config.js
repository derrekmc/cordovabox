module.exports = {

    redis: {
        portNumber: 6379,
        host: 'localhost',
        password: '',
        database: 'bblive' // app name
    },

    sockets: {
        max_connections: 4000,
        prefered_connections_enabled: true // Perfered connections allow for your max connections to give priority to a premium client distiguished by his given token during authorization.
    },

    site: {
        name: 'naked',
        namespace: this.name + '_',
        rootFolder:''
    }
}