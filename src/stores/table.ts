import { defineStore } from 'pinia';

const getDefaultState = () => {
    return {
        rows: [],
        status: 'empty',
        loginModal: false,
        loading: false
    };
};

export const useTablesStore = defineStore({
    id: 'Tables',
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
        }
    }
});
