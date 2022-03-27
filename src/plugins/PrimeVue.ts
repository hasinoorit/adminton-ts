import { App } from "vue"

import PrimeVue from "primevue/config"
import ConfirmationService from "primevue/confirmationservice"
import ToastService from "primevue/toastservice"

export default {
  install: (app: App) => {
    app.use(PrimeVue)
    app.use(ConfirmationService)
    app.use(ToastService)
  },
}
