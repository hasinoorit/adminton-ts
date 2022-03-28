import { App } from "vue"
import { createRouter, createWebHistory, RouteRecordRaw, Router } from "vue-router"
import Dashboard from "../components/layout/Dashboard.vue"

const createRoutes = ($app: App) => {
  const routes: RouteRecordRaw[] = [
    { path: "/", component: () => import("../pages/Home.vue"), meta: { layout: Dashboard } },
  ]
  return routes
}

const installRouter = ($app: App): Router => {
  const routes = createRoutes($app)
  return createRouter({ routes, history: createWebHistory() })
}

export default installRouter
