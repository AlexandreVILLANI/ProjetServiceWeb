import axios from './axios.service';

export default {
    async getCreneauxByActivite(idActivite) {
        const res = await axios.get(`/api/activites/${idActivite}/creneaux`);
        return res.data;
    },
    async syncCreneauxForActivite(idActivite, payload) {
        const res = await axios.post(`/api/activites/${idActivite}/creneaux/sync`, payload);
        return res.data;
    }
};
