<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import p from '@/utils/helpers/pathConfig';
import { getLabel, saveRow } from '@/utils/helpers/globalHelper';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import DataTable from '@/components/table/DataTable.vue';
import type { METHODS } from 'http';
import type { addMethod } from 'yup';
//import DatetimePicker from 'vuetify-datetime-picker';
//import VirtualPosType from "components/master/VirtualPosType.vue";

const applicationName = p.PaymentMaster;
const controllerName = "PaymentMaster";
const name = 'Bank';
const ParentName = 'Bank';
const modalVisible = ref(false);
const addImageModal = ref(false);
const page = ref({ title: 'Bank' });
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
        text: 'Bank',
        disabled: true,
        href: '#'
    }
]);
const editedIndex = ref(-1);
const forms = ref({
    Name: '',
    TCMBBankCode: '',
    VirtualPosAddress: '',
    VirtualPosAddress3D: '',
    VirtualPosList: [],
    VirtualPosPassword: '',
    VirtualPosType: 0,
    BinCodeList: [],
    VirtualPosTypeDTO: {
        "ID": 0,
        "CreateUserID": 0,
        "CreateUserName": "string",
        "EditUserID": 0,
        "EditUserName": "string",
        "Name": "string",
        "VirtualPosCode": 0,
        "VirtualPosCodeName": "string",
        "Version": "string",
        "Mode": "string"
    },
    VirtualPosTypeName: '',
    VirtualPosUser: '',
    IsDefault: false,
    ImageThURL: '',
    ImageURL: '',
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
            title: getLabel("TCMBBankCode"),
            align: "start",
            key: "TCMBBankCode",
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
        Name: '',
        TCMBBankCode: '',
        VirtualPosAddress: '',
        VirtualPosList: [],
        VirtualPosAddress3D: '',
        VirtualPosType: 0,
        BinCodeList: [],
        VirtualPosPassword: '',
        VirtualPosTypeDTO: {
            "ID": 0,
            "CreateUserID": 0,
            "CreateUserName": "string",
            "EditUserID": 0,
            "EditUserName": "string",
            "Name": "string",
            "VirtualPosCode": 0,
            "VirtualPosCodeName": "string",
            "Version": "string",
            "Mode": "string"
        },
        VirtualPosTypeName: '',
        VirtualPosUser: '',
        IsDefault: false,
        ImageThURL: '',
        ImageURL: '',
    }
}

const resetImageModal = () => {
    addImageModal.value = false
}
const addImage = () => {
    addImageModal.value = true
    //forms.ID = row.ID

}

</script>

<template>
    <BaseBreadcrumb />
    <v-card elevation="10">
        <v-card-text>
            <DataTable :applicationName="applicationName" :controllerName="controllerName" :name="name" :headers="headers"
                :ParentName="ParentName" @modal="modalVisible = true" @items="item = items"
                @editedItem="(editedItem) => (forms = editedItem)" />
        </v-card-text>
    </v-card>
    <v-dialog v-model="modalVisible" max-width="500">
        <v-card class="">
            <v-card-title class="pa-4 bg-secondary">
                <span class="title text-white">{{ modalTitle }}</span>
                <!--<v-btn dense flat icon="close" v-close-popup @click="resetForm()">
                    <v-tooltip>Close</v-tooltip>
                </v-btn>-->
            </v-card-title>
            <v-card-text>
                <v-row>
                    <!--<v-col cols="12" sm="6">
        <v-datetime-picker label="Select Datetime"
                           v-model="datetime">

        </v-datetime-picker>
    </v-col>-->
                    <v-col cols="12" sm="6">
                        <v-text-field density="compact" v-model="forms.Name" label="Name" hide-details variant="outlined">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field density="compact" v-model="forms.TCMBBankCode" label="TCMBBankCode" hide-details
                            variant="outlined">
                        </v-text-field>
                    </v-col>
                    <!--<v-col cols="12" sm="6">
        <VirtualPosType :propertyName="'VirtualPosType'"
                     :parentName="'VirtualPosType'"
                     :VirtualPosType="virtualPosType"
                     @change="(e)=>{forms.VirtualPosType = e.ID;}" />

    </v-col>-->
                    <v-col cols="12" sm="6">
                        <v-text-field density="compact" v-model="forms.VirtualPosAddress" label="VirtualPosAddress"
                            hide-details variant="outlined">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field density="compact" v-model="forms.VirtualPosUser" label="VirtualPosUser" hide-details
                            variant="outlined">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field density="compact" v-model="forms.VirtualPosPassword" label="VirtualPosPassword"
                            hide-details variant="outlined">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-checkbox density="compact" v-model="forms.IsDefault" label="IsDefault" hide-details
                            variant="outlined">
                            >

                        </v-checkbox>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn flat color="error" :label="getLabel('Cancel', 'Common')" @click="resetForm" />
                <v-btn variant="flat" color="secondary" :label="getLabel('Save', 'Common')"
                    @click="saveRow(applicationName, controllerName, name, forms).then((result: boolean) => { result == true ? resetForm() : ''; })" />
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- ImageModal -->
    <v-dialog v-model="addImageModal" persistent>
        <v-card style="min-width: 550px">
            <!--<v-card-section>
                <div class="text-h6"></div>
            </v-card-section>-->

            <v-card-section class="no-margin full-height q-pt-none">
                <v-form>
                    <!--<BankLogo :bankID="forms.ID"
                              :propertyName="'BankLogo'"
                              :parentName="'Bank'" />-->
                    <v-btn flat :label="$gf.getLabel('Cancel', 'Common')" v-close-popup @click="resetImageModal()" />

                </v-form>
            </v-card-section>
        </v-card>
    </v-dialog>
</template>

