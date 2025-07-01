<template>
  <section class="config">
    <form v-if="abaSelecionada === 'adicionar'" @submit.prevent="addHorarios">
      <h2>Adicionar Horário</h2>
      <label>Data</label>
      <input type="date" v-model="date" required />

      <label>Hora</label>
      <input type="time" v-model="hora" required />

      <div class="area-btn">
        <button type="submit">Aplicar</button>
        <button type="button" class="sair" @click="$emit('fechar')">Cancelar</button>
      </div>
    </form>

    <form v-if="abaSelecionada === 'editar'" @submit.prevent="editarHorario">
      <h2>Editar Horário</h2>
      <label>ID</label>
      <input type="number" v-model="id" required />

      <label>Data</label>
      <input type="date" v-model="date" required />

      <label>Hora</label>
      <input type="time" v-model="hora" required />

      <div class="area-btn">
        <button type="submit">Aplicar</button>
        <button type="button" class="sair" @click="$emit('fechar')">Cancelar</button>
      </div>
    </form>

    <form v-if="abaSelecionada === 'deletar'" @submit.prevent="deleteHorario">
      <h2>Deletar Horário</h2>
      <label>ID</label>
      <input type="number" v-model="id" required />

      <div class="area-btn">
        <button type="submit">Aplicar</button>
        <button type="button" class="sair" @click="$emit('fechar')">Cancelar</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const props = defineProps({
  abaSelecionada: {
    type: String,
    required: true
  }
})

const id = ref('')
const date = ref('')
const hora = ref('')


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

            location.reload()
            
        }else{
            Toastify({
                text: "Não foi possível cadastrar o horário",
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
    align-items: center;
    padding-top: 50px;
    border: 2px solid var(--cor-principal);
    box-shadow: 4px 0 10px var(--cor-sombra);
}

.config form input{
    color: var(--cor-fundo);
    width: 250px;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    border: none;
    margin-top: 10px;
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

.config .area-btn button{
  width: 160px;
  border: none;
  border-radius: 5px;
  color: var(--cor-fundo);
  height: 35px;
  padding: 6px;
  margin: 0px 10px 0px 10px;
  cursor: pointer;
}

</style>
