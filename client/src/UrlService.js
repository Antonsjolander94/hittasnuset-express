/* eslint-disable */
import axios from "axios";

const url = "http://localhost:5000/api/urls/";


class UrlService {
    static getUrls() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(url => ({
                        ...url,
                        createdAt: new Date(url.createdAt)
                    }))
                )
            } catch (error) {
                reject(error)
            }
        });
    }
    static insertUrl({ priceUrl }) {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.post(url, {
                    url: priceUrl,
                });
                resolve("Url tillagd.")
            } catch (error) {
                reject(error.response.data)
            }
        })
    }
    static deleteAllUrls() {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await axios.delete(url);
                resolve(res.data.message)
            } catch (error) {
                reject(error.response.data)
            }
        })
    }

    static deleteUrl(id) {
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

export default UrlService;