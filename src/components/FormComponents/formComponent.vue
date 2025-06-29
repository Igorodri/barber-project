<script setup>
import logo from '../../assets/logo.png'
import {useRoute, RouterLink} from 'vue-router'
import {reactive, ref} from 'vue'

const route = useRoute()
const Login = ref(true)


const form = reactive({
    user: '',
    senha: '',
    senhaConfirmar: ''
})

function mudarForm(){
    Login.value = !Login.value
    form.user = ''
    form.senha = ''
    form.senhaConfirmar = ''
}

async function handleLogin(){
    try{
        const response = await fetch('', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:form.user,
                password:form.password
            })
        });
        
        const data = await response.json();

        if(response.ok){
            Toastify({
            text: "Login realizado com sucesso!",
            close:true,
            duration: 3000,
            gravity: "top",
            position: "right",
            close: true,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
          }).showToast()
            localStorage.setItem('token', data.token);
            route.push('/home') 
        }else{
            Toastify({
              text: data.error || "Erro ao realizar login.",
              close:true,
              duration: 3000,
              gravity: "top",
              position: "right",
              close: true,
              style: {
                background: "linear-gradient(to right, #ff0000, #ec5353)"
              }
            }).showToast()
        }
    }catch(error){
        error.value = 'Erro de conexão com o servidor'
        console.error(error)
    }
}


</script>

<template>
    <section class="form">
        <form @submit.prevent="handleLogin">
            <img :src="logo" alt="logo_barbearia">

            <input type="text" v-model="form.user" placeholder="Digite seu usuário" required> 
            <input type="password" v-model="form.senha" placeholder="Digite sua senha" required>
            <input type="password" v-model="form.senhaConfirmar" v-if="!Login" placeholder="Confirme a sua senha" required>

            <button type="submit" >{{Login? 'Entrar' : 'Cadastrar'}}</button>

            <div class="area-text">
                <p v-if="Login">
                    Não possui uma conta? <span @click="mudarForm">Clique aqui</span>
                </p>

                <p v-else>
                    Possui uma conta? <span @click="mudarForm">Clique aqui</span>
                </p>
            </div>
        </form>
    </section>
</template>

<style scoped>
.form{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.form form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 450px;
    border: 2px solid var(--cor-principal);
    border-radius: 10px;
}

.form form img{
    margin: 30px ;
    height: 80px;
    width: 80px;
}

.form form input{
    color: var(--cor-fundo);
}

.form form input, button{
    width: 250px;
    margin-top: 10px;
    padding: 7px;
    border-radius: 5px;
    border: 2px solid var(--cor-principal);
}

.form form button{
    border: none;
    margin: 40px 0px 0px 0px;
    cursor: pointer;
    font-weight: bold;
    background-color: var(--cor-principal);
}

.form form button:hover{
    background-color: var(--cor-button-selecionado);
    color: var(--cor-fonte);
}

.area-text{
    color: var(--cor-fonte);
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
}


.area-text span{
    cursor: pointer;
    color: var(--cor-fonte);
}

.area-text span:hover{
    color: var(--cor-principal);
}

.area-text a{
    text-decoration: none;
}


</style>