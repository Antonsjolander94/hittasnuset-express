/* eslint-disable */
import axios from "axios";

const theUrl = "http://localhost:5000/scrape/";


class UrlService {
    static async scrapeUrls(urlsArray) {
        const promises = urlsArray.map(async item => {
            const response = await axios.post(theUrl, {
                url: item.url
            })

            return {
                res: response,
            }
        })

        const results = await Promise.all(promises)

        let arr = [];

        results.map(res => {
            arr.push(res.res.data)
        })
        return arr
    }
}

export default UrlService;