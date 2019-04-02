import axios from "axios";

export const axiosDefault = axios.create({
    baseURL:
        "https://storemanager-paul-v2.herokuapp.com/"
});

let token = localStorage.getItem("token");

export const axiosWithToken = axios.create({
    baseURL:
        "https://storemanager-paul-v2.herokuapp.com/",
    headers: {
        Authorization: `${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});
