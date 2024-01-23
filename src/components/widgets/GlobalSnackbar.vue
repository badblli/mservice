<!-- GlobalSnackbar.vue -->

<template>
    <v-snackbar :color="color" :timeout="timeout" v-model="show" absolute bottom>

        <v-layout align-center pr-4>
            <v-icon class="pr-3" dark large>{{ icon }}</v-icon>
            <v-layout column>

                <div>{{ message }}</div>
            </v-layout>
        </v-layout>

    </v-snackbar>
</template>
  
<script setup lang="ts">
import { useNotify } from '@/stores/snackbar';

const { message, color, timeout, show, icon, hideSnackbar } = useNotify();
</script>
