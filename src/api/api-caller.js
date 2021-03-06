import axios from "axios";

// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const proxyUrl = "https://bypasscors.herokuapp.com/api/?url=";

const rss = axios.create({
    baseURL: proxyUrl + `https://rss.itunes.apple.com/api/v1/hk/ios-apps`,
    headers: {
        Accept: "*/*"
    }
});

const itunes = axios.create({
    baseURL: proxyUrl + `https://itunes.apple.com/hk`,
    headers: {
        Accept: "*/*"
    }
});

const ApiCaller = { rss, itunes };

export default ApiCaller;
