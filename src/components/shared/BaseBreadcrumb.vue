<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { ChevronRightIcon } from 'vue-tabler-icons';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbs = ref<any[]>([]);
const pageTitle = ref('');

watchEffect(() => {
    updateBreadcrumbs();
});

function updateBreadcrumbs() {
    const matchedRoutes = route.matched;

    breadcrumbs.value = matchedRoutes.flatMap(route => getBreadcrumbTitles(route)).slice(1);

    // Set the pageTitle to the title of the last breadcrumb
    pageTitle.value = breadcrumbs.value.length > 0 ? breadcrumbs.value[breadcrumbs.value.length - 1].text : '';
}

function getBreadcrumbTitles(route: any) {
    const routeSegments = route.path.split('/').filter((segment: string) => segment !== '');
    const titles = routeSegments.map((segment: string) => formatBreadcrumbTitle(segment)).filter(Boolean);

    return titles.map((text: string, index: number) => {
        const href = `/${routeSegments.slice(0, index + 1).join('/')}`;
        const disable = true; // İlk öğe dışındaki tüm öğeleri devre dışı bırak
        return { text, href, disable };
    });
}


function formatBreadcrumbTitle(title: string) {
    // Özel başlık formatlaması burada yapılabilir
    // Örneğin: İlk harfi büyük yapma veya özel karakterleri değiştirme
    return title.charAt(0).toUpperCase() + title.slice(1);
}
</script>


<template>
    <div class="mt-3 mb-6">
        <div class="d-flex justify-space-between">
            <div class="d-flex py-0 align-center">
                <div>
                    <h3 class="text-h3 mb-2">{{ pageTitle }}</h3>

                    <v-breadcrumbs :items="breadcrumbs" class="text-h6 font-weight-regular pa-0 ml-n1">
                        <template v-slot:divider v-if="breadcrumbs">
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                        <template v-slot:title="{ item }">
                            <h6 class="text-medium-emphasis text-subtitle-1">{{ item.title }}</h6>
                        </template>
                    </v-breadcrumbs>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.page-breadcrumb {
    .v-toolbar {
        background: transparent;
    }
}
</style>
