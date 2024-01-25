<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import { getApi } from '@/utils/helpers/globalHelper'
import pathConfig from '@/utils/helpers/pathConfig'

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const loading = ref(false);
const password = ref('123456');
const username = ref('sengul.arici');
const selectedLanguage = ref<{ Name: string; ID: number; IsoCode: string }>({ Name: 'Turkish', ID: 1, IsoCode: 'TR' });
const languages = ref<{ Name: string; ID: number, IsoCode: string }[]>([]); // Update the type to match your object structure
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

const rules = ref([
    (v: string) => !!v || 'Username is required',
])

// Function to fetch language options
const selectOptionsLanguage = async () => {
    try {
        const response = await getApi(pathConfig.Auth, 'Auth', 'GetLanguages', null, true);
        if (response && response.data && (response.data as { status: number }).status === 1) {
            languages.value = JSON.parse(response.data.result as any) as { Name: string; ID: number; IsoCode: string }[];


            console.log(languages, "languages");
        } else {
            // Handle error if needed
        }
    } catch (error) {
        // Handle error if needed
    }
};

function validate(values: any, { setErrors }: any) {
    const authStore = useAuthStore();
    loading.value = authStore.loading;
    return authStore.login(username.value, password.value, selectedLanguage.value).catch((error) => setErrors({ apiError: error }));
}

// Lifecycle hook to call selectOptionsLanguage on component mount
onMounted(() => {
    selectOptionsLanguage();
});
</script>


<template>
    <!-- GOOGLE AND FACEBOOK LOGIN BUTTONS
    <v-row class="d-flex mb-3">
        <v-col cols="6" sm="6" class="pr-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="google" height="16" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">Sign in with</span>Google
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6" class="pl-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="facebook" width="25" height="25" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">Sign in with</span>FB
            </v-btn>
        </v-col>
    </v-row>

    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">or sign in with</span>
        </div>  
    </div>
    GOOGLE AND FACEBOOK LOGIN BUTTONS -->
    <Form @submit="validate" v-slot="{ errors, isSubmitting }" class="mt-5">
        <VTextField v-model="username" :rules="rules" label="Username" class="mb-4" required hide-details="auto">
        </VTextField>
        <VTextField v-model="password" :rules="passwordRules" label="Password" required hide-details="auto" type="password"
            class="mb-4 pwdInput">
        </VTextField>
        <VSelect v-model="selectedLanguage" :items="languages" label="Languages" item-title="Name" item-value="ID" required
            hide-details="auto" />


        <div class="d-flex flex-wrap align-center my-3 ml-n2">
            <v-checkbox v-model="checkbox" :rules="[(v: any) => !!v || 'You must agree to continue!']" required hide-details
                color="primary">
                <template v-slot:label class="">Remeber this Device</template>
            </v-checkbox>
            <div class="ml-sm-auto">
                <RouterLink to="" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                    Forgot
                    Password ?</RouterLink>
            </div>
        </div>
        <v-btn size="large" :loading="isSubmitting" color="primary" :disabled="valid" block type="submit" flat>Sign
            In</v-btn>
        <div v-if="errors.apiError" class="mt-2">
            <v-alert color="error">{{ errors.apiError }}</v-alert>
        </div>
    </Form>
</template>
