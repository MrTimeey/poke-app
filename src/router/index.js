import { createWebHistory, createRouter } from "vue-router";
import PageNotFound from "@/views/PageNotFound.vue";
import Pokemon from "@/views/Pokemon.vue";

const routes = [
    {
        path: '/',
        redirect: _to => {
            return { path: '/pokemon/1'}
        }
    },
    {
        path: "/pokemon/:number",
        name: "pokemon",
        component: Pokemon,
        props: (route) => ({ number: route.params.number || '1' }),
    },
    {
        path: '/page-not-found',
        name: "pageNotFound",
        components: {
            default: PageNotFound
        },
    },
    {
        path: "/:catchAll(.*)",
        redirect: '/page-not-found'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
