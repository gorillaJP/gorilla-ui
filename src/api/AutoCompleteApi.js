import axios from 'axios';

export const cityAutoComplete = async value => {
    return await axios.get('http://159.89.161.233:443/api/meta/allcities?q=' + value);
};

export const sectorAutoComplete = async value => {
    return await axios.get('http://159.89.161.233:443/api/meta/allsectors?q=' + value);
};