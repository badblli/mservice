import { defineStore } from 'pinia';
import Auth from '@/utils/helpers/pathConfig';
import { getApi, parse, createMenu, organizedMenu } from '@/utils/helpers/globalHelper';
import envConfig from '@/utils/config';

interface State {
    expanded: string[];
    saveAlert: string[];
    saved: any[];
    loginModal: boolean;
    readOnly: boolean;
    menuActiveName: string;
    mediaType: number;
    mediaTypeName: string;
    menuView: boolean;
    menuList: any[];
}

export const useSettingsStore = defineStore({
    id: 'settings',
    state: () => ({
        expanded: [],
        saveAlert: [],
        saved: [],
        loginModal: false,
        readOnly: false,
        menuActiveName: '',
        mediaType: 0,
        mediaTypeName: '',
        menuView: true,
        menuList: localStorage.getItem('menuList') ? JSON.parse(localStorage.getItem('menuList') || '') : [],
        name: 'MenuList',
        controllerName: 'Auth',
        applicationName: Auth.Auth
    }),

    getters: {
        expanded(state) {
            return state.expanded;
        },
        saveAlert(state) {
            return state.saveAlert;
        },
        saved(state) {
            return state.saved;
        },
        menuActiveName(state) {
            return state.menuActiveName;
        },
        loginModal(state) {
            return state.loginModal;
        },
        getMediaType(state) {
            return state.mediaType;
        },
        menuView(state) {
            return state.menuView;
        },
        getMenuList(state) {
            return state.menuList;
        }
    },
    actions: {
        setExpanded(data: string[]) {
            this.setExpanded(data);
        },
        setSaveAlert(data: string) {
            this.setSaveAlert(data);
        },
        setMenuActiveName(data: string) {
            this.setMenuActiveName(data);
        },
        setSaved(data: any[]) {
            this.setSaved(data);
        },
        setReadOnly(data: boolean) {
            this.setReadOnly(data);
        },
        setLoginModal(data: boolean) {
            this.setLoginModal(data);
        },
        resetSaved() {
            this.resetSaved();
        },
        resetSaveAlert() {
            this.resetSaveAlert();
        },
        resetExpanded() {
            this.resetExpanded();
        },
        async setMenuList() {
            let params = {
                ApplicationID: envConfig.applicationId
            };
            const response = await getApi(this.applicationName, this.controllerName, this.name, params, null, true);

            if (response && response.data && response.data.status === 1) {
                // Handle successful login
                const menu = parse(response.data.result);
                this.menuList = organizedMenu(createMenu(menu));
                console.log('menuList', this.menuList);
                localStorage.setItem('menuList', JSON.stringify(this.menuList));
            }
        }
    }
});
