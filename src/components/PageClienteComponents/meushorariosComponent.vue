<template>
  <section class="section-page">
    <div class="page">
      <div class="page-title">
        <h1>Meus horários</h1>
      </div>

      <div class="content-page">

        <div class="area-input">
            <input type="date" v-model="buscaData" placeholder="Buscar por data" class="input-busca">
            <input type="number" v-model="buscaId" placeholder="Buscar por ID" class="input-busca"/>
            <button class="delete" @click="abrirCancelar">Cancelar Horário</button>
        </div>

        <div class="area-confirmarExclusao">
          <div class="confirmarExclusao">
                <h3>Tem certeza que deseja deletar o ID: {{ horarioSelecionadoId }}</h3>
                <button type="button" @click="cancelarHorario()">Confirmar</button>
                <button type="button" class="sair" @click="fecharCancelar">Cancelar</button>
          </div>

        </div>

        <div class="area-box">
            <boxCalendario
            v-for="(horario,i) in horariosFiltradosIdData"
            :key="i"
            :id="horario.id"
            :dia="horario.dia"
            :horario="horario.hora"
            :selecionado="horario.id === horarioSelecionadoId"
            @selecionado="selecionarHorario"
            />
        </div>

        <p v-if="horariosFiltradosIdData.length == 0" class="sembusca">Nenhum horário encontrado.</p>

          <div class="paginacao" v-if="totalPaginas > 1">
            <button @click="paginaAtual--" :disabled="paginaAtual === 1">Anterior</button>
            
            <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>

            <button @click="paginaAtual++" :disabled="paginaAtual === totalPaginas">Próxima</button>
          </div>

        
      </div>
    </div>
  </section>
</template>


<style scoped>
.area-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  justify-items: center;
}

.area-input{
    width: 100%;
    display: flex;
    justify-content: center;
}

.sair{
    background-color: var(--cor-principal);
    border: none;
    cursor: pointer;
}

.sair:hover{
    background-color: var(--cor-button-selecionado);
}


.input-busca {
  margin-top: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 250px;
  color: var(--cor-fundo);
  margin: 0px 15px 0px 15px;
}

.paginacao {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
  padding-bottom: 50px;
}

.paginacao button {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: var(--cor-primaria);
  color: white;
  cursor: pointer;
}

.paginacao button:disabled {
  background: #ccc;
  cursor: not-allowed;
}


.delete{
    background-color: rgb(193, 2, 2);
    width: 150px;
    padding: 5px;
    border-radius: 5px;
    border: none;
    margin: 0px 10px 0px 10px ;
    cursor: pointer;
    }


.delete:hover{
    background-color: rgb(224, 4, 4);
}


.area-confirmarExclusao{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirmarExclusao{
    display: none;
    border: 2px solid var(--cor-principal);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 4px 0 15px var(--cor-sombra);
    margin-top: 30px;
    text-align: center;
    width: 30%;
}

.confirmarExclusao button{
  width: 160px;
  border: none;
  border-radius: 5px;
  color: var(--cor-fundo);
  height: 35px;
  padding: 6px;
  margin: 0px 10px 0px 10px;
  cursor: pointer;
}


/* Header Celular Menores */
@media (min-width: 300px) and (max-width: 767px) {

}

/* Header tablets*/
@media (min-width: 768px) and (max-width: 1024px) {


}

/* Header notebook*/
@media (min-width: 1025px) and (max-width: 1440px) {
.area-box {
  grid-template-columns: repeat(3, 1fr);
}
}


</style>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import boxCalendario from '../FuncionalidadesPerfil/boxCalendarioComponent.vue'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const horarios = ref([])
const buscaId = ref('')
const buscaData = ref('')
const horarioSelecionadoId = ref(null)

const paginaAtual = ref(1)
const totalPaginas = ref(1)
const limite = 10

const token = localStorage.getItem('token') 

function formatardata(dataISO) {
  const data = new Date(dataISO)
  data.setHours(data.getHours() + 3)
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

async function buscarHorarios() {
  try {
    const response = await axios.get(import.meta.env.VITE_URL_API + '/meus-horarios', {

        headers: {
         Authorization: `Bearer ${token}`
        },
        params: {
            page: paginaAtual.value,
            limit: limite
        }
    })

    const lista = response.data.dia || []

    horarios.value = lista.map(horario => ({
      ...horario,
      dia: formatardata(horario.data)
    }))

    totalPaginas.value = response.data.totalPages

  } catch (error) {
    console.error('Erro ao buscar horários:', error)
    horarios.value = []
  }
}


const horariosFiltradosIdData = computed(() => {
  return horarios.value.filter(horario => {
    const porId = buscaId.value ? horario.id.toString().includes(buscaId.value) : true
    const porData = buscaData.value ? horario.dia === formatardata(buscaData.value) : true
    return porId && porData
  })
})

function selecionarHorario(id){
    if(horarioSelecionadoId.value === id){
        horarioSelecionadoId.value = null
    }else{
        horarioSelecionadoId.value = id
    }
}

async function cancelarHorario(){
  const response = await fetch(import.meta.env.VITE_URL_API + `/cancelar-horario`,{
            method:'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                id_horario: horarioSelecionadoId.value,
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
                text: "Não foi possível marcar o horário selecionado'",
                close:true,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #ff0000, #ec5353)"
                }
            }).showToast();
        }
}

function abrirCancelar(){
    if(horarioSelecionadoId.value == null){
        Toastify({
            text: "Selecione o horário que deseja cancelar",
            close:true,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #ff0000, #ec5353)"
            }
        }).showToast();

        return 0
    }
    document.getElementsByClassName('confirmarExclusao')[0].style.display = 'block'
}

function fecharCancelar(){
    document.getElementsByClassName('confirmarExclusao')[0].style.display = 'none'
}


watch(paginaAtual, buscarHorarios)

onMounted(() => {
  buscarHorarios()
})
</script>

