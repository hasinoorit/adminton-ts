import { App } from "vue"
import { defineStore } from "pinia"
import "pinia"
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
      this.$app.config.globalProperties.$http.get("", {
        params:{}
      })
    },
  },
})

export default authStore
