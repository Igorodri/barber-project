import { createRouter, createWebHistory } from 'vue-router'
import form from '../views/Form.vue'
import cliente from '../views/Cliente.vue'
import adm from '../views/Adm.vue'

const routes = [
    {
        path: '/',
        name: 'form', 
        component: form
    },
    {
        path: '/home',
        name: 'cliente',
        component:cliente
    },
    {
        path: '/adm',
        name: 'adm',
        component: adm
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router