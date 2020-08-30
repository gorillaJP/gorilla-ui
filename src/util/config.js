let config = {};

//remote: 'http://localhost:8080/'
let devConfig = {
    remote: 'https://gorilla.lk:444/' //directly to APIs
};

//remote: 'https://159.89.161.233:444/'
let uatConfig = {
    remote: 'https://gorilla.lk:444/' //directly to the APIs
};

//remote: 'https://gorilla.lk:444/'
let prodConfig = {
    remote: 'https://gorilla.lk/' //directly to UI to avoid CORS. in server.js there is a proxy to route requests to 444
};

if (process.env.REACT_APP_ENV === 'uat') {
    //since it is not allowed to set node env directly, this alternative is vaiable is used
    config = uatConfig;
} else {
    if (process.env.NODE_ENV === 'development') {
        //conf as per the env
        config = uatConfig;
    } else if (process.env.NODE_ENV === 'production') {
        //since it is not allowed to set node env directly, this alternative is vaiable is used
        config = prodConfig;
    }
}

export default config;
