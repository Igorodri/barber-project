<script setup>
import logo from '../../assets/logo.png'
import {useRoute, RouterLink} from 'vue-router'

const route = useRoute()
</script>

<template>
    <section class="cadastro">
        <form action="" name="form_cadastro">
            <img :src="logo" alt="logo_barbearia">

            <input type="text" placeholder="Digite seu usuário"> 
            <input type="password" placeholder="Digite sua senha">
            <input type="password" placeholder="Confirme a sua senha">

            <button>Cadastrar</button>

            <div class="area-login">
                <p>Já possui uma conta?</p><RouterLink to="/"><span>Clique aqui</span></RouterLink>
            </div>
        </form>
    </section>
</template>

<style scoped>
.cadastro{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.cadastro form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 450px;
    border: 2px solid var(--cor-principal);
    border-radius: 10px;
}

.cadastro form img{
    margin: 30px ;
    height: 80px;
    width: 80px;
}

.cadastro form input, button{
    width: 250px;
    margin-top: 10px;
    padding: 7px;
    border-radius: 5px;
    border: 2px solid var(--cor-principal);
}

.cadastro form button{
    border: none;
    margin: 40px 0px 0px 0px;
    cursor: pointer;
}

.cadastro form button:hover{
    background-color: var(--cor-principal);
    color: var(--cor-fonte);
}

.area-login{
    color: var(--cor-fonte);
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
}


.area-login span{
    cursor: pointer;
    color: var(--cor-fonte);
}

.area-login span:hover{
    color: var(--cor-principal);
}

.area-login a{
    text-decoration: none;
}


</style>