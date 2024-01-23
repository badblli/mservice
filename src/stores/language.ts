import { defineStore } from 'pinia';

interface Language {
    Name: string;
    Text: string;
    ParentName: string;
    LanguageID: number;
}
export const useLanguages = defineStore({
    id: 'languages',
    state: () => ({
        webLanguages: [] as string[],
        pageLanguage: [] as Language[],
        labelText: '' as string,
        translationList: [] as Language[]
    }),

    getters: {
        getLabelText(state): string {
            return state.labelText;
        },
        getTextByName:
            (state) =>
            (name: string): string | undefined => {
                const language = state.pageLanguage.find((a) => a.Name === name);
                return language ? language.Text : undefined;
            }
    },

    actions: {
        setPageLanguage(data: Language): void {
            this.pageLanguage.push(data);
        },
        setTranslationList(data: Language[]): void {
            this.translationList = data;
            localStorage.setItem('translationList', JSON.stringify(data));
        },

        getLabel(inputName: string): void {
            const translationList = JSON.parse(localStorage.getItem('translationList') || '[]') as Language[];

            if (translationList) {
                const language = translationList.find((a) => a.Name === inputName);

                if (language) {
                    this.labelText = language.Text;
                }
            }
        },

        addPageLanguage(name: string): void {
            const translationList = JSON.parse(localStorage.getItem('translationList') || '[]') as Language[];

            if (translationList) {
                this.pageLanguage = translationList.filter((a) => a.ParentName === name);
            } else {
                this.pageLanguage = [];
            }
        },

        getLabelAndReturn(inputName: string): string {
            this.getLabel(inputName);
            return this.getLabelText;
        }
    }
});
