<template>

    <section class="config">

        <form @submit.prevent="deleteHorario">
            <div class="area-title">
                <h2>Deletar horário</h2>
            </div>
            
            <label for="">Id</label>
            <input type="number" v-model.number="id">


            <div class="area-btn">
                <button type="submit">Aplicar</button>
                <button type="button" @click="$emit('fechar')" class="sair">Cancelar</button>
            </div>
        </form>

    </section>

</template>

<style scoped>


</style>

<script setup>
import {ref} from 'vue'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const date = ref('');
const hora = ref('');
const id = ref(null)

async function deleteHorario(){
    try{
        const response = await fetch(import.meta.env.VITE_URL_API+'/horarios-deletar', {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id: id.value,
            })
        })

        const data = await response.json()

        if(response.ok){
            Toastify({
                text: "Horário deletado com sucesso!",
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

            location.reload()
        }else{
            Toastify({
                text: "Não foi possível deletar o horário",
                close:true,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #ff0000, #ec5353)"
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