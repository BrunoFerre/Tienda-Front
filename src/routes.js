import { createRouter, createWebHistory } from "vue-router";
import About from "./views/About.vue";
import Account from "./views/Account.vue";
import Contact from "./views/Contact.vue";
import Shop from "./views/Shop.vue";
import Home from "./views/Home.vue";
import Details from "./views/Details.vue";
import Cart from "./views/Cart.vue";
import Login from "./views/Login.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/about", component: About },
        { path: "/account", component: Account },
        { path: "/contact", component: Contact },
        { path: "/shop", component: Shop },
        { path: "/cart", component: Cart },
        { path: "/login", component: Login },
        { path: "/product:id", component: Details },
    ],
})
export default router