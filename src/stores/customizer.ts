import { defineStore } from 'pinia';
import config from '@/config';
import p from '@/utils/helpers/pathConfig';
import envConfig from '@/utils/config';
import { callPostApi, parse } from '@/utils/helpers/globalHelper';

export const useCustomizerStore = defineStore({
    id: 'customizer',
    state: () => ({
        Sidebar_drawer: config.Sidebar_drawer,
        Customizer_drawer: config.Customizer_drawer,
        mini_sidebar: config.mini_sidebar,
        setHorizontalLayout: config.setHorizontalLayout, // Horizontal layout
        actTheme: config.actTheme,
        inputBg: config.inputBg,
        boxed: config.boxed,
        setBorderCard: config.setBorderCard,
        name: 'UpdateDarkMode',
        controllerName: 'AuthAdmin',
        applicationName: p.MService,
        isDarkMode: config.actTheme === 'DARK_ORANGE_THEME' ? true : false
    }),

    getters: {},
    actions: {
        SET_SIDEBAR_DRAWER() {
            this.Sidebar_drawer = !this.Sidebar_drawer;
        },
        SET_MINI_SIDEBAR(payload: any) {
            this.mini_sidebar = payload;
        },
        SET_CUSTOMIZER_DRAWER(payload: any) {
            this.Customizer_drawer = payload;
        },

        SET_LAYOUT(payload: any) {
            this.setHorizontalLayout = payload;
        },
        SET_THEME(payload: any) {
            this.actTheme = payload;
            this.SET_THEME_SERVICES();
        },
        async SET_THEME_SERVICES() {
            let params = {
                isDarkMode: this.isDarkMode
            };
            const response = await callPostApi(this.applicationName, this.controllerName, this.name, params, [], true);

            if (response && response.data && response.data.status === 1) {
               this.isDarkMode == true ? config.actTheme = 'DARK_ORANGE_THEME' : config.actTheme = 'LIGHT_ORANGE_THEME';
            }
        },
        SET_CARD_BORDER(payload: any) {
            this.setBorderCard = payload;
        }
    }
});
