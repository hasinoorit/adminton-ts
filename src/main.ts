import { createApp } from "vue"
import { createPinia } from "pinia"
import AppVue from "./App.vue"
import PrimeVue from "./plugins/PrimeVue"
import createRouter from "./router"
import { appForPinia } from "./plugins/appForPinia"
import { installAxios } from "./plugins/axios"
import "./plugins/globalProps"

const app = createApp(AppVue)
app.use(installAxios)
app.use(PrimeVue)
const pinia = createPinia()
app.use(pinia)
pinia.use(appForPinia)
const router = createRouter(app)
app.use(router)

console.log(app)

router.isReady().then(async () => app.mount("#app"))
