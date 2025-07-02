<template>
    <section class="section-page">
        <div class="page">
            <div class="page-title">
                <h1>Horários</h1>
            </div>
            <div class="content-page">
                <div class="area-btn">
                    <button class="add" @click="marcarHorario">Marcar Horário</button>
                </div>


                <div class="area-horarios">
                    <calendarioComponent @dataSelecionada="buscarHorarios"/>

                    <div class="horarios-disponiveis">
                        <h2>Horários Disponíveis</h2>
                        <div :class="['container', { active: horarios.length > 2 }]">
                            <boxCalendario
                            v-for="(horario) in horarios"
                            :key="horario.id"
                            :id="horario.id"
                            :dia="horario.dia"
                            :horario="horario.hora"
                            :selecionado="horario.id === horarioSelecionadoId"
                            @selecionado="selecionarHorario"
                            />

                        </div>
                        

                        <p v-if="horarios.length === 0">Nenhum horário disponível.</p>
                    </div>  
                </div>

            </div>
            
        </div>
    </section>
    
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import calendarioComponent from '../FuncionalidadesPerfil/calendarioComponent.vue'
import boxCalendario from '../FuncionalidadesPerfil/boxCalendarioComponent.vue'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const horarios = ref([])
const horarioSelecionadoId = ref(null)
const token = localStorage.getItem('token')
const id_user = ref(null)

function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload))
    return decoded
  } catch (e) {
    console.error('Token inválido', e)
    return null
  }
}

onMounted(() => {
  if (token) {
    const decoded = decodeToken(token)
    if (decoded.id) {
      id_user.value = decoded.id
    }
  }
})


function selecionarHorario(id){
    if(horarioSelecionadoId.value === id){
        horarioSelecionadoId.value = null
    }else{
        horarioSelecionadoId.value = id
    }
}

async function buscarHorarios(data) {
  try {
    const response = await axios.get(import.meta.env.VITE_URL_API+`/horarios?data=${data}`)
    horarios.value = response.data
  } catch (error) {
    console.error('Erro ao buscar horários:', error)
    horarios.value = []
  }
}

async function marcarHorario(){
    try{
        const response = await fetch(import.meta.env.VITE_URL_API + `/marcar-horario`,{
            method:'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_horario: horarioSelecionadoId.value,
                id_user: id_user.value
            })
        })
        const data = await response.json()

        if(response.ok){
            Toastify({
                text: "Horário marcado com sucesso!",
                close:true,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)"
                }
            }).showToast();

            location.reload()
        }else{
            Toastify({
                text: "Selecione o horário que deseja agendar",
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

    .area-btn{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    button{
        width: 150px;
        padding: 5px;
        border-radius: 5px;
        border: none;
        margin: 0px 10px 0px 10px ;
        cursor: pointer;
    }

    .active{
        overflow-y: scroll;
        height: 250px;
    }

    .add{
        background-color: rgb(0, 183, 0);
    }

    .add:hover{
        background-color: rgb(4, 228, 4);
    }

    .area-horarios{
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;
    }

    h2{
        text-align: center;
    }


</style>