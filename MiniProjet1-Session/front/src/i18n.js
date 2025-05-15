import Vue from 'vue'
import VueI18n from 'vue-i18n'
import fr from '@/locales/fr.json'
import en from '@/locales/en.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    messages: { fr, en }
})

export default i18n
