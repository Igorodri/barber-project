<script setup>
import headerComponent from './headerComponent.vue';
import footerComponent from './footerComponent.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <headerComponent v-if="route.path != '/'"/>
  <router-view/>
  <footerComponent v-if="route.path != '/'"/>
</template>

<style scoped>

</style>
