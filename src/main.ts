import { createApp } from "vue"
import { createPinia } from "pinia"
import AppVue from "./App.vue"
import PrimeVue from "./plugins/PrimeVue"
import createRouter from "./router"
import { appForPinia } from "./plugins/appForPinia"
import { installAxios } from "./plugins/axios"
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

const app = createApp(AppVue)
app.use(PrimeVue)
const pinia = createPinia()
app.use(pinia)
pinia.use(appForPinia)
const router = createRouter(app)
app.use(router)
app.use(installAxios)
// No api/router/store call is allowed before this line

router.isReady().then(() => app.mount("#app"))
