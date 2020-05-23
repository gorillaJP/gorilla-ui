let config = {};

let devConfig = (config = {
    remote: 'http://localhost:8080/'
});

let uatConfig = (config = {
    remote: 'http://159.89.161.233:443/'
});

let prodConfig = (config = {
    remote: 'http://159.89.161.233:443/'
});

if (process.env.REACT_APP_ENV === 'uat') {
    //since it is not allowed to set node env directly, this alternative is vaiable is used
    config = uatConfig;
} else {
    if (process.env.NODE_ENV === 'development') {
        //conf as per the env
        config = prodConfig;
    } else if (process.env.NODE_ENV === 'production') {
        config = prodConfig;
    }
}

export default config;
