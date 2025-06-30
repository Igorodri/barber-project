<template>
    <section class="section-page">
        <div class="page">
            <component :is="componentSelecionado" @fechar="fecharAba"/>
            <div class="page-title">
                <h1>Gerenciar Horários</h1>
            </div>

            <div class="content-page">
                <div class="area-btn">
                    <button class="add" @click="abrirAdd">Adicionar Horário</button>
                    <button class="delete"@click="abrirDelete">Deletar Horário</button>
                    <button class="put" @click="abrirEditar">Editar Horário</button>
                </div>

        
                <div class="area-horarios">
                    <calendarioComponent @dataSelecionada="buscarHorarios"/>

                    <div class="horarios-disponiveis">
                        <h2>Horários Disponíveis</h2>
                        <div :class="['container', { active: horarios.length > 2 }]">
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

    .put{
        background-color: rgb(196, 196, 18);
    }

    .put:hover{
        background-color: rgb(228, 228, 10);
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

<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import calendarioComponent from '../FuncionalidadesPerfil/calendarioComponent.vue'
import boxCalendario from '../FuncionalidadesPerfil/boxCalendarioComponent.vue'

import addHorarios from '../PageAdmComponents/addhorarioComponent.vue'
import editarHorarioComponent from './editarHorarioComponent.vue'
import deletehorarioComponent from './deletehorarioComponent.vue'

const horarios = ref([])
const componentSelecionado = ref('')
const add = ref(false)
const put = ref(false)
const deletar = ref(false)

function abrirAdd(){
    add.value = !add.value
    componentSelecionado.value = addHorarios
}

function abrirEditar(){
    put.value = !put.value
    componentSelecionado.value = editarHorarioComponent
}

function abrirDelete(){
    deletar.value = !deletar.value;
    componentSelecionado.value = deletehorarioComponent
}

// abrirDelete(){
//     abrirAdd.value = true
// }

// abrirAdd(){
//     abrirAdd.value = true
// }

function fecharAba(){
    componentSelecionado.value = null
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

</script>