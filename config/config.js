module.exports = {

    server: {
        process:{
            auto_spawn: true,
            threshold: '50%', // 50% Auto spawn new processes until the server reaches the max_spawn
            max_spawn: '75%' // 75% of the available cores on the server
        }
    },

    redis: {
        portNumber: 6379,
        host: 'localhost',
        password: '',
        database: 'default' // app name
    },

    sockets: {
        max_connections: 4000,
        prefered_connections_enabled: true // Perfered connections allow for your max connections to give priority to a premium client distiguished by his given token during authorization.
    },

    site: {
        name: 'site',
        namespace: this.name + '_',
        public: '',
        rootFolder: '',
        uiContainers: {
            name        : 'room_name',
            messages    : 'chat_log',
            users       : 'roster',
            status      : 'show_status'
        }
    },

    api: {
        key: 'yourDirtyLittleSecret'
    }

};