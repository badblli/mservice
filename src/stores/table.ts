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
                const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{7}[+-]\d{2}:\d{2}/

  const formattedRows = data.map((row:any) => {
    const replaceDateWithFormatted = (data: any): any => {
      if (typeof data === 'string' && dateRegex.test(data)) {
        const dateValue = new Date(data);
        const formattedDate = dateValue.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        const formattedTime = dateValue.toLocaleTimeString('tr-TR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        return `${formattedDate} ${formattedTime}`;
      } else if (Array.isArray(data)) {
        return data.map((item) => replaceDateWithFormatted(item));
      } else if (typeof data === 'object') {
        const updatedData: any = {};
        for (const key in data) {
          updatedData[key] = replaceDateWithFormatted(data[key]);
        }
        return updatedData;
      }

      return data;
    };

    return replaceDateWithFormatted(row);
            });

            this.rows = formattedRows;
            
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
