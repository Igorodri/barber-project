<script setup>
import { ref, computed, onMounted } from 'vue'

import Horarios from '../PageClienteComponents/horariosClienteComponent.vue'
import cartaoFidelidade from '../PageClienteComponents/cartaoFidelidadeComponent.vue'
import meusHorarios from '../PageClienteComponents/meushorariosComponent.vue'

const abaAtual = ref('horarios')
const username = ref('')

const abas = [
    { id: 'horarios', label: 'Horários' },
    {id: 'meushorarios', label: 'Meus Horários'},
    { id: 'cartaoFidelidade', label: 'Cartão Fidelidade' }
]

const componentSelecionado = computed(() => {
    switch (abaAtual.value) {
        case 'horarios':
            return Horarios
        case 'meushorarios':
            return meusHorarios
        case 'cartaoFidelidade':
            return cartaoFidelidade
        default:
            return null
    }
})

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
  const token = localStorage.getItem('token')
  if (token) {
    const decoded = decodeToken(token)
    if (decoded?.username) {
      username.value = decoded.username
    }
  }
})

</script>

<template>
    <section>
        <div class="area-title"> 
            <h2>Bem-vindo <span class="usuario">{{username || 'Visitante'}}</span></h2>
        </div>

        <nav>
            <span 
                v-for="aba in abas"
                :key="aba.id"
                :class="{selecionado: abaAtual === aba.id}"
                @click="abaAtual = aba.id"
            >
                {{ aba.label }}
            </span>
        </nav>
    </section>

    <component :is="componentSelecionado" />
</template>

<style scoped>
.area-title {
    display: flex;
    justify-content: center;
    margin: 50px;
    font-size: 20px;
}

.usuario {
    color: var(--cor-principal);
}

nav {
    display: flex;
    justify-content: space-evenly;
    font-weight: bold;
}

nav span:hover {
    color: var(--cor-principal);
    cursor: pointer;
}

.selecionado {
    color: var(--cor-principal);
}
</style>
