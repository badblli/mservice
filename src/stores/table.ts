import { defineStore } from 'pinia';
import { getLabel } from '@/utils/helpers/globalHelper';

// Tarih formatını kontrol etmek için regex
const dateRegex: RegExp = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d+)([\+\-]\d{2}):(\d{2})$/;

// Tarihi biçimlendiren yardımcı fonksiyon
function formatDate(item: string): string {
    const matchArray: RegExpMatchArray | null = item.match(dateRegex);
    if (matchArray) {
        // Eğer eşleşme varsa, tarihi biçimlendir
        const day: string = matchArray[3];
        const month: string = matchArray[2];
        const year: string = matchArray[1];
        const hour: string = matchArray[4];
        const minute: string = matchArray[5];
        const second: string = matchArray[6];

        // Biçimlendirilmiş tarih ve saat değerini döndür
        return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    } else {
        // Eğer eşleşme yoksa, orijinal değeri döndür
        return item;
    }
}

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

       
        
        addRows(data: any[]) {
            try {
                // Veriyi formatla ve rows'a ekle
                this.rows = data.map((item: any) => {
                    // Eğer CreateDate alanı varsa ve bir dize ise formatla, yoksa orijinal değeri kullan
                    const createDate = typeof item.CreateDate === 'string' ? formatDate(item.CreateDate) : item.CreateDate;
                    // Eğer EditDate alanı varsa ve bir dize ise formatla, yoksa orijinal değeri kullan
                    const editDate = typeof item.EditDate === 'string' ? formatDate(item.EditDate) : item.EditDate;
                    return { ...item, CreateDate: createDate, EditDate: editDate };
                });
            } catch (error) {
                console.error(error);
            } finally {
                // Yükleme durumunu ayarla
                this.loading = false;
            }
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
