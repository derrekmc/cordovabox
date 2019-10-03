module.exports = {

    application: {
        name: "CordovaBox",
        logo: {
            show: true,
            title: "CordovaBox",
            subTitle: ".io"
        }
    },

    security:{

        jwt: {
            public: {
                key: 'publickey'
            },

            secure: {
                key: 'securekey'
            }
        },

        api: {
            public: {
                key: 'secretKey',
                routes: ['/*']
            }
        }
    },

    server: {
        https: false,
        noCache: false,
        port: 3000,
        process:{
            auto_spawn: true,
            threshold: '50%', // 50% Auto spawn new processes until the server reaches the max_spawn
            max_spawn: '75%' // 75% of the available cores on the server
        },
        socketIO: true,
        cluster: false,
        redisSessions: false
    },

    //Store
    dataStore: {
        mongodb:{
            connectURI: process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://heroku_1zzwlv1c:l5n9rt2p1q1k5s266dadfp51tv@ds139775.mlab.com:39775/heroku_1zzwlv1c'
        },

        redis: {
            connectURI: process.env.REDIS_URL
        }
    },

    paymentGateway: {
        /**
         * Add payment gateway objects here
         */
        testMode: false
    },

    thirdParty:{
        /**
         * Add payment thirdParty objects here
         */

        mandrill: {
            key: ""
        }
    },

    sockets: {
        max_connections: 4000,
        preferred_connections_enabled: true // Preferred connections allow for your max connections to give priority to a premium client distinguished by his given token during authorization.
    },

    site: {
        www: 'www.CordovaBox.io',
        name: 'CordovaBox',
        namespace: this.name + '_',
        public: '',
        rootFolder: 'public',
        author: "Derrek Cordova",
        rootDomain: "CordovaBox.com",
        favicon: '/images/favicon.ico',
        navigation: {},
        blockedIps: []
    },

    api: {
        key: 'yourSecret'
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