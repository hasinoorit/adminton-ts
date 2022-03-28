import type { PiniaPluginContext } from "pinia"

type App = PiniaPluginContext["app"]

export function appForPinia({ app }: PiniaPluginContext) {
  return { $app: app }
}

declare module "pinia" {
  export interface PiniaCustomProperties {
    $app: App
  }
}
