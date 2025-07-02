<template>
    <header>
        <div class="logo">
            <img :src="logo" alt="logo_barbearia">
        </div>

        <div class="perfil" :class="{perfil_clicado: mostrandoMenu}" @click="mostrarMenu">
            <img :src="profile" alt="img-perfil" class="img_perfil">
            <div v-if="mostrandoMenu" class="menu">
                <ul>
                <li @click="sair">Sair</li>
                </ul>
            </div>
        </div>
    </header>
</template>

<style>

header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 60px 0px 60px;
    border-bottom:2px solid var(--cor-principal) ;
    box-shadow: 0 0 40px var(--cor-sombra);
}

.logo{
    margin: 20px 0px 20px 0px;
}

.logo img{
    width: 60px;
    height: 60px;
}

.perfil{
    transition: 0.2s;
}

.perfil_clicado{
    transform: scale(1.1,1.1);
    transition: 0.2s;
    box-shadow: 0 0 40px var(--cor-sombra);
}

.perfil img{
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: 0.2s;

}


.menu {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: var(--cor-fundo-menus);
  color: white;
  border-radius: 8px;
  padding: 10px 0;
  box-shadow: 0 4px 12px var(--cor-sombra);
  z-index: 100;
  min-width: 180px;
}

.menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  padding: 10px 20px;
  transition: background 0.3s;
  cursor: pointer;
}

.menu li:hover {
  color: var(--cor-principal);
}

/*Celular*/
@media (min-width: 300px) and (max-width: 767px) {
header{
    padding: 0px 20px 0px 20px;
}
}

/*tablets*/
@media (min-width: 768px) and (max-width: 1024px) {


}

/*notebook*/
@media (min-width: 1025px) and (max-width: 1440px) {

}

</style>

<script setup>
import logo from '../src/assets/logo.png'
import profile from '../src/assets/profile.png'
import {useRouter } from 'vue-router';
import {ref} from 'vue'

const router = useRouter()

const mostrandoMenu = ref(false);

function mostrarMenu(){
    mostrandoMenu.value = !mostrandoMenu.value  
    document.getElementsByClassName('perfil').classlist.add("perfil_clicado")
}

function sair(){
  localStorage.removeItem("token")
  router.push('/') 
  
}


</script>