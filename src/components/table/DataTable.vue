<!-- DataTableComponent.vue -->
<script>
import { getTable, getLabel, getApi } from '@/utils/helpers/globalHelper';

import { useTablesStore } from '@/stores/table';
const table = useTablesStore();

export default {
    props: {
        applicationName: {
            type: String,
            required: true,
        },
        controllerName: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        headers: {
            type: Array,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
        search: {
            type: String,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
        excelBtn: {
            type: Boolean,
            required: true,
        },

    },
    data() {
        return {
            modal: false,
        };
    },
    methods: {
        getTables() {
            getTable(this.applicationName, this.controllerName, this.name);
        },
        openModal() {
            this.modal = true;
            this.$emit('modal', true);
        }
    },
    computed: {
        title() {
            return getLabel("Caption", "Question");
        },
        data() {
            return table.rows;
        },
        loading() {
            return table.loading;
        },
    },
    mounted() {
        this.getTables();
    },
    watch: {
        data() {
            this.$emit('items', this.data);
        },
    },
    // ... Other component options (e.g., computed properties, watch, etc.) ...
};
</script>
  
<style scoped>
/* Add scoped styles if necessary */
</style>
  
<template>
    <v-data-table fixed-header density="compact" :headers="headers" :items="data" :search="search" :loading="loading"
        @dblclick="openModal" :rows-per-page-items="[10, 20, 30]">
        <template v-slot:top>
            <v-toolbar flat>
                <v-row>
                    <v-col cols="12" lg="4" md="4">
                        <v-text-field density="compact" v-model="search" label="Search menus" hide-details
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="8" md="8" class="text-right">
                        <v-btn color="secondary" variant="tonal" class="mr-2 ">
                            <v-icon class="mr-2">mdi-file-excel</v-icon>Export Excel
                        </v-btn>
                        <v-dialog v-model="dialog" max-width="500">
                            <template v-slot:activator="{ props }">
                                <v-btn color="primary" v-bind="props" variant="tonal" class="ml-auto" @click="openModal">
                                    <v-icon class="mr-2">mdi-plus</v-icon>Add
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="pa-4 bg-secondary">
                                    <span class="title text-white">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-form ref="form" v-model="valid" lazy-validation>
                                        <v-row>
                                            <v-col cols="12" sm="6">
                                                <v-text-field variant="outlined" hide-details v-model="editedItem.id"
                                                    label="Id"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field variant="outlined" hide-details v-model="editedItem.userinfo"
                                                    label="User info"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field variant="outlined" hide-details v-model="editedItem.usermail"
                                                    label="User email" type="email"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field variant="outlined" hide-details v-model="editedItem.phone"
                                                    label="Phone" type="phone"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field variant="outlined" hide-details v-model="editedItem.jdate"
                                                    label="Joining Date"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field variant="outlined" hide-details v-model="editedItem.role"
                                                    label="Role"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="12">
                                                <v-select variant="outlined" hide-details :items="rolesbg"
                                                    v-model="editedItem.rolestatus" label="Role Background"></v-select>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>

                                <v-card-actions class="pa-4">
                                    <v-spacer></v-spacer>
                                    <v-btn color="error" @click="close">Cancel</v-btn>
                                    <v-btn color="secondary"
                                        :disabled="editedItem.userinfo == '' || editedItem.usermail == ''" variant="flat"
                                        @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
            <div class="align-center">
                <v-btn size="30" icon variant="flat" class="grey100">
                    <v-avatar size="22">
                        <DotsIcon size="20" color="grey100" />
                    </v-avatar>
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item value="action" v-for="list in tableActionData" :key="list.listtitle" hide-details
                                min-height="38" @click="list.click">
                                <v-list-item-title>
                                    <v-avatar size="20" class="mr-2">
                                        <component :is="list.icon" stroke-width="2" size="20" />
                                    </v-avatar>
                                    {{ list.listtitle }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
            </div>
        </template>
    </v-data-table>
</template>
  
