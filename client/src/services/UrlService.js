/* eslint-disable */
import axios from "axios";

const theUrl = "http://localhost:5000/urls/";


class UrlService {
    static async getUrls() {
        try {
            const res = await axios.get(theUrl);
            const data = res.data;
            return data;
        } catch (error) {
            return error.response.statusText;
        }
    }
    static async insertUrl({ priceUrl }) {
        await axios.post(theUrl, {
            url: priceUrl,
        });
    }

    static async deleteUrl(id) {
        try {
            let res = await axios.delete(`${theUrl}${id}`);
            return res;
        } catch (error) {
            console.log({ error: error });
            return error;
        }
    }

    static async scrapeUrls(urlsArray) {
        const promises = urlsArray.map(async item => {
            const response = await axios.post(theUrl, {

            })

            return {
                res: response.data,
            }
        })
        const results = await Promise.all(promises)
        console.log({ "UrlService.js": results })
    }
}

export default UrlService;