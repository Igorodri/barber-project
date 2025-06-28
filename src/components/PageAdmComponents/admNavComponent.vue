<script setup>
import { ref, computed } from 'vue'

import HorariosAdm from './horariosAdmComponent.vue'
import agenda from '../PageClienteComponents/agendaClienteComponent.vue'
import funcionariosComponent from './funcionariosComponent.vue'
import cartaoFidadeliAdmComponent from './cartaoFidadeliAdmComponent.vue'

const abaAtual = ref('horariosadm')

const abas = [
    { id: 'horariosadm', label: 'Gerenciar Horários' },
    { id: 'agenda', label: 'Agenda' },
    {id: 'funcionarios', label: 'Gerenciar Funcionários'},
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
        case 'funcionarios':
            return funcionariosComponent
        default:
            return null
    }
})

</script>

<template>
    <section>
            <div class="area-title"> 
                <h2>Bem-vindo <span class="usuario">Administrador</span></h2>
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
}

nav span:hover{
    color: var(--cor-principal);
    cursor: pointer;
}

.selecionado{
    color: var(--cor-principal);
}
</style>