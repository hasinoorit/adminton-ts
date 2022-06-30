import axios, { AxiosInstance } from "axios"
import { App } from "vue"

let $app: App

const $createHttp = (): AxiosInstance => {
  return axios.create({})
}
let $http: AxiosInstance = $createHttp()

declare module "vue" {
  interface ComponentCustomProperties {
    $http: AxiosInstance
  }
}

export const installAxios = {
  install(app: App) {
    $app = app
    $http = $createHttp()
    app.config.globalProperties.$http = $http
  },
}

export default $http
