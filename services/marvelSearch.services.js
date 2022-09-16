import axios from "axios";
import md5 from 'blueimp-md5'
import config from '../config/index.js';

export async function marvelSearch(searchListing, searchTerm) {
    try {
        const url = generateUrlDianamic(searchListing, searchTerm);
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        throw new Error(JSON.stringify(e));
    }
}


const generateUrlDianamic = (searchType, searchTerm) => {
    const publickey = config.apiMarvel.MARVEL_API_PUBLIC_KEY;
    const privatekey = config.apiMarvel.MARVEL_API_PRIVATE_KEY;

    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);

    const baseUrl = `${config.apiMarvel.MARVEL_API_PUBLIC_URL}/${searchType}`;

    if (searchType === "characters") {
        return baseUrl + "?nameStartsWith=" + searchTerm + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash + "&limit=20";
    } else {
        return baseUrl + "?titleStartsWith=" + searchTerm + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash + "&limit=20";
    }
};