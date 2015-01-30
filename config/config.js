module.exports = {

    application: {
        name: 'CordovaBox',
        showLogo: true,
        author: "Derrek Cordova",
        favicon: 'favicon.ico'
    },

    security:{
        jwt: {
            public: {
                key: 'i271az2Z0PMjhd6w0rX019g0iS7c2q4R'
            },

            secure: {
                key: 'jbfsdkfbsdfbsdfbfsbdffsdbf9ds8hfdsf8ydsfdsfdsy9fdsf9ds7f9dsf79(D&(F*&(*F&SDF&SD(FSD&F(S&F(fdsfds98fdsfydshfhsdfodsjfndslfdsnfpodsf9ufy98dsfysdyf(&FTYDS^*FSD*FTSD*FTS'
            }
        }
    },

    server: {
        port: 3001,
        process:{
            auto_spawn: true,
            threshold: '50%', // 50% Auto spawn new processes until the server reaches the max_spawn
            max_spawn: '75%' // 75% of the available cores on the server
        }
    },

    //Store
    dataStore: {

    },

    redis: {
        portNumber: 6379,
        host: 'localhost',
        password: '',
        database: 'default' // app name
    },

    sockets: {
        max_connections: 4000,
        preferred_connections_enabled: true // Preferred connections allow for your max connections to give priority to a premium client distinguished by his given token during authorization.
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
    },

    /**
     * Winston Console logger
     */
    logger:{
        level: 'silly',
        colorize : true,
        timestamp: false,
        transports: []
    },

    globals: {
        lodash: true,
        async: false
    }

};