<template>
    <section class="section-page">
        <div class="page">
            <div class="page-title">
                <h1>Horários</h1>
            </div>
            <div class="content-page">
                <div class="area-btn">
                    <button class="add">Marcar Horário</button>
                    <button class="delete">Cancelar Horário</button>
                </div>


                <div class="area-horarios">
                    <calendarioComponent @dataSelecionada="buscarHorarios"/>

                    <div class="horarios-disponiveis">
                        <h2>Horários Disponíveis</h2>
                        <div :class="['container', { active: horarios.length > 3 }]">
                            <boxCalendario
                            v-for="(horario,i) in horarios"
                            :key = "i"
                            :id="horario.id"
                            :dia="horario.dia"
                            :horario = "horario.hora"
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
import { ref } from 'vue'
import axios from 'axios'
import calendarioComponent from '../FuncionalidadesPerfil/calendarioComponent.vue'
import boxCalendario from '../FuncionalidadesPerfil/boxCalendarioComponent.vue'

const horarios = ref([])


async function buscarHorarios(data) {
  try {
    const response = await axios.get(`http://localhost:3000/horarios?data=${data}`)
    horarios.value = response.data
  } catch (error) {
    console.error('Erro ao buscar horários:', error)
    horarios.value = []
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

    .delete{
        background-color: rgb(193, 2, 2);
    }

    .delete:hover{
        background-color: rgb(224, 4, 4);
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