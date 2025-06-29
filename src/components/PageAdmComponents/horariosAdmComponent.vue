<template>
    <section class="section-page">
        <div class="page">
            <div class="page-title">
                <h1>Gerenciar Horários</h1>
            </div>

            <div class="content-page">
                <div class="area-btn">
                    <button class="add">Adicionar Horário</button>
                    <button class="delete">Deletar Horário</button>
                    <button class="put">Editar Horário</button>
                </div>


                <div class="area-horarios">
                    <calendarioComponent/>

                    <div class="horarios-disponiveis">
                        <h2>Horários Disponíveis</h2>
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


</style>

<script setup>
import calendarioComponent from '../FuncionalidadesPerfil/calendarioComponent.vue';
</script>