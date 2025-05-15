// src/services/prestataire.service.js
import { getRequest, postRequest, putRequest, deleteRequest } from "./axios.service"



async function getPrestaireByIdFromAPI(id) {
    return getRequest(`/prestataires/${id}`, 'GETPRESTATAIRE')
}

async function getPrestaireById(id) {
    let answer = await getPrestaireByIdFromAPI(id)
    return answer
}

async function createPrestaireFromAPI(prestataire) {
    return postRequest('/prestataires', prestataire, 'CREATEPRESTATAIRE')
}

async function createPrestataire(prestataire) {
    let answer = await createPrestaireFromAPI(prestataire)
    return answer
}

async function updatePrestaireFromAPI(id, prestataire) {
    return putRequest(`/prestataires/${id}`, prestataire, 'UPDATEPRESTATAIRE')
}

async function updatePrestataire(id, prestataire) {
    let answer = await updatePrestaireFromAPI(id, prestataire)
    return answer
}

async function deletePrestaireFromAPI(id) {
    return deleteRequest(`/prestataires/${id}`, 'DELETEPRESTATAIRE')
}

async function deletePrestataire(id) {
    let answer = await deletePrestaireFromAPI(id)
    return answer
}

export {
    getPrestaireById,
    createPrestataire,
    updatePrestataire,
    deletePrestataire
}