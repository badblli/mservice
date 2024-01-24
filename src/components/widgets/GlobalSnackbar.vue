<!-- GlobalSnackbar.vue -->

<template>
    <v-snackbar :color="notify.color" :timeout="notify.timeout" v-model="notify.show" absolute bottom>

        <v-layout align-center pr-4>
            <v-icon class="pr-3" dark large>{{ notify.icon }}</v-icon>
            <v-layout column>

                <div>{{ notify.message }}</div>
            </v-layout>
        </v-layout>

    </v-snackbar>
</template>
  
<script setup lang="ts">
import { useNotify } from '@/stores/snackbar';
import { computed } from 'vue';

const { message, color, timeout, show, icon, hideSnackbar } = useNotify();

let notify = computed(() => ({
    message,
    color,
    timeout,
    show,
    icon,
    hideSnackbar,
}));
console.log(notify.value);
</script>

