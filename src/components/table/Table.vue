<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { PlusIcon, EditIcon, TrashIcon, CheckIcon, XIcon, ArrowBackUpIcon } from 'vue-tabler-icons';
import { useContactStore } from '@/stores/apps/contact';

import contact from '@/_mockApis/apps/contact';
import { tableActionData } from '@/_mockApis/components/table/basicTables';

const store = useContactStore();

onMounted(() => {
    store.fetchContacts();
});
const getContacts: any = computed(() => {
    return store.contacts;
});

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const rolesbg = ref(['primary', 'secondary', 'error', 'success', 'warning']);
const desserts = ref(contact);
const editedIndex = ref(-1);
const editedItem = ref({
    id: '',
    avatar: '1.jpg',
    userinfo: '',
    usermail: '',
    phone: '',
    jdate: '',
    role: '',
    rolestatus: ''
});
const defaultItem = ref({
    id: '',
    avatar: '1.jpg',
    userinfo: '',
    usermail: '',
    phone: '',
    jdate: '',
    role: '',
    rolestatus: ''
});
const tableActionData = ref([{
    icon: EditIcon,
    listtitle: 'Edit',
    click: editItem,
},
{
    icon: TrashIcon,
    listtitle: 'Delete',
    click: deleteItem,
}])

//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.userinfo.toLowerCase().includes(search.value.toLowerCase());
    });
});

function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    confirm('Are you sure you want to delete this item?') && desserts.value.splice(index, 1);
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
function save() {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
    } else {
        desserts.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Contact' : 'Edit Contact';
});
/*Header Data*/
const headers = ref([
    { title: 'Id', align: 'start', key: 'id', sortable: false, },
    { title: 'UserInfo', align: 'start', key: 'info' },
    { title: 'Phone', align: 'start', key: 'phone' },
    { title: 'Joining Date', align: 'start', key: 'date' },
    { title: 'Role', align: 'end', key: 'role' },
    { title: 'Actions', align: 'end', key: 'actions' },
])
</script>

<template>
    <v-data-table :headers="headers" :items="contact" :search="search" :loading="loading"
        :rows-per-page-items="[10, 20, 30]">
        <template v-slot:top>
            <v-toolbar flat>
                <v-row>
                    <v-col cols="12" lg="4" md="4">
                        <v-text-field density="compact" v-model="search" label="Search Contacts" hide-details
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="8" md="8" class="text-right">
                        <v-dialog v-model="dialog" max-width="500">
                            <template v-slot:activator="{ props }">
                                <v-btn color="secondary" v-bind="props" flat class="ml-auto">
                                    <v-icon class="mr-2">mdi-file-excel</v-icon>Export Excel
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
                        <v-dialog v-model="dialog" max-width="500">
                            <template v-slot:activator="{ props }">
                                <v-btn color="primary" v-bind="props" flat class="ml-auto">
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
            <div class=" align-center">
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

