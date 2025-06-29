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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const adm = localStorage.getItem('adm')

  const rotaadm = ['adm']
  const rotasPrivadas = ['cliente', 'adm'];

  if (rotasPrivadas.includes(to.name) && !token) {

    return next({ name: 'form' });
  }else if(rotaadm.includes(to.name) && adm !== '1'){
    return next({name: 'cliente'});
  }

  next();
});

export default router