<script setup lang="ts">
import { RouterLink } from 'vue-router';
import logo from '@/assets/images/logos/logo-dark.svg';
import logoFull from '@/assets/images/logos/logo-dark-full.svg';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="logoFull" alt="home" />
        </RouterLink>
    </div>
</template>
