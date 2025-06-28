import { createRouter, createWebHistory } from 'vue-router'
import form from '../views/Form.vue'
import home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'form', 
        component: form
    },
    {
        path: '/home',
        name: 'home',
        component:home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router