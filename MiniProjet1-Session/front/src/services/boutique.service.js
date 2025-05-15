import {getRequest} from "./axios.service"

async function getAllArticleFromAPI() {
    return getRequest('/boutique', 'GETALLARTICLE')
}


async function getAllArticle() {
    let answer = await getAllArticleFromAPI()
    return answer
}

async function getArticleByIdFromAPI(id) {
    return getRequest('/boutique/id?id='+id, 'GETARTICLEBYID')
}

async function getArticleById(id){
    let answer = await getArticleByIdFromAPI(id)
    return answer
}

export {
    getAllArticle,
    getArticleById
}