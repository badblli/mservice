import { defineStore } from 'pinia';
import { getLabel } from '@/utils/helpers/globalHelper';
import { map } from 'lodash';

const getDefaultState = () => {
    return {
        rows: [],
        columns:[],
        status: 'empty',
        loginModal: false,
        loading: false
    };
};

export const useTablesStore = defineStore({
    id: 'tables',
    state: () => ({
        ...getDefaultState()
    }),
    getters: {},

    actions: {
        readRows() {
            return this.rows;
        },

        resetRows() {
            Object.assign(this, getDefaultState());
        },

        loadingTrue() {
            this.loading = true;
        },

        addRows(data: any) {
            try {
                this.rows = data;
            
            } catch (error) {
                console.log(error);
            }
            this.loading = false;
        },
        setColumns(data: any) {
            try {
                this.columns = data;
            } catch (error) {
                console.log(error);
            }
            this.loading = false;
        },
        addHeaders(data: any,ParentName:string) {
            console.log(data,"data HEDAER");
            try {
                this.columns = data.map((item: any) => {
                    console.log(item,"item HEDAER");
                    return {
                        required: true,
                        key: item,
                        label: getLabel(ParentName, item),
                        align: "start",
                        sortable: true,
                    };
                });
            } catch (error) {
                console.log(error);
            }
            this.loading = false;
        }
    }
});
