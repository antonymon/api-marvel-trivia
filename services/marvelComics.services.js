import axios from "axios";
import md5 from 'blueimp-md5'
import config from '../config/index.js';

export async function marvelComics(comicId) {
    try {
        const url = generateUrlDianamic(comicId);
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        throw new Error(JSON.stringify(e));
    }
}


const generateUrlDianamic = (comicId) => {
    const publickey = config.apiMarvel.MARVEL_API_PUBLIC_KEY;
    const privatekey = config.apiMarvel.MARVEL_API_PRIVATE_KEY;

    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);

    const baseUrl = `${config.apiMarvel.MARVEL_API_PUBLIC_URL}/comics/`;

    return baseUrl + comicId + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
};