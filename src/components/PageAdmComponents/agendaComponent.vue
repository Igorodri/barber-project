<template>
  <section class="section-page">
    <div class="page">
      <div class="page-title">
        <h1>Agenda</h1>
      </div>

      <div class="content-page">

        <div class="area-input">
            <input type="date" v-model="buscaData" placeholder="Buscar por data" class="input-busca">
            <input type="number" v-model="buscaId" placeholder="Buscar por ID" class="input-busca"/>
        </div>

        <div class="area-box">
          <boxCalendarioComponent
            v-for="(horario, i) in horariosFiltradosIdData"
            :key="i"
            :id="horario.id"
            :dia="horario.data"
            :horario="horario.hora"
          />
        </div>

        <p v-if="horariosFiltradosIdData.length === 0" class="sembusca">Nenhum horário encontrado.</p>
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
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import boxCalendarioComponent from '../FuncionalidadesPerfil/boxCalendarioComponent.vue'

const horarios = ref([])
const buscaId = ref('')
const buscaData = ref('')

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
    const response = await axios.get(import.meta.env.VITE_URL_API + '/agenda')
    horarios.value = response.data.map(horario => ({
      ...horario,
      data: formatardata(horario.data)
    }))
  } catch (error) {
    console.error('Erro ao buscar horários:', error)
    horarios.value = []
  }
}

const horariosFiltradosIdData = computed(() => {
  return horarios.value.filter(horario => {
    const porId = buscaId.value ? horario.id.toString().includes(buscaId.value) : true
    const porData = buscaData.value ? horario.data === formatardata(buscaData.value) : true
    return porId && porData
  })
})

onMounted(() => {
  buscarHorarios()
})
</script>

