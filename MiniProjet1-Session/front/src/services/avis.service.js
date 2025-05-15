import {patchRequest, getRequest, postRequest} from "./axios.service"

async function getAllAvisFromAPI(id) {
    return getRequest('/avis?id='+id, 'GETALLAVIS')
}

async function getAllAvis(id) {
    let answer = await getAllAvisFromAPI(id)
    return answer
}

async function createAvisFromAPI(data){
    return postRequest('/avis/create',data, 'CREATEAVIS')
}

async function createAvis(data) {
    let answer = await createAvisFromAPI(data)
    return answer
}

async function deleteAvisFromAPI(data){
    console.log(data)
    return patchRequest('/avis/delete',data, 'DELETEAVIS')
}

async function deleteAvis(data) {
    let answer = await deleteAvisFromAPI(data)
    return answer
}

export {
    getAllAvis,
    createAvis,
    deleteAvis,
}