let config = {};

let devConfig = (config = {
    remote: 'http://localhost:8080/',
    searchPageSize: 20
});

let prodConfig = (config = {
    remote: 'http://159.89.161.233:443/',
    searchPageSize: 20
});

//conf as per the env
if (process.env.NODE_ENV === 'development') {
    config = devConfig;
} else if (process.env.NODE_ENV === 'production') {
    config = prodConfig;
}

export default config;
