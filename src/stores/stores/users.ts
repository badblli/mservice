import { defineStore } from 'pinia';

interface UserProfile {
    Username: string;
    UserProfile: {
        UserAvatar: string;
        DarkMode: boolean;
    };
    Token: string;
    message: 'Merhaba';
}

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        username: '',
        UserProfile: {} as UserProfile,
        Token: '',
        message: 'Merhaba',
        darkMode: localStorage.getItem('darkMode') === 'true' || false
    }),
    getters: {
        userName(state): string {
            return state.UserProfile.Username;
        },
        welcomeMessage(state): string {
            return `${state.message} ${state.username}`;
        },
        userAvatar(state): string {
            return state.UserProfile.UserProfile.UserAvatar;
        },
        isDarkMode(state): boolean {
            return state.UserProfile.UserProfile.DarkMode;
        }
    },
    actions: {
        setUserProfile(data: UserProfile): void {
            this.$state.UserProfile = data;
            localStorage.set('UserProfile', this.$state.UserProfile);
        },
        setUserAvatar(avatar: string): void {
            this.$state.UserProfile.UserProfile.UserAvatar = avatar;
            localStorage.set('UserProfile', this.$state.UserProfile);
        },
        initialiseStore(): void {
            if (localStorage.getItem('UserProfile')) {
                this.$state.UserProfile = localStorage.getItem('UserProfile') as unknown as UserProfile;
            }
        },
        initialiseAction(): void {
            this.initialiseStore();
        },
        addUserProfile(data: UserProfile): void {
            this.setUserProfile(data);
            this.initialiseStore();
        }
    }
});

// Export the store for use in the main Vue instance
export default useUsersStore;
