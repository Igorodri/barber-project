<template>
    <footer class="footer">
    <div class="footer-logo">
        <img :src="logo" alt="Logo CorteJá" />
    </div>
    <p>© 2025 CorteJá. Todos os direitos reservados.</p>
    <div class="footer-socials">
        <a href="https://wa.me/SEUNUMERO" target="_blank">
        <img :src="whatsapp" alt="WhatsApp" />
        </a>
        <a href="https://www.instagram.com/SEUUSUARIO" target="_blank">
        <img :src="instagram" alt="Instagram" />
        </a>
    </div>
</footer>

</template>

<style scoped>
    .footer {
    background-color: var(--cor-fundo);
    color: white;
    text-align: center;
    padding: 2rem 1rem;
    border-top: 4px solid var(--cor-principal); 
    margin-top: 5%;
    }

    .footer-logo img {
    width: 100px;
    }

    .footer p {
    margin: 0.5rem 0;
    font-size: 0.95rem;
    }

    .footer-socials {
    margin-top: 1rem;
    }

    .footer-socials a {
    margin: 0 0.5rem;
    display: inline-block;
    }

    .footer-socials img {
    width: 36px;
    height: 36px;
    transition: transform 0.3s;
    }

    .footer-socials img:hover {
    transform: scale(1.1);
    }

</style>

<script setup>
import logo from '../src/assets/logo.png'
import whatsapp from '../src/assets/whatsapp.png'
import instagram from '../src/assets/instagram.png'
</script>