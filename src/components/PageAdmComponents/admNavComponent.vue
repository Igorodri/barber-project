<script setup>
import { ref, computed, onMounted } from 'vue'

import HorariosAdm from './horariosAdmComponent.vue'
import agenda from './agendaComponent.vue'
import cartaoFidadeliAdmComponent from './cartaoFidadeliAdmComponent.vue'

const abaAtual = ref('horariosadm')
const username = ref('')

const abas = [
    { id: 'horariosadm', label: 'Gerenciar Horários' },
    {id: 'agenda', label: 'Agenda'},
    { id: 'cartaoFidelidadeadm', label: 'Gerenciar Cartão Fidelidade' },
]

const componentSelecionado = computed(() => {
    switch (abaAtual.value) {
        case 'horariosadm':
            return HorariosAdm
        case 'agenda':
            return agenda
        case 'cartaoFidelidadeadm':
            return cartaoFidadeliAdmComponent
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
                <h2>Bem-vindo <span class="usuario">{{username || 'Administrador'}}</span></h2>
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
.area-title{
    display: flex;
    justify-content: center;
    margin: 50px;
    font-size: 20px;
}

.usuario{
    color: var(--cor-principal);
}

nav{
    display: flex;
    justify-content: space-evenly;
    font-weight: bold;
}

nav span:hover{
    color: var(--cor-principal);
    cursor: pointer;
}

.selecionado{
    color: var(--cor-principal);
}
</style>