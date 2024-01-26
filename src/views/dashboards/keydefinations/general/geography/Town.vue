<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import p from '@/utils/helpers/pathConfig';
import { getLabel, saveRow, getTable } from '@/utils/helpers/globalHelper';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import DataTable from '@/components/table/DataTable.vue';
import SuperSelect from '@/components/forms/form-elements/select/SuperSelect.vue';

const applicationName = ref(p.Master);
const controllerName = ref('Master');
const name = ref('Town');
const ParentName = 'Town';
const modalVisible = ref(false);
const item = ref({});
const modalTitle = computed(() => {
    return editedIndex.value === -1 ? 'New ' : 'Edit ';
});

const editedIndex = ref(-1);
const forms = ref({
    Name: '',
    CountryID: 0,
    CountryName: '',
    CityID: 0,
    CityName: ''
});

const selectModel = ref([]);
const headers = ref([
    [
        {
            required: true,
            title: getLabel('ID'),
            align: 'start',
            key: 'ID',
            sortable: true
        },
        // {
        //     required: true,
        //     title: getLabel('CountryName'),
        //     align: 'start',
        //     key: 'CountryName',
        //     sortable: true
        // },
        {
            required: true,
            title: getLabel('CityName'),
            align: 'start',
            key: 'CityName',
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

const filter = () => {
    const params = {
        CountryID: forms.value.CountryID,
        CityID: forms.value.CityID
    };
    getTable(applicationName.value, controllerName.value, name.value, params);
};

const resetForm = () => {
    modalVisible.value = false;
    forms.value = {
        Name: '',
        CountryID: 0,
        CountryName: '',
        CityID: 0,
        CityName: ''
    };
};
</script>

<template>
    <BaseBreadcrumb />
    <v-row>
        <v-col cols="12">
            <v-card elevation="10">
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="4">
                            <SuperSelect
                                :modelValue="selectModel"
                                :applicationName="p.Master"
                                :controllerName="'Master'"
                                :name="'Country'"
                                :PropertyName="'CountryID'"
                                :ParentName="'HotSpotAllUserList'"
                                :multiple="false"
                                @model="
                                    (model) => {
                                        forms.CountryID = model.ID;
                                    }
                                "
                            />
                        </v-col>
                        <v-col cols="12" sm="4">
                            <SuperSelect
                                :modelValue="selectModel"
                                :applicationName="p.Master"
                                :controllerName="'Master'"
                                :name="'City'"
                                :PropertyName="'City'"
                                :ParentName="'Common'"
                                :multiple="false"
                                :ID="forms.CountryID"
                                @model="
                                    (model) => {
                                        forms.CityID = model.ID;
                                    }
                                "
                            />
                        </v-col>
                        <v-col cols="12" sm="4"
                            ><v-btn color="primary" variant="tonal" @click="filter">
                                <v-icon class="mr-2">mdi-magnify</v-icon>Search
                            </v-btn></v-col
                        >
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card elevation="10">
                <v-card-text>
                    <DataTable
                        :applicationName="applicationName"
                        :controllerName="controllerName"
                        :name="name"
                        :headers="headers"
                        :ParentName="ParentName"
                        @modal="modalVisible = true"
                        @items="rows = items"
                        @editedItem="(editedItem) => (forms = editedItem)"
                    />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

    <v-dialog v-model="modalVisible" max-width="500">
        <v-card class="">
            <v-card-title class="pa-4 bg-secondary">
                <span class="title text-white">{{ modalTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6"
                        ><v-text-field density="compact" v-model="forms.Name" label="Name" hide-details variant="outlined"></v-text-field
                    ></v-col>
                    <!-- <v-col cols="12" sm="6">
                        <SuperSelect
                            :modelValue="selectModel"
                            :applicationName="p.Master"
                            :controllerName="'Master'"
                            :name="'Country'"
                            :PropertyName="'NationalityID'"
                            :ParentName="'HotSpotAllUserList'"
                            :multiple="false"
                            @model="
                                (model) => {
                                    forms.CountryID = model.ID;
                                    forms.CountryName = model.Name;
                                }
                            "
                        />
                    </v-col> -->
                    <v-col cols="12" sm="6">
                        <SuperSelect
                            :modelValue="selectModel"
                            :applicationName="p.Master"
                            :controllerName="'Master'"
                            :name="'City'"
                            :PropertyName="'City'"
                            :ParentName="'Common'"
                            :multiple="false"
                            @model="
                                (model) => {
                                    forms.CityID = model.ID;
                                    forms.CityName = model.Name;
                                }
                            "
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="error" :label="getLabel('Cancel', 'Common')" @click="resetForm" />
                <v-btn
                    variant="flat"
                    color="secondary"
                    :label="getLabel('Save', 'Common')"
                    @click="
                        saveRow(applicationName, controllerName, name, forms).then((result: boolean) => {
                            result == true ? resetForm() : '';
                        })
                    "
                />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
