<template>
    <section class="section-page">
        <div class="page">
            <component :is="componentSelecionado" :abaSelecionada="abaSelecionada" @fechar="fecharAba"/>
            <div class="page-title">
                <h1>Gerenciar Horários</h1>
            </div>

            <div class="content-page">
                <div class="area-btn">
                    <button class="add" @click="abrirFormulario('adicionar')">Adicionar Horário</button>
                    <button class="delete"@click="abrirFormulario('deletar')">Deletar Horário</button>
                    <button class="put" @click="abrirFormulario('editar')">Editar Horário</button>
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
                        

                        <p v-if="horarios.length === 0" class="sembusca">Nenhum horário disponível.</p>
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
import { onMounted, ref, shallowRef, markRaw } from 'vue'
import axios from 'axios'
import calendarioComponent from '../FuncionalidadesPerfil/calendarioComponent.vue'
import boxCalendario from '../FuncionalidadesPerfil/boxCalendarioComponent.vue'

import formularioPPD from './formularioPPDComponent.vue'

const horarios = ref([])
const componentSelecionado = shallowRef(null)
const abaSelecionada = ref('')


function abrirFormulario(tipo){
    abaSelecionada.value = tipo
    componentSelecionado.value = markRaw(formularioPPD)
}


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