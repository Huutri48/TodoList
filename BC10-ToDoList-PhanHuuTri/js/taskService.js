import { API_URL } from "./constant.js";

export default class ListTask {
    callApi(uri, method, data) {
        return axios({
            url: API_URL + uri,
            method,
            data,
        });
    }
}
