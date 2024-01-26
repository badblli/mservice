<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import p from '@/utils/helpers/pathConfig';
import { getTable, getLabel, getApi } from '@/utils/helpers/globalHelper';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import AppBaseCard from '@/components/shared/AppBaseCard.vue';
import MenuParent from '@/components/auth/MenuParent.vue';
import DataTable from '@/components/table/DataTable.vue';

import { useTablesStore } from '@/stores/table';
const table = useTablesStore();



// theme breadcrumb
const page = ref({ title: 'All Menus' });

const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: true,
        href: '#'
    },
    {
        text: 'Menu',
        disabled: true,
        href: '#'
    }
]);

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const applicationName = ref(p.AuthAdmin);
const name = ref("Menu")
const controllerName = ref("Admin")
const rolesbg = ref(['primary', 'secondary', 'error', 'success', 'warning']);
const menus = ref([]);
const modalCaption = ref('');
const splitterModel = ref(0);
const tab = ref('general');
const title = ref('');
const languageTabs = ref([]);
const selectedRow = ref([]);
const menuParent = ref(null);
const forms = ref({
    ParentID: null,
    Name: '',
    MenuOrder: 0,
    Visible: false,
    UrlSlug: '',
    MenuLevel: null,
    MenuIcon: '',
    MenuIconStyle: '',
    MenuLanguageList: languageTabs.value.map(() => ({ Name: '' })),
});
const MenuLevelOptions = ref([]);
const createForm = () => {
    tab.value = "general";
    forms.value.MenuLanguageList = $gf.tabCreate(
        languageTabs.value,
        forms.value.MenuLanguageList,
        MenuLanguageList
    );
    addModal = true;
}
const tableActionData = ref([{
    icon: "mdi-edit-outline",
    listtitle: 'Edit',
    click: editItem,
},
{
    icon: "mdi-edit-outline",
    listtitle: 'Delete',
    click: deleteItem,
}])


//Methods

const filteredList = computed(() => {
    return menus.value.filter((user: any) => {
        return user.userinfo.toLowerCase().includes(search.value.toLowerCase());
    });
});

function editItem(item: any) {
    editedIndex.value = menus.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item: any) {
    const index = menus.value.indexOf(item);
    confirm('Are you sure you want to delete this item?') && menus.value.splice(index, 1);
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
        Object.assign(menus.value[editedIndex.value], editedItem.value);
    } else {
        menus.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New menus' : 'Edit menus';
});
/*Header Data*/
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
            title: getLabel("ApplicationID", "Menu"),
            align: "start",
            key: "ApplicationID",

            sortable: true,
        },
        {

            required: true,
            title: getLabel("ParentName", "Menu"),
            align: "start",
            key: "ParentName",

            sortable: true,
        },
        {

            required: true,
            title: getLabel("Name", "Menu"),
            align: "start",
            key: "Name",
            sortable: true,
        },
        {

            required: true,
            title: getLabel("MenuLevel", "Menu"),
            align: "start",
            key: "MenuLevel",
            sortable: true,
        },
        {

            required: true,
            title: getLabel("UrlSlug", "Menu"),
            align: "start",
            key: "UrlSlug",
            sortable: true,
        },
        {

            required: true,
            title: getLabel("MenuOrder", "Menu"),
            align: "start",
            key: "MenuOrder",
            sortable: true,
        },
        {

            required: true,
            title: getLabel("Visible", "Menu"),
            align: "start",
            key: "Visible",
            sortable: true,
        },
        {

            required: true,
            title: getLabel("CreateDate", "Common"),
            align: "start",
            key: "CreateDate",
            sortable: true,
            // format: (val) => date.formatDate(val, "DD.MM.YYYY HH:mm:ss"),
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
            format: (val) => p.formatDate(val, "DD.MM.YYYY HH:mm:ss"),
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

let loading = computed(() => {
    return table.loading;
})
let data = computed(() => {
    return table.rows;
})


const getTables = () => {
    getTable(applicationName, controllerName, name)

}
const getTabs = () => {
    getApi(p.Auth, "Auth", "Languages")
        .then((response) => {
            languageTabs.value = JSON.parse(response.data.result);
            forms.value.MenuLanguageList = languageTabs.value.map(() => ({ Name: '' }));
        });
}



const modalVisible = ref(false);
// Uncomment the line below if you want to store the selected item
// const selectedItem = ref<ItemType | null>(null);

const openModal = (item: ItemType) => {
    console.log('Double-clicked item:', item);
    // selectedItem.value = item;
    modalVisible.value = true;
};

const closeModal = () => {
    modalVisible.value = false;
};


const resetForm = () => {
    forms.value = {
        ParentID: null,
        Name: '',
        MenuOrder: 0,
        Visible: false,
        UrlSlug: '',
        MenuLevel: null,
        MenuIcon: '',
        MenuIconStyle: '',
        MenuLanguageList: languageTabs.value.map(() => ({ Name: '' })),
    };
};

onMounted(() => {
    getTabs();
    getTables();
})

</script>

<template>
    <BaseBreadcrumb />
    <v-card elevation="10">
        <v-card-text>
            <!-- <v-data-table fixed-header density="compact" :headers="headers" :items="data" :search="search"
                :loading="loading" @dblclick="openModal" :rows-per-page-items="[10, 20, 30]">
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
                                        <v-btn color="primary" v-bind="props" variant="tonal" class="ml-auto">
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
                                                        <v-text-field variant="outlined" hide-details
                                                            v-model="editedItem.id" label="Id"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field variant="outlined" hide-details
                                                            v-model="editedItem.userinfo" label="User info"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field variant="outlined" hide-details
                                                            v-model="editedItem.usermail" label="User email"
                                                            type="email"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field variant="outlined" hide-details
                                                            v-model="editedItem.phone" label="Phone"
                                                            type="phone"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field variant="outlined" hide-details
                                                            v-model="editedItem.jdate" label="Joining Date"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field variant="outlined" hide-details
                                                            v-model="editedItem.role" label="Role"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="12">
                                                        <v-select variant="outlined" hide-details :items="rolesbg"
                                                            v-model="editedItem.rolestatus"
                                                            label="Role Background"></v-select>
                                                    </v-col>
                                                </v-row>
                                            </v-form>
                                        </v-card-text>

                                        <v-card-actions class="pa-4">
                                            <v-spacer></v-spacer>
                                            <v-btn color="error" @click="close">Cancel</v-btn>
                                            <v-btn color="secondary"
                                                :disabled="editedItem.userinfo == '' || editedItem.usermail == ''"
                                                variant="flat" @click="save">Save</v-btn>
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
                                    <v-list-item value="action" v-for="list in tableActionData" :key="list.listtitle"
                                        hide-details min-height="38" @click="list.click">
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
            </v-data-table> -->

            <DataTable :applicationName="applicationName" :controllerName="controllerName" :name="name" :headers="headers"
                @modal="(modal) => (modalVisible = modal)" />

        </v-card-text>
    </v-card>
    <v-dialog v-model="modalVisible" max-width="500">
        <v-card class="">
            <!-- <v-app-bar>
                <div class="caption">{{ modalCaption }}</div>
                <v-spacer />
                <v-btn push dense flat icon="mdi-close" @click="resetForm">
                    <v-tooltip>Close</v-tooltip>
                </v-btn>
            </v-app-bar> -->
            <v-card-text>
                <div class="d-flex flex-row">





                </div>
                <AppBaseCard>
                    <template v-slot:leftpart> <v-tabs v-model="tab" dense direction="vertical" class="text-primary">
                            <v-tab value="general">{{ getLabel("Caption", "Menu") }}</v-tab>
                            <v-tab value="language" v-for="languageTab in languageTabs" :key="languageTab.ID">{{
                                languageTab.IsoCode
                            }}</v-tab>
                        </v-tabs></template>
                    <template v-slot:rightpart> <v-window v-model="tab" animated swipeable vertical
                            transition-prev="jump-up" transition-next="jump-up">
                            <v-window-item value="general">
                                <v-card-text class="q-pt-none">
                                    <v-form>
                                        <!-- <MenuParent :MenuParent="menuParent" @change="(e) => {
                                    forms.ParentID = e;
                                }
                                    " /> -->
                                        <v-text-field outlined dense v-model="forms.Name" :label="getLabel('Name', 'Menu')"
                                            autofocus @keyup.enter="prompt = false" />
                                        <v-text-field outlined dense v-model.number="forms.MenuOrder" type="number"
                                            :label="getLabel('MenuOrder', 'Menu')" @keyup.enter="prompt = false" />
                                        <v-checkbox outlined dense v-model="forms.Visible"
                                            :label="getLabel('Visible', 'Menu')" class="full-width" />
                                        <v-text-field outlined v-model="forms.UrlSlug" :label="getLabel('UrlSlug', 'Menu')"
                                            maxlength="100" />
                                        <div>



                                            <v-select outlined use-input input-debounce="0" v-model="forms.MenuLevel"
                                                :items="MenuLevelOptions" item-value="ID" item-text="Name"
                                                :label="getLabel('MenuLevel', 'Menu')" style="width: 100%">

                                            </v-select>
                                        </div>
                                        <v-text-field outlined dense v-model="forms.MenuIcon"
                                            :label="getLabel('MenuIcon', 'Menu')" @keyup.enter="prompt = false"
                                            maxlength="50" />
                                        <v-text-field outlined dense v-model="forms.MenuIconStyle"
                                            :label="getLabel('MenuIconStyle', 'Menu')" @keyup.enter="prompt = false"
                                            maxlength="50" />
                                    </v-form>
                                </v-card-text>
                            </v-window-item>

                            <v-window-item value="language" v-for="(languageTab, index) in languageTabs"
                                :key="languageTab.ID" :name="languageTab.IsoCode">
                                {{ forms }}
                                <!-- <v-text-field outlined dense :label="getLabel('Name')"
                                    v-model="forms.MenuLanguageList[index].Name" maxlength="200" /> -->
                            </v-window-item>
                        </v-window> </template>
                    <template v-slot:mobileLeftContent><v-tabs v-model="tab" dense direction="vertical"
                            class="text-primary">
                            <v-tab value="general">{{ getLabel("Caption", "Menu") }}</v-tab>
                            <v-tab value="language" v-for="languageTab in languageTabs" :key="languageTab.ID">{{
                                languageTab.IsoCode
                            }}</v-tab>
                        </v-tabs> </template>


                </AppBaseCard>
            </v-card-text>
            <v-card-actions align="right" class="text-primary">
                <v-btn variant="tonal" :label="getLabel('Cancel', 'Common')" @click="resetForm" />
                <v-btn variant="tonal" color="primary" :label="getLabel('Save', 'Common')" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

