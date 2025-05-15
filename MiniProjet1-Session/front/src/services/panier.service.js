import {getRequest, patchRequest, postRequest} from "./axios.service"


async function addToPanierActiviteAPI(data) {
    return postRequest('/panier/activite',data, 'ADDTOPANIER')
}

async function addToPanierActivite(data) {
    let answer = await addToPanierActiviteAPI(data)
    return answer
}

async function getPanierActiviteFromAPI(id) {
    return getRequest('/panier/activite?id='+id, 'GETPANIER')
}

async function getPanierActivite(id) {
    let answer = await getPanierActiviteFromAPI(id)
    return answer
}

async function deletePanierActiviteFromAPI(id) {
    return patchRequest('/panier/activite?id='+id, 'GETPANIER')
}

async function deletePanierActivite(id) {
    let answer = await deletePanierActiviteFromAPI(id)
    return answer
}

//article

async function addToPanierArticleFromAPI(data) {
    return postRequest('/panier/article',data, 'ADDTOPANIERARTICLE')
}

async function addToPanierArticle(data) {
    let answer = await addToPanierArticleFromAPI(data)
    return answer
}

async function getPanierArticleFromAPI(id) {
    return getRequest('/panier/article?id='+id, 'GETPANIERARTICLE')
}

async function getPanierArticle(id) {
    let answer = await getPanierArticleFromAPI(id)
    return answer
}

async function deletePanierArticleFromAPI(id) {
    return patchRequest('/panier/article?id='+id, 'GETPANIERARTICLE')
}

async function deletePanierArticle(id) {
    let answer = await deletePanierArticleFromAPI(id)
    return answer
}

async function createAchatFromAPI(data) {
    return postRequest('/panier/achat',data, 'CREATEACHAT')
}

async function createAchat(data) {
    let answer = await createAchatFromAPI(data)
    return answer
}

async function getAchatsFromAPI(id) {
    return getRequest('/panier/achat?id='+id, 'CREATEACHAT')
}

async function getAchats(id) {
    let answer = await getAchatsFromAPI(id)
    return answer
}





export {
    addToPanierActivite,
    getPanierActivite,
    deletePanierActivite,

    addToPanierArticle,
    getPanierArticle,
    deletePanierArticle,
    createAchat,
    getAchats

}