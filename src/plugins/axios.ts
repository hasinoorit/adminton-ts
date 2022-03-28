import { App } from "vue"
import axiosLib, { AxiosInstance } from "axios"
import { Router } from "vue-router"
import { Pinia } from "pinia"

/**
 * Type support added for ComponentCustomProperties
 */

declare module "vue" {
  export interface ComponentCustomProperties {
    $http: AxiosInstance
    $router: Router
    $pinia: Pinia
  }
}

let $app: App

const axios = axiosLib.create()

export const installAxios = {
  install(app: App) {
    app.config.globalProperties.$http = axios
  },
}

export default axios
