<template>

    <section class="config">

        <form @submit.prevent="addHorarios">
            <div class="area-title">
                <h2>Adicionar horário</h2>
            </div>
            

            <label for="">Data</label>
            <input type="date" v-model="date">

            <label for="">Nome de usuário</label>
            <input type="time" v-model="hora">


            <div class="area-btn">
                <button type="submit">Aplicar=</button>
                <button type="button" @click="$emit('fechar')" class="sair">Cancelar</button>
            </div>
        </form>

    </section>

</template>

<style scoped>
.config{
    position: relative;
    display: flex;
    justify-content: center;
}

.config form{
    margin-top: -100px;
    top: 50px;
    position: absolute;
    background-color: var(--cor-fundo-menus);
    height: 500px;
    width: 450px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    border: 2px solid var(--cor-principal);
    box-shadow: 4px 0 10px var(--cor-sombra);
}

.config form input{
    color: var(--cor-fundo)
}

.area-title{
    text-align: center;
    margin: 20px;
}

.config form label{
    font-weight: bold;
    margin-top: 20px;
}

.config form p{
    color: var(--cor-principal);
    font-weight: bold;
}

.sair{
    background-color: var(--cor-principal);
    border: none;
    cursor: pointer;
}

.sair:hover{
    background-color: var(--cor-button-selecionado);
}

.senha_atual{
  display: flex;  
}

.area-btn{
    margin-top: 50px;
}

</style>

<script setup>
import {ref} from 'vue'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const date = ref('');
const hora = ref('');

async function addHorarios(){
    try{
        const response = await fetch(import.meta.env.VITE_URL_API+'/horarios-criar', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                date: date.value,
                hora: hora.value
            })
        })

        const data = await response.json()

        if(response.ok){
            Toastify({
                text: "Horário cadastrado com sucesso!",
                close:true,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)"
                }
            }).showToast();

            date.value = ''
            hora.value = ''
        }else{
            Toastify({
                text: "Não foi possível cadastrar o horário",
                close:true,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)"
                }
            }).showToast();
        }
    }catch(error){
        Toastify({
            text: "Erro de conexão com o servidor",
            close:true,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
            background: "linear-gradient(to right, #ff0000, #ec5353)"
            }
        }).showToast();
        console.error(error);
    }
}
</script>