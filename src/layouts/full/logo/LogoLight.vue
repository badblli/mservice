<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Darklogo from '@/assets/images/logos/logo-white.svg';
import DarkLogoFull from '@/assets/images/logos/logo-light-full.svg';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="DarkLogoFull" alt="home" />
        </RouterLink>
    </div>
</template>
