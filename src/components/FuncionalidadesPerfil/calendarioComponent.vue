<script setup>
import { ref , onMounted} from 'vue'

const hoje = new Date()
const diaAtrual = ref(hoje.getDay())
const mesAtual = ref(hoje.getMonth())
const anoAtual = ref(hoje.getFullYear())
const diasSelecionados = ref([])

function diasDoMes(mes, ano) {
  const primeiroDia = new Date(ano, mes, 1).getDay()
  const totalDias = new Date(ano, mes + 1, 0).getDate()

  const dias = []

  for (let i = 0; i < primeiroDia; i++) {
    dias.push(null)
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    dias.push(dia)
  }

  return dias
}

function selecionarDia(dia) {
  const data = new Date(anoAtual.value, mesAtual.value, dia)
  const iso = data.toISOString().split('T')[0]
  diasSelecionados.value = [iso]
}

function selecionarHoje() {
  const hoje = new Date()
  const iso = hoje.toISOString().split('T')[0]
  diasSelecionados.value = [iso]
}

onMounted(() => {
  selecionarHoje()
})

</script>

<template>
    <div class="calendario">
        <div class="cabecalho">

        <h2>{{ new Date(anoAtual, mesAtual).toLocaleString('pt-BR', { month: 'long', year: 'numeric' }) }}</h2>

        </div>

        <div class="dias-semana">
        <span v-for="dia in ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']" :key="dia">{{ dia }}</span>
        </div>

        <div class="dias">
        <span
            v-for="(dia, index) in diasDoMes(mesAtual, anoAtual)"
            :key="index"
            :class="{ vazio: dia === null, selecionado: dia && diasSelecionados.includes(new Date(anoAtual, mesAtual, dia).toISOString().split('T')[0]) }"
            @click="dia && selecionarDia(dia)"
        >
            {{ dia }}
        </span>
        </div>

    </div>
</template>




<style scoped>
    .calendario {
        width: 100%;
        max-width: 400px;
        font-family: sans-serif;
        text-align: center;
        }

        .cabecalho {
        display: flex;
        justify-content: center;
        align-items: center;
        }

        .cabecalho h2 {
        text-transform: capitalize;
        }

        .dias-semana, .dias {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
        margin: 10px 0;
        }

        .dias span {
        text-align: center;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        }

        .dias .vazio {
        background-color: transparent;
        cursor: default;
        }

        .dias .selecionado {
        background-color: var(--cor-principal);
        color: white;
        }

        .dias span:hover:not(.vazio) {
        background-color: #dfe6e9;
        }

        .selecionados ul {
        margin-top: 10px;
        padding-left: 20px;
        }

        .cabecalho button{
            width: 50px;
            background-color: var(--cor-principal);
            cursor: pointer;
        }
</style>