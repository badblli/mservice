<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';
import { useCustomizerStore } from '@/stores/customizer';
import { MoonIcon, SunIcon } from 'vue-tabler-icons';

const theme = useTheme();
const customizer = useCustomizerStore();

// Computed property to determine the current icon based on the theme
const currentIcon = computed(() => {
    return customizer.actTheme === 'DARK_ORANGE_THEME' ? MoonIcon : SunIcon;
});

// Method to toggle between dark and light icons
const toggleIcon = () => {
    customizer.isDarkMode = !customizer.isDarkMode;
    customizer.SET_THEME(customizer.isDarkMode ? 'DARK_ORANGE_THEME' : 'ORANGE_THEME');
};

</script>

<template>
    <v-btn icon variant="text" color="primary" @click="toggleIcon">

        <component :is="currentIcon" stroke-width="1.5" size="24" />

    </v-btn>
</template>
