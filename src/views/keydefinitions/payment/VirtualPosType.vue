<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import p from '@/utils/helpers/pathConfig';
import { getLabel, saveRow } from '@/utils/helpers/globalHelper';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import DataTable from '@/components/table/DataTable.vue';
import type { METHODS } from 'http';
import type { addMethod } from 'yup';

const applicationName = ref(p.PaymentMaster);
const controllerName = ref("PaymentMaster");
const name = ref('VirtualPosType');
const ParentName = ref('VirtualPosType');
const modalVisible = ref(false);
const addImageModal = ref(false);
const page = ref({ title: 'VirtualPosType' });
const item = ref({});
const modalTitle = computed(() => {
    return editedIndex.value === -1 ? 'New ' : 'Edit ';
});

const breadcrumbs = ref([
    {
        text: 'Keydefinitions',
        disabled: true,
        href: '#'
    },
    {
        text: 'VirtualPosType',
        disabled: true,
        href: '#'
    }
]);
const editedIndex = ref(-1);
    const forms = ref({
    ID: 0,
    Name: '',
    VirtualPosCode: 0,
    VirtualPosCodeName: '',
    Version: '',
    Mode: '',
    
});

const headers = ref([
    [
        {
            required: true,
            title: getLabel("ID"),
            align: "start",
            key: "ID",
            sortable: true,
        },
        {
            required: true,
            title: getLabel("Name"),
            align: "start",
            key: "Name",
            sortable: true,
        },
        {
            required: true,
            title: getLabel("VirtualPosCodeName"),
            align: "start",
            key: "VirtualPosCodeName",
            sortable: true,
        },
        {
            required: true,
            title: getLabel("CreateDate", "Common"),
            align: "start",
            key: "CreateDate",
            sortable: true,
            //format: () => DatetimePicker.formatDate(eval, "DD.MM.YYYY HH:mm:ss"),
            formattedDate: Date.now.toString()

        },
        {
            required: true,
            title: getLabel("CreateUserName", "Common"),
            align: "start",
            key: "CreateUserName",
            sortable: true,
        },
        {
            required: true,
            title: getLabel("EditDate", "Common"),
            align: "start",
            key: "EditDate",
            sortable: true,
        },
        {
            required: true,
            title: getLabel("EditUserName", "Common"),
            align: "start",
            key: "EditUserName",
            sortable: true,
        },
        {
            align: "end",
            title: getLabel("Actions", "Common"),
            key: "actions",
        },

    ]
])


const resetForm = () => {
    modalVisible.value = false;
    forms.value = {
        ID: 0,
        Name: '',
        VirtualPosCode: 0,
        VirtualPosCodeName: '',
        Version: '',
        Mode: '',
    }
}

</script>

<template>
    <BaseBreadcrumb />
    <v-card elevation="10">
        <v-card-text>
            <DataTable :applicationName="applicationName" 
                       :controllerName="controllerName" 
                       :name="name" 
                       :headers="headers"
                       :ParentName="ParentName" 
                       @modal="modalVisible = true" 
                       @items="item = items"
                       @editedItem="(editedItem) => (forms = editedItem)" />
        </v-card-text>
    </v-card>
    <v-dialog v-model="modalVisible" max-width="500">
        <v-card class="">
            <v-card-title class="pa-4 bg-secondary">
                <span class="title text-white">{{ modalTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field density="compact" 
                                      v-model="forms.Name" 
                                      label="Name" 
                                      hide-details 
                                      variant="outlined">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <!--<SelectItemByCategory :categoryName="'VirtualPosCode'"
                                              :ParentName="'VirtualPosType'"
                                              :PropertyName="'VirtualPosCode'"
                                              :SelectItemByCategory="virtualPosCode"
                                              @change="(e)=>{forms.VirtualPosCode = e.ID;}"/>-->
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field density="compact" 
                                      v-model="forms.Mode" 
                                      label="Mode"
                                      hide-details 
                                      variant="outlined">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field density="compact" 
                                      v-model="forms.Version" 
                                      label="Version" 
                                      hide-details
                                      variant="outlined">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn flat 
                       color="error" 
                       :label="getLabel('Cancel', 'Common')" 
                       @click="resetForm" />
                <v-btn variant="flat" 
                       color="secondary" 
                       :label="getLabel('Save', 'Common')"
                       @click="saveRow(applicationName, controllerName, name, forms).then((result: boolean) => { result == true ? resetForm() : ''; })" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

