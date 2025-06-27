<script setup>
import logo from '../../assets/logo.png'
import {useRoute, RouterLink} from 'vue-router'

const route = useRoute()
</script>

<template>
    <section class="login">
        <form action="" name="form_login">
            <img :src="logo" alt="logo_barbearia">

            <input type="text" placeholder="Digite seu usuário"> 
            <input type="password" placeholder="Digite sua senha">

            <button>Entrar</button>

            <div class="area-cadastro">
                <p>Não tem um cadastro? </p><RouterLink to="/cadastro"><span>Clique aqui</span></RouterLink>
            </div>
        </form>
    </section>
</template>

<style scoped>
.login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.login form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 450px;
    border: 2px solid var(--cor-principal);
    border-radius: 10px;
}

.login form img{
    margin: 30px ;
    height: 80px;
    width: 80px;
}

.login form input, button{
    width: 250px;
    margin-top: 10px;
    padding: 7px;
    border-radius: 5px;
    border: 2px solid var(--cor-principal);
}

.login form button{
    border: none;
    margin: 40px 0px 0px 0px;
    cursor: pointer;
}

.login form button:hover{
    background-color: var(--cor-principal);
    color: var(--cor-fonte);
}

.area-cadastro{
    color: var(--cor-fonte);
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
}


.area-cadastro span{
    cursor: pointer;
    color: var(--cor-fonte);
}

.area-cadastro span:hover{
    color: var(--cor-principal);
}

.area-cadastro a{
    text-decoration: none;
}


</style>