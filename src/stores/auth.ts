import { defineStore } from 'pinia';
import { router } from '@/router';
import { callPostApi, parse } from '@/utils/helpers/globalHelper';
import p from '@/utils/helpers/pathConfig';
import envConfig from '@/utils/config';
import { useSettingsStore } from '@/stores/settings';
import { useCustomizerStore } from '@/stores/customizer';
import { get } from 'lodash';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null,
        name: 'Login',
        name2: 'UpdateUserAvatar',
        controllerName: 'Auth',
        controllerName2: 'Admin',
        applicationName: p.Auth,
        applicationName2: p.AuthAdmin,
        userAvatar: JSON.parse(localStorage.getItem('user'))?.UserProfile?.UserAvatar
    }),
    getters: {
        getDarkMode: (state) => {
            return state.user?.UserProfile.DarkMode;
        },
        getUserAndName: (state) => {
            return state.user?.UserProfile.Name + ' ' + state.user?.UserProfile.Surname;
        },
        getUser: (state) => {
            return state.user;
        },
        getUserAvatar: (state) => {
            return state.userAvatar;
        },
        getUserName: (state) => {
            return state.user?.UserProfile.Username;
        },
        getUserProfile: (state) => {
            return state.user?.UserProfile;
        },
        getToken: (state) => {
            return state.user?.Token;
        }
    },
    actions: {
        saveAvatar(avatar: string) {
            this.user.UserProfile.UserAvatar = avatar;
            this.userAvatar = avatar;

            // let params = {
            //     UserAvatar: JSON.stringify(avatar)
            // };
            // const response = callPostApi(this.applicationName2, this.controllerName2, this.name2, params, [], false);

            // if (response && response.data && response.data.status === 1) {

            //     getUserAvatar();
            // }
        },
        async login(username: string, password: string, selectedLanguage: { Name: string; ID: number; IsoCode: string }) {
            let data = {
                username: username,
                password: password,
                IP: localStorage.getItem('ClientIP'),
                LanguageISOCode: selectedLanguage.IsoCode,
                ApplicationID: envConfig.applicationId
            };
            const response = await callPostApi(this.applicationName, this.controllerName, this.name, data, [], true);

            if (response && response.data && response.data.status === 1) {
                // Handle successful login
                const user = parse(response.data.result);
                this.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                useSettingsStore().setMenuList();
                useCustomizerStore().SET_THEME(this.user.UserProfile.DarkTheme);
                // redirect to previous url or default to home page
                router.push('/');
            }
        },
        logout() {
            console.log('logout');
            this.user = null;
            localStorage.removeItem('user');
            router.push('/auth/login');
        }
    }
});
