<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { getApi, getLabel } from '@/utils/helpers/globalHelper';
const dataArr = ref([]);
const applicationName = '';
const name = 'MenuParentList'
const controllerName = 'Admin'
const model = ref(null);
const options = ref(dataArr.value);
const selected = ref('');
const select = ref('');
const filter = ref('');

const getData = () => {
    getApi(applicationName, controllerName, name)
        .then((response) => {
            dataArr.value = JSON.parse(response.data.result);
            options.value = dataArr.value;
        });
};

watch(selected, (node) => {
    let selectNode = $refs.tree.getNodeByKey(node);
    if (selectNode !== 0) {
        select.value = selectNode.Name;
        $emit('change', selectNode.ID);
        $refs.popup.toggle();
    } else {
        selected.value = '';
        select.value = '';
    }
});



onMounted(() => {
    getData();

    if (MenuParent.value !== null) {
        select.value = MenuParent.value.Name;
    } else {
        select.value = '';
    }
});
</script>

<template>
    <div>
        <div class="v_tree_select">
            <v-text-fileld outlined dense :label="getLabel('ParentName')"
                :stack-label="select !== '' ? 'stack-label' : false">
                <template v-slot:append>
                    <v-icon name="expand_more" />
                </template>
                <template v-slot:control>
                    <div>
                        {{ select }}
                    </div>
                </template>
                <q-popup-proxy fit ref="popup">
                    <q-input ref="filter" filled v-model="filter" :label="getLabel('Search', 'Common')" />
                    <v-treeview v-model="tree" :load-children="fetch" :items="options" selected-color="indigo" open-on-click
                        selectable return-object expand-icon="mdi-chevron-down" on-icon="mdi-bookmark"
                        off-icon="mdi-bookmark-outline" indeterminate-icon="mdi-bookmark-minus">
                    </v-treeview>
                </q-popup-proxy>
            </v-text-fileld>
        </div>
    </div>
</template>

<style>
/* Gerekirse stil ekleyebilirsiniz */
</style>
