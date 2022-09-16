import axios from "axios";
import md5 from 'blueimp-md5'
import config from '../config/index.js';

export async function marvelComicList(pageNum) {
    try {
        const url = generateUrlDianamic(pageNum);
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        throw new Error(JSON.stringify(e));
    }
}


const generateUrlDianamic = (pageNum) => {
    const publickey = config.apiMarvel.MARVEL_API_PUBLIC_KEY;
    const privatekey = config.apiMarvel.MARVEL_API_PRIVATE_KEY;

    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);

    const baseUrl = `${config.apiMarvel.MARVEL_API_PUBLIC_URL}/comics`;
    let offset = parseInt(pageNum) * 20;

    if (pageNum === "0") {
        return baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
    } else {
        return baseUrl + "?limit=20&offset=" + offset + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
    }
};