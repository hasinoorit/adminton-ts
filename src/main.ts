import { createApp } from "vue"
import { createPinia } from "pinia"
import AppVue from "./App.vue"
import PrimeVue from "./plugins/PrimeVue"
import createRouter from "./router"
import { appForPinia } from "./plugins/appForPinia"

const app = createApp(AppVue)
app.use(PrimeVue)
const pinia = createPinia()
app.use(pinia)
pinia.use(appForPinia)
const router = createRouter(app)
app.use(router)

router.isReady().then(() => app.mount("#app"))
