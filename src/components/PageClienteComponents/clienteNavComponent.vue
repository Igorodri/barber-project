<script setup>
import { ref, computed } from 'vue'

import meusHorarios from '../PageClienteComponents/horariosClienteComponent.vue'
import agenda from '../PageClienteComponents/agendaClienteComponent.vue'
import cartaoFidelidade from '../PageClienteComponents/cartaoFidelidadeComponent.vue'

const abaAtual = ref('horarios')

const abas = [
    { id: 'horarios', label: 'Meus Horários' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'cartaoFidelidade', label: 'Cartão Fidelidade' },
]

const componentSelecionado = computed(() => {
    switch (abaAtual.value) {
        case 'horarios':
            return meusHorarios
        case 'agenda':
            return agenda
        case 'cartaoFidelidade':
            return cartaoFidelidade
        default:
            return null
    }
})

</script>

<template>
    <section>
        <div class="area-title"> 
            <h2>Bem-vindo <span class="usuario">Usuário</span></h2>
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
}

nav span:hover {
    color: var(--cor-principal);
    cursor: pointer;
}

.selecionado {
    color: var(--cor-principal);
}
</style>
