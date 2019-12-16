/* eslint-disable */
import axios from "axios";

const theUrl = "http://localhost:5000/identifiers/";


class IdentifierService {
    static async getIdentifiers() {
        try {
            const res = await axios.get(theUrl);
            const data = res.data;
            console.log({ identifiers: data })
            return data;
        } catch (error) {
            console.log({ error: error })
        }
    }
    static async insertIdentifier({ title }) {
        await axios.post(theUrl, {
            title: title,
        });
    }
    static async deleteIdentifier(id) {
        try {
            let res = await axios.delete(`${theUrl}${id}`);
            return res
        } catch (error) {
            console.log({ error: error })
        }
    }
    static async deleteAllIdentifiers() {
        try {
            let res = await axios.delete(theUrl);
            return res;
        } catch (error) {
            console.log({ error: error })
        }
    }
}

export default IdentifierService;