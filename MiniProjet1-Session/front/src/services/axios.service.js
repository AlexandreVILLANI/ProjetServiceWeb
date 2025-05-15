import axios from 'axios'
import store from "@/store";
axios.defaults.withCredentials = true;

const axiosAgent = axios.create({
    baseURL: 'http://localhost:3000/',
});

axiosAgent.interceptors.request.use(config => {
    // Récupération de la phrase secrète directement depuis le store Vuex
    const session_id = store.getters["user/getSessionId"];
    console.log(session_id)
    if (session_id) {
        config.headers['session_id'] = session_id;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

function handleError(serviceName, err) {
    if (err.response) {
        console.log("ERROR while calling SERVICE " + serviceName + ": " + JSON.stringify(err.response));
        return {
            data: {
                error: 1,
                data: err.response.data
            }
        };
    }
    else if (err.request) {
        console.log("NETWORK ERROR while calling SERVICE "+serviceName+ ": " + JSON.stringify(err.request));
        return {
            data: {
                error: 1,
                data: 'Le serveur est injoignable ou l\'URL demandée n\'existe pas'
            }
        };
    }
    else {
        console.log("UNKNOWN ERROR while calling SERVICE "+serviceName);
        return {
            data: {
                error: 1,
                data: 'Erreur inconnue'
            }
        };
    }
}
async function getRequest(uri, name) {

    let response = null
    try {
        response = await axiosAgent.get(uri)
    } catch (err) {
        response = handleError(name, err);
    }
    return response;
}


async function postRequest(uri, data, name) {
    let response = null
    try {
        response = await axiosAgent.post(uri, data)
    } catch (err) {
        response = handleError(name, err);
    }
    return response.data;
}


async function patchRequest(uri, data, name) {
    let response = null
    try {
        response = await axiosAgent.patch(uri, data)
    } catch (err) {
        response = handleError(name, err);
    }
    return response.data;
}

async function deleteRequest(uri, data, name) {
    let response = null
    try {
        response = await axiosAgent.delete(uri, data)
    } catch (err) {
        response = handleError(name, err);
    }
    return response.data;
}

export default instance;

export {
    getRequest,
    postRequest,
    deleteRequest,
    patchRequest

}