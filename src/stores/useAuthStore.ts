import { App } from "vue"
import { defineStore } from "pinia"
declare module "pinia" {
  export interface PiniaCustomStateProperties<S> {
    app: App
  }
}

interface AuthInterface {
  username: string
  role: string
  token: string
  permissions: string[]
}

const authStore = defineStore("authStore", {
  state: (): AuthInterface => {
    return {
      username: "",
      role: "",
      token: "",
      permissions: [],
    }
  },
  actions: {
    getAuth() {
      this
    },
  },
})

export default authStore
