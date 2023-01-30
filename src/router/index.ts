import { App } from "vue"
import { createRouter, createWebHistory, RouteRecordRaw, Router } from "vue-router"
import Dashboard from "../components/layout/Dashboard.vue"

const createRoutes = ($app: App) => {
  const routes: RouteRecordRaw[] = [
    {
      path: "/",
      name: "Home",
      component: () => import("../pages/Home.vue"),
      meta: { layout: Dashboard },
    },
    {
      path: "/supplier",
      name: "Supplier",
      component: () => import("../pages/supplier/index.vue"),
      meta: { layout: Dashboard },
    },
    {
      path: "/raw",
      name: "Materials",
      component: () => import("../pages/raw/index.vue"),
      meta: { layout: Dashboard },
    },
    {
      path: "/employee",
      name: "Employee",
      component: () => import("../pages/employee/index.vue"),
      meta: { layout: Dashboard },
    },
    {
      path: "/products",
      name: "Products",
      component: () => import("../pages/products/index.vue"),
      meta: { layout: Dashboard },
    },
    {
      path: "/orders",
      name: "Orders",
      component: () => import("../pages/orders/index.vue"),
      meta: { layout: Dashboard },
    },
    {
      path: "/accounts",
      name: "Accounts",
      component: () => import("../pages/accounts/index.vue"),
      meta: { layout: Dashboard },
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../pages/about/index.vue"),
      meta: { layout: Dashboard },

      children: [
        {
          path: ":team",
          name: "Team",
          props: true,
          component: () => import("../pages/about/team.vue"),
          children: [
            {
              path: ":name",
              name: "Name",
              props: true,
              component: () => import("../pages/about/name.vue"),
            },
          ],
        },
      ],
    },
  ]
  return routes
}

const installRouter = ($app: App): Router => {
  const routes = createRoutes($app)
  return createRouter({ routes, history: createWebHistory() })
}

export default installRouter
