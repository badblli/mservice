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
    const name = 'BankBinCode';
    const ParentName = 'BankBinCode';
    const modalVisible = ref(false);
    const addImageModal = ref(false);
    const page = ref({ title: 'Bank Bin Code' });
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
            text: 'Bank Bin Code',
            disabled: true,
            href: '#'
        }
    ]);
    const editedIndex = ref(-1);
    const forms = ref({
        ID: 0,
        // default deðer verildi
        BankID: 3,
        BankName: '',
        // default deðer verildi
        BinCode: 'str',
        CreditCardFamilyID: 0,
        CreditCardFamilyName: '',
        Organization: '',
        BinGroup: '',
        CardType: '',
        InstallmentInd: '',
        RewardType: '',
        CommercialCard: ''
        

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
                title: getLabel("BankName"),
                align: "start",
                key: "BankName",
                sortable: true,
            },
            {
                required: true,
                title: getLabel("BinCode"),
                align: "start",
                key: "BinCode",
                sortable: true,
            },
            {
                required: true,
                title: getLabel("CreditCardFamilyName"),
                align: "start",
                key: "CreditCardFamilyName",
                sortable: true,
            },
            {
                required: true,
                title: getLabel("Organization"),
                align: "start",
                key: "Organization",
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
            BankID: 0,
            BankName: '',
            BinCode: '',
            CreditCardFamilyID: 0,
            CreditCardFamilyName: '',
            Organization: '',
            BinGroup: '',
            CardType: '',
            InstallmentInd: '',
            RewardType: '',
            CommercialCard: ''
            

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
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
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
                        <!--<Bank :parentName="'BankBinCode'"
              :propertyName="'Bank'"
              :Bank="bank"
              @change="(e)=>{forms.BankID = e.ID , forms.BankName = e.Name}"
              autofocus />-->
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field density="compact"
                                      v-model="forms.BinCode"
                                      label="BinCode"
                                      hide-details
                                      variant="outlined"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <!--<CreditCardFamily :parentName="'BankBinCode'"
                          :propertyName="'Credit Card Family'"
                          :CreditCardFamily="creditCardFamily"
                          @change="(e)=>{forms.CreditCardFamilyID = e.ID , forms.CreditCardFamilyName = e.Name}" />-->
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field density="compact"
                                      v-model="forms.Organization"
                                      label="Organization"
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
                       @click="saveRow(applicationName, controllerName, name, forms).then((result: boolean)=>{result == true ? resetForm() : '';})" />
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- ImageModal -->
    <v-dialog v-model="addImageModal" persistent>
        <v-card style="min-width: 550px">
            <v-card-section class="no-margin full-height q-pt-none">
                <v-form>
                    <!--<BankLogo :bankID="forms.ID"
                              :propertyName="'BankLogo'"
                              :parentName="'Bank'" />-->
                    <v-btn flat
                           :label="$gf.getLabel('Cancel', 'Common')"
                           v-close-popup
                           @click="resetImageModal()" />

                </v-form>
            </v-card-section>
        </v-card>
    </v-dialog>
</template>

