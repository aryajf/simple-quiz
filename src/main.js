import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onRegistered(r) {
        r && setInterval(() => {
            r.update()
        }, 60 * 60 * 1000 /* 1 hour: timeout in milliseconds */)
    },
    onNeedRefresh() {
        // show a prompt to user
    },
    onOfflineReady() {
        // show a ready to work offline to user
    },
})
updateSW()

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Primevue
import PrimeVue from 'primevue/config'

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

import Mixins from '@/mixins'
createApp(App).use(store).use(router).use(PrimeVue).mixin(Mixins).mount('#app')