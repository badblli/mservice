<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import p from '@/utils/helpers/pathConfig';
import { getLabel, saveRow } from '@/utils/helpers/globalHelper';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import DataTable from '@/components/table/DataTable.vue';
import { ro } from 'date-fns/locale';

const applicationName = ref(p.MService);
const controllerName = ref('AuthAdmin')
const name = ref('Languages');
const ParentName = ref('Languages');
const modalVisible = ref(false);
const page = ref({ title: 'All Languages' });
const item = ref({});
const modalTitle = computed(() => {
    return editedIndex.value === -1 ? 'New ' : 'Edit ';
});


const editedIndex = ref(-1);
const forms = ref({
    ID: 0,
    Name: '',
    NameNative: '',
    IsoCode: ''
});

const headers = ref([
    [
        {
            required: true,
            title: getLabel('ID'),
            align: 'start',
            key: 'ID',
            sortable: true
        },
        {
            required: true,
            title: getLabel('Name'),
            align: 'start',
            key: 'Name',
            sortable: true
        },
        {
            required: true,
            title: getLabel('NameNative'),
            align: 'start',
            key: 'NameNative',
            sortable: true
        },
        {
            required: true,
            title: getLabel('IsoCode'),
            align: 'start',
            key: 'IsoCode',
            sortable: true
        },
        {
            required: true,
            title: getLabel('CreateDate', 'Common'),
            align: 'start',
            key: 'CreateDate',
            sortable: true
            // format: (val) => date.formatDate(val, "DD.MM.YYYY HH:mm:ss"),
        },
        {
            required: true,
            title: getLabel('CreateUserName', 'Common'),
            align: 'start',
            key: 'CreateUserName',
            sortable: true
        },
        {
            required: true,
            title: getLabel('EditDate', 'Common'),
            align: 'start',
            key: 'EditDate',
            sortable: true
        },
        {
            required: true,
            title: getLabel('EditUserName', 'Common'),
            align: 'start',
            key: 'EditUserName',
            sortable: true
        },
        {
            align: 'end',
            title: getLabel('Actions', 'Common'),
            key: 'actions'
        }
    ]
]);

const update = (row: any) => {
    forms.value.ID = row.ID;
    forms.value.IsoCode = row.IsoCode;
    forms.value.Name = row.Name;
    forms.value.NameNative = row.NameNative;
};

const resetForm = () => {
    modalVisible.value = false;
    forms.value = {
        ID: 0,
        Name: '',
        NameNative: '',
        IsoCode: ''
    };
};
</script>

<template>
    <BaseBreadcrumb />
    <v-card elevation="10">
        <v-card-text>
            <DataTable :applicationName="applicationName" :controllerName="controllerName" :name="name" :headers="headers"
                :ParentName="ParentName" @modal="modalVisible = true" @row="(row) => update(row)" />
        </v-card-text>
    </v-card>
    <v-dialog v-model="modalVisible" max-width="500">
        <v-card class="">
            <v-card-title class="pa-4 bg-secondary">
                <span class="title text-white">{{ modalTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="4"><v-text-field density="compact" v-model="forms.Name" label="Name" hide-details
                            variant="outlined"></v-text-field></v-col>
                    <v-col cols="12" sm="4"><v-text-field density="compact" v-model="forms.NameNative" label="NameNative"
                            hide-details variant="outlined"></v-text-field></v-col>
                    <v-col cols="12" sm="4"><v-text-field density="compact" v-model="forms.IsoCode" label="Iso Code"
                            hide-details variant="outlined" maxlength="3"></v-text-field></v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="error" :label="getLabel('Cancel', 'Common')" @click="resetForm" />
                <v-btn variant="flat" color="secondary" :label="getLabel('Save', 'Common')" @click="
                    saveRow(applicationName, controllerName, name, forms).then((result: boolean) => {
                        result == true ? resetForm() : '';
                    })
                    " />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
