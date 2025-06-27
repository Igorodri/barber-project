import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/Login.vue'
import cadastro from '../views/Cadastro.vue'

const routes = [
    {
        path: '/',
        name: 'login', 
        component: login
    },
    {
        path: '/cadastro',
        name: 'cadastro',
        component: cadastro
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router