<template>
    <div>
        {{ modelValue }}
        <v-select v-model="modelValue" :items="options" :multiple="multiple"
            :label="getLabel(props.PropertyName, props.ParentName)" item-value="ID" item-title="Name" return-object
            single-line></v-select>
    </div>
</template>
  
<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import { getApi, getLabel } from '@/utils/helpers/globalHelper';

const props = defineProps({
    modelValue: {
        type: Object,
        required: false,
        default: () => null
    },
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
    multiple: {
        type: Boolean,
        required: false,
        default: false
    },
});

let options = ref([]);
let model = ref(props.modelValue);

const getData = () => {
    const params = {
        ID: 0,
    };
    getApi(props.applicationName, props.controllerName, props.name, params)
        .then(response => {
            const data = JSON.parse(response.data.result);
            options.value = data.map(item => ({
                ID: item.ID,
                Name: item.Name
            }));
        });
};

onMounted(() => {
    getData()
});



</script>
  