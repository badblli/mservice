<!-- DataTableComponent.vue -->
<script>
import { getTable, getLabel, deleteRow } from '@/utils/helpers/globalHelper';

import { useTablesStore } from '@/stores/table';
const table = useTablesStore();

export default {
    props: {
        applicationName: {
            type: String,
            required: true
        },
        controllerName: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        ParentName: {
            type: String,
            required: false
        },
        headers: {
            type: Array,
            required: false
        },
        visibleHeaders: {
            type: Array,
            required: false
        },
        searchDisplay: {
            type: String,
            default: true,
            required: false
        },
        excelBtn: {
            type: Boolean,
            default: true,
            required: false
        },
        selectable: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    data() {
        return {
            modal: false,
            editedIndex: -1,
            editedItem: {},
            search: '',
            selected: []
        };
    },
    methods: {
        rowClick: function (item, row) {
            this.modal = true;
            this.$emit('modal', true);
            this.editedItem = row.item.value;
            this.$emit('editedItem', this.editedItem);
        },
        getTableData() {
            getTable(this.applicationName, this.controllerName, this.name, true);
            this.getTableHeader();
        },
        getTableHeader() {
            if (!this.headers) {
                table.addHeaders(this.rows, this.ParentName);
            } else {
                table.setColumns(this.headers);
                console.log(table.rows, "rows");
            }
        },
        openModal(item) {
            this.modal = true;
            this.$emit('modal', true);
        },
        deleteItem(item) {
            deleteRow(this.applicationName, this.controllerName, this.name, item.value.ID, item.value.Name);
        },
        editItem(item) {
            this.editedIndex = table.rows.indexOf(item);
            this.$emit('editedIndex', this.editedIndex);
            this.editedItem = Object.assign({}, item.columns);
            this.$emit('editedItem', this.editedItem);
            this.$emit('modal', true);
        },
        editItemClick($event, { item }) {
            console.log(item);
            this.editedIndex = this.items.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        }
    },
    computed: {
        title() {
            return getLabel('Caption', 'Question');
        },
        data() {
            return table.rows;
        },
        loading() {
            return table.loading;
        }
    },
    mounted() {
        this.getTableData();
        this.getTableHeader();
    },
    watch: {
        data() {
            this.$emit('items', this.data);
        },
        selected(newVal) {
            this.$emit('selected', newVal);
        }
    }
    // ... Other component options (e.g., computed properties, watch, etc.) ...
};
</script>

<style scoped>
/* Add scoped styles if necessary */
</style>

<template>
    <v-data-table fixed-header density="compact" item-value="ID" v-model="selected" return-object :show-select="selectable"
        :headers="headers" :items="data" :search="search" :loading="loading" @click:row="rowClick"
        :rows-per-page-items="[10, 20, 30]">
        <template v-slot:top>
            <v-toolbar flat>
                <v-row>
                    <v-col cols="4" lg="4" md="4">
                        <v-text-field v-if="searchDisplay" density="compact" v-model="search" label="Search menus"
                            hide-details variant="outlined"></v-text-field>
                    </v-col>

                    <v-col class="ml-auto text-right" cols="8" lg="8" md="8">
                        <!-- Added ml-auto to push it to the end -->
                        <v-btn color="secondary" variant="tonal" class="mr-2">
                            <v-icon class="mr-2">mdi-file-excel</v-icon>Export Excel
                        </v-btn>

                        <v-btn color="primary" variant="tonal" @click="openModal"> <v-icon class="mr-2">mdi-plus</v-icon>Add
                        </v-btn>
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
                            <v-list-item value="action" hide-details min-height="38" @click="editItem(item)">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-pencil-outline"></v-icon>
                                </template>
                                <v-list-item-title> Edit </v-list-item-title>
                            </v-list-item>
                            <v-list-item value="action" hide-details min-height="38" @click="deleteItem(item)">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-delete-outline"></v-icon>
                                </template>
                                <v-list-item-title> Delete </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
            </div>
        </template>
    </v-data-table>
</template>
