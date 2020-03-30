let config = {};

let devConfig = (config = {
    remote: 'http://localhost:8080/'
});

let uatConfig = (config = {
    remote: 'http://localhost:8080/'
});

let prodConfig = (config = {
    remote: 'http://159.89.161.233:443/'
});

//conf as per the env
if (process.env.NODE_ENV === 'development') {
    config = devConfig;
} else if (process.env.NODE_ENV === 'uat') {
    config = uatConfig;
} else if (process.env.NODE_ENV === 'production') {
    config = prodConfig;
}

export default config;
