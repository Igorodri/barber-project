<template>

    <section class="config">

        <form>
            <div class="area-title">
                <h2>Configurações</h2>
            </div>
            

            <label for="">Adicionar Foto</label>
            <input type="text">

            <label for="">Nome de usuário</label>
            <p>Usuário</p>
            <input type="text" placeholder="Digite seu novo nome de usuário" v-if="habilitadoUser">

            <label for="">Senha atual</label>
            <div class="senha_atual">
                <p>******</p>
                <button @click="mostrarSenha">Mostrar senha</button>
            </div>

            <div class="area-btn">
                <button>Aplicar Alterações</button>
                <button @click="$emit('fechar')" class="sair">Cancelar</button>
            </div>
        </form>

    </section>

</template>

<style scoped>
.config{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.config form{
    top: 50px;
    position: absolute;
    background-color: var(--cor-fundo-menus);
    height: 500px;
    width: 450px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    border: 2px solid var(--cor-principal);
    box-shadow: 4px 0 10px var(--cor-sombra);
}

.area-title{
    text-align: center;
    margin: 20px;
}

.config form label{
    font-weight: bold;
    margin-top: 20px;
}

.config form p{
    color: var(--cor-principal);
    font-weight: bold;
}

.sair{
    background-color: var(--cor-principal);
    border: none;
    cursor: pointer;
}

.sair:hover{
    background-color: var(--cor-button-selecionado);
}

.senha_atual{
  display: flex;  
}

.area-btn{
    margin-top: 50px;
}

</style>

<script setup>

function sairConfiguracoes(){
    componentSelecionado.value = ''
}
</script>