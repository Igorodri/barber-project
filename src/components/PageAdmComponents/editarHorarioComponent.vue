<template>

    <section class="config">

        <form @submit.prevent="editarHorario">
            <div class="area-title">
                <h2>Editar horário</h2>
            </div>
            
            <label for="">Id</label>
            <input type="number" v-model="id">

            <label for="">Data</label>
            <input type="date" v-model="date">

            <label for="">Hora</label>
            <input type="time" v-model="hora">


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
const id = ref('')

async function editarHorario(){
    try{
        const response = await fetch(import.meta.env.VITE_URL_API+'/horarios-editar', {
            method:'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id: id.value,
                date: date.value,
                hora: hora.value
            })
        })

        const data = await response.json()

        if(response.ok){
            Toastify({
                text: "Horário editado com sucesso!",
                close:true,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)"
                }
            }).showToast();

            id.value=''
            date.value = ''
            hora.value = ''

            location.reload()
        }else{
            Toastify({
                text: "Não foi possível editar o horário",
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