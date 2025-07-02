<template>
    <div class="box-calendario" :class="{ clicado: selecionado }" @click="clicarHorario">

        <div class="content">
            <div class="area-top">
                <h3>{{ dia }}</h3>
                <p>{{ id }}</p>
            </div>

            <div class="horario">
                <p>{{ horario }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

 const props = defineProps({
    id: Number,
    dia: String,
    horario: String,
    selecionado: Boolean
})

const id = props.id

const emit = defineEmits(['selecionado'])

function clicarHorario(){
    emit('selecionado', id)
}
</script>


<style scoped>

.box-calendario{
    width: 300px;
    height: 100px;
    border: 2px solid var(--cor-principal);
    color: white;
    border-radius: 12px;
    margin: 15px 0px 15px 0px;
    cursor: pointer;
}

.content{
    margin: 10px;
}

.area-top{
    display: flex;
    justify-content: space-between;
}

.horario{
    margin-top: 30px;
}

.box-calendario.clicado {
  background-color: var(--cor-principal);
}
</style>


