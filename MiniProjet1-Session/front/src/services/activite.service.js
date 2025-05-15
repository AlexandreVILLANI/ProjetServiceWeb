import {getRequest, patchRequest, postRequest} from "./axios.service"
import axios from '@/services/axios.service'

async function getAllActiviteByTypeFromAPI(type) {
    return getRequest('/activite/type?type='+type, 'GETALLACTIVITEBYTYPE')
}

async function getAllActiviteByType(type) {
    let answer = await getAllActiviteByTypeFromAPI(type)
    return answer
}



async function getActiviteByIdFromAPI(id) {
    return getRequest('/activite/id?id='+id, 'GETACTIVITEBYID')
}

async function getActiviteById(id) {
    let answer = await getActiviteByIdFromAPI(id)
    return answer
}

async function updateNbPlacesFromAPI(data){
    return patchRequest('/activite/nb',data, 'UPDATENBPLACES')
}

async function updateNbPlaces(data) {
    let answer = await updateNbPlacesFromAPI(data)
    return answer
}

async function updateActiviteFromAPI(data){
    return patchRequest('/activite',data, 'UPDATEACTIVITE')
}

async function updateActivite(data) {
    let answer = await updateActiviteFromAPI(data)
    return answer
}

async function updateCreneauFromAPI(data){
    return patchRequest('/activite/creneau',data, 'UPDATEACTIVITE')
}

async function updateCreneau(data) {
    let answer = await updateCreneauFromAPI(data)
    return answer
}

async function createReservationFromAPI(data){
    return postRequest('/activite/reservation',data, 'CREATERESERVATION')
}

async function createReservation(data) {
    let answer = await createReservationFromAPI(data)
    return answer
}

async function createActiviteFromAPI(data){
    return postRequest('/activite/creer',data, 'CREATEACTIVITE')
}

async function createActivite(data) {
    let answer = await createActiviteFromAPI(data)
    return answer
}


async function getMoyenneNoteFromAPI(){
    return getRequest('/activite/moyenneNote', 'GETMOYENNENOTE')
}

async function getMoyenneNote() {
    let answer = await getMoyenneNoteFromAPI()
    return answer
}

async function deleteActiviteFromAPI(data){
    return patchRequest('/activite/delete', data,'supprimerActivite')
}

async function deleteActivite(data) {
    let answer = await deleteActiviteFromAPI(data)
    return answer
}

async function deleteCreneauFromAPI(data){
    return patchRequest('/activite/deleteCreneau', data,'supprimercreneau')
}

async function deleteCreneau(data) {
    let answer = await deleteCreneauFromAPI(data)
    return answer
}


async function createCreneauFromAPI(data){
    return postRequest('/activite/creerCreneau',data, 'CREATECRENEAU')
}

async function createCreneau(data) {
    let answer = await createCreneauFromAPI(data)
    return answer
}



async function getReservationsByActiviteFromAPI(id){
    return getRequest('/activite/reservations?id='+id, 'getreservationbyactivite')
}

async function getReservationsByActivite(data) {
    let answer = await getReservationsByActiviteFromAPI(data)
    return answer
}

async function deleteReservationFromAPI(data){
    return patchRequest('/activite/deleteReservation',data, 'deleteReservation')
}

async function deleteReservation(id) {
    let answer = await deleteReservationFromAPI(id)
    return answer
}


export async function getActivitesByPrestataire(id) {
    const res = await axios.get(`/activite/prestataire/${id}`);
    return res.data;
}


export {
    getActiviteById,
    updateNbPlaces,
    createReservation,
    getAllActiviteByType,
    getMoyenneNote,
    updateActivite,
    updateCreneau,
    createActivite,
    deleteActivite,
    deleteCreneau,
    createCreneau,
    getReservationsByActivite,
    deleteReservation
}