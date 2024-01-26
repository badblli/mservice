<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EarningsDownload from '@/components/template/ecommerce/EarningsDownload.vue';
import TopCards from '@/components/template/ecommerce/TopCards.vue';
import ProductsChart from '@/components/template/ecommerce/ProductsChart.vue';
import Earnings from '@/components/template/ecommerce/Earnings.vue';
import YearlySales from '@/components/template/ecommerce/YearlySales.vue';
import RecentTransactions from '@/components/template/ecommerce/RecentTransactions.vue';
import ProductPerformance from '@/components/template/ecommerce/ProductPerformance.vue';
import WeeklyStats from '@/components/template/analytical/WeeklyStats.vue';
import MedicalProBranding from '@/components/template/ecommerce/MedicalProBranding.vue';
import DailyActivities from '@/components/template/ecommerce/DailyActivities.vue';

const page = ref({ title: 'Ecommerce' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Ecommerce',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb />
    <v-row>
        <!---Earning download--->
        <v-col cols="12" lg="4">
            <EarningsDownload />
        </v-col>
        <!---Top cards--->
        <v-col cols="12" lg="8">
            <TopCards />
        </v-col>
        <!---Product chart-->
        <v-col cols="12" lg="8">
            <ProductsChart />
        </v-col>
        <!---Earning / Yearlysales-->
        <v-col cols="12" lg="4">
            <Earnings />
            <YearlySales />
        </v-col>
        <!---Recent transaction-->
        <v-col cols="12" lg="4" class="d-flex align-items-stretch">
            <RecentTransactions />
        </v-col>
        <!---Product performence-->
        <v-col cols="12" lg="8" class="d-flex align-items-stretch">
            <ProductPerformance />
        </v-col>
        <!---WeeklyStats-->
        <v-col cols="12" lg="4">
            <WeeklyStats />
        </v-col>
        <!---Medical Pro binding-->
        <v-col cols="12" lg="4">
            <MedicalProBranding />
        </v-col>
        <!---DailyActivities-->
        <v-col cols="12" lg="4">
            <DailyActivities />
        </v-col>
    </v-row>
</template>
