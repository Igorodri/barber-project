<template>
  <section class="section-page">
    <div class="page">
      <div class="page-title">
        <h1>Agenda</h1>
      </div>

      <div class="content-page">

        <div class="area-input">
            <input type="number" v-model="buscaId" placeholder="Buscar por ID" class="input-busca"/>
        </div>

        <div class="area-box">
          <boxCalendarioComponent
            v-for="(horario, i) in horariosFiltrados"
            :key="i"
            :id="horario.id"
            :dia="horario.data"
            :horario="horario.hora"
          />
        </div>

        <p v-if="horariosFiltrados.length === 0" class="vazio">Nenhum horário encontrado.</p>
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

.vazio {
  text-align: center;
  font-style: italic;
  margin-top: 40px;
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
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import boxCalendarioComponent from '../FuncionalidadesPerfil/boxCalendarioComponent.vue'

const horarios = ref([])
const buscaId = ref('')

function formatardata(dataISO) {
  const data = new Date(dataISO)
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

const horariosFiltrados = computed(() => {
  if (!buscaId.value) return horarios.value
  return horarios.value.filter(h => h.id.toString().includes(buscaId.value))
})

onMounted(() => {
  buscarHorarios()
})
</script>

