import {getRequest, patchRequest, postRequest} from "./axios.service"

async function getAllConcertFromAPI() {
    return getRequest('/concert', 'GETALLCONCERT')
}

async function getAllConcert() {
    let answer = await getAllConcertFromAPI()
    return answer
}

async function getConcertByIdFromAPI(id) {
    return getRequest('/concert/id?id='+id, 'GETCONCERTBYID')
}

async function getConcertById(id) {
    let answer = await getConcertByIdFromAPI(id)
    return answer
}

async function updateConcertFromAPI(data) {
    return patchRequest('/concert',data, 'GETCONCERTBYID')
}

async function updateConcert(data) {
    let answer = await updateConcertFromAPI(data)
    return answer
}

async function createConcertFromAPI(data) {
    return postRequest('/concert',data, 'CREATECONCERT')
}

async function createConcert(data) {
    let answer = await createConcertFromAPI(data)
    return answer
}





export {
    getAllConcert,
    getConcertById,
    updateConcert,
    createConcert

}