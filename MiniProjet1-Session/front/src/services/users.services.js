import {getRequest,postRequest,patchRequest} from "./axios.service"

async function getAllUsersFromAPI() {
    return getRequest('/users', 'GETALLUSERS')
}

async function getAllUsers() {
    let answer = await getAllUsersFromAPI()
    return answer
}

async function getAllPrestatairesFromAPI() {
    return getRequest('/users/prestataires', 'GETALLUSERS')
}

async function getAllPrestataires() {
    let answer = await getAllPrestatairesFromAPI()
    return answer
}


async function createUserFromAPI(data) {
    return postRequest('/users',data, 'CREATEUSER')
}

async function createUser(data) {
    let answer = await createUserFromAPI(data)
    return answer
}

async function createPrestataireFromAPI(data) {
    return postRequest('/users/prestataire',data, 'CREATEPRESTATAIRE')
}

async function createPrestataire(data) {
    let answer = await createPrestataireFromAPI(data)
    return answer
}

async function updateUtilisateurFromAPI(data) {
    return patchRequest('/users',data, 'UPDATEUSER')
}

async function updateUtilisateur(data) {
    let answer = await updateUtilisateurFromAPI(data)
    return answer
}

async function updatePrestataireFromAPI(data) {
    return patchRequest('/users/prestataire',data, 'UPDATEPRESTATAIRE')
}

async function updatePrestataire(data) {
    let answer = await updatePrestataireFromAPI(data)
    return answer
}

async function getAllReservations(id) {
    let answer = await getAllReservationsFromAPI(id)
    return answer
}

async function getAllReservationsFromAPI(id) {
    return getRequest('/users/reservations?id='+id, 'GETALLRESERVATIONS')
}


async function getActivitesByPrestataire(id) {
    let answer = await getActivitesByPrestataireFromAPI(id)
    return answer
}

async function getActivitesByPrestataireFromAPI(id) {
    return getRequest('/users/activites?id='+id, 'GETACTIVITEBYPRESTATAIRE')
}

async function deleteUtilisateurFromAPI(data) {
    return patchRequest('/users/delete',data, 'DELETEUSER')
}

async function deleteUtilisateur(data) {
    let answer = await deleteUtilisateurFromAPI(data)
    return answer
}

async function deletePrestataireFromAPI(data) {
    return patchRequest('/users/prestataire/delete',data, 'DELETEUSER')
}

async function deletePrestataire(data) {
    let answer = await deletePrestataireFromAPI(data)
    return answer
}

async function getUserFromSessionIdFromAPI() {
    return await getRequest( '/users/getBySessionId', 'GETUSER_BY_SESSION_ID');
}

async function getUserFromSessionId() {
    return await getUserFromSessionIdFromAPI();
}

async function getPrestataireByUserIdFromAPI(id) {
    return await getRequest( '/users/getPrestataireById?id='+id, 'GETPRESTATAIRE_BY_USER_ID');
}

async function getPrestataireByUserId(id) {
    return await getPrestataireByUserIdFromAPI(id);
}

async function getVueActiviteById(id) {
    let answer = await getVueActiviteByIdFromAPI(id)
    return answer
}

async function getVueActiviteByIdFromAPI(id) {
    return getRequest('/users/getVueById?id='+id, 'GETVUEACTIVITEBYID')
}

async function updateVueActiviteFromAPI(id_activite) {
    return patchRequest('/users/updateVue', { id_activite }, 'UPDATEVUEACTIVITE');
}

async function updateVueActivite(id_activite) {
    return await updateVueActiviteFromAPI(id_activite);
}



export {
    getAllUsers,
    createUser,
    updateUtilisateur,
    getAllReservations,
    deleteUtilisateur,
    updatePrestataire,
    getActivitesByPrestataire,
    getUserFromSessionId,
    getPrestataireByUserId,
    getAllPrestataires,
    createPrestataire,
    deletePrestataire,
    getVueActiviteById,
    updateVueActivite
}