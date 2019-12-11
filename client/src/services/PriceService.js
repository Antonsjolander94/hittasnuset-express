/* eslint-disable */
import axios from "axios";

const theUrl = "http://localhost:5000/prices/";


class PriceService {
    static async getPrices() {
        try {
            const res = await axios.get(theUrl);
            const data = res.data;
            console.log({ prices: data })
            data.map(price => ({
                ...price,
                createdAt: new Date(price.createdAt)
            }))
            return data;
        } catch (error) {
            console.log({ error: error })
        }
    }
    static async insertPrice(priceArray) {
        console.log({ "price array": priceArray })
        // { company, title, unitPrice, tenPrice, thirtyPrice, fiftyPrice }
        const promises = priceArray.map(async item => {
            console.log({ "price item": item })
            const response = await axios.post(theUrl, {
                company: item.scraped.company,
                title: item.scraped.title,
                unitPrice: item.scraped.unitPrice,
                tenPrice: item.scraped.tenPrice,
                thirtyPrice: item.scraped.thirtyPrice,
                fiftyPrice: item.scraped.fiftyPrice
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

    static async deletePrice(id) {
        try {
            let res = await axios.delete(`${theUrl}${id}`);
            return res
        } catch (error) {
            console.log({ error: error })
        }
    }
    static async deleteAllPrices() {
        try {
            let res = await axios.delete(theUrl);
            return res;
        } catch (error) {
            console.log({ error: error })
        }
    }
}

export default PriceService;