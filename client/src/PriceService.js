/* eslint-disable */
import axios from "axios";

const url = "http://localhost:5000/api/prices/";


class PriceService {

    static getPrices() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(price => ({
                        ...price,
                        createdAt: new Date(price.createdAt)
                    }))
                )
            } catch (error) {
                reject(error)
            }
        });
    }

    static insertPrice({ company, title, unitPrice, tenPrice, thirtyPrice, fiftyPrice }) {
        return axios.post(url, {
            company,
            title,
            unitPrice,
            tenPrice,
            thirtyPrice,
            fiftyPrice
        });
    }

    static deletePrice(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let idDeleted = id;
                axios.delete(`${url}${id}`);
                resolve(idDeleted)
            } catch (error) {
                reject("Något gick fel")
            }
        })
    }

}

export default PriceService;