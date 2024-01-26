<template>
    <div>
        <v-select
            v-model="model"
            :items="options"
            :multiple="multiple"
            item-value="ID"
            item-title="Name"
            :label="this.label"
            return-object
            single-line
        ></v-select>
    </div>
</template>

<script>
import { getApi, getLabel } from '@/utils/helpers/globalHelper';

export default {
    props: {
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
        ID: {
            type: Number,
            required: false,
            default: 0
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false
        },
        PropertyName: {
            type: String,
            required: true
        },
        ParentName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            model: this.modelValue,
            options: [],
            label: getLabel(this.PropertyName, this.ParentName)
        };
    },
    methods: {
        getData() {
            const params = { ID: this.ID };
            getApi(this.applicationName, this.controllerName, this.name, params).then((response) => {
                const data = JSON.parse(response.data.result);
                this.options = data.map((item) => ({
                    ID: item.ID,
                    Name: item.Name
                }));
            });
        }
    },
    watch: {
        model: {
            handler: function (newVal, oldVal) {
                this.$emit('model', newVal);
            },
            deep: true
        }
    },

    mounted() {
        this.getData();
    }
};
</script>
