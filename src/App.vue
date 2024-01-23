<template>
  <RouterView></RouterView>
  <GlobalSnackbar></GlobalSnackbar>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import GlobalSnackbar from "@/components/widgets/GlobalSnackbar.vue";
</script>