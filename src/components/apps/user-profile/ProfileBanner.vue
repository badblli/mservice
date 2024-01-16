<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { HeartIcon, PhotoIcon, UserCircleIcon, UsersIcon } from 'vue-tabler-icons';
import profileBg from '@/assets/images/backgrounds/profilebg.jpg';
import UserImage from '@/assets/images/profile/user-1.jpg';


import { useAuthStore } from '@/stores/auth';

const authStore: any = useAuthStore();
const userAvatar: string = authStore.userAvatar;

const getUserAvatarPath = (avatarName: string): string => {
    console.log('getUserAvatarPath', avatarName);
    return `/src/assets/images/profile/user-${avatarName}.jpg`;
};

let showModalDialog = ref(null);

const showModal = () => {
    console.log('showModal', showModalDialog.value);
    showModalDialog.value = true;
};

const avatars = [
    {
        id: 0,
        src: "../../../src/assets/images/profile/user-0.jpg",
    },
    {
        id: 1,
        src: "../../../src/assets/images/profile/user-1.jpg",
    },
    {
        id: 2,
        src: "../../../src/assets/images/profile/user-2.jpg",
    },
    {
        id: 3,
        src: "../../../src/assets/images/profile/user-3.jpg",
    },
    { id: 4, src: "../../../src/assets/images/profile/user-4.jpg" },
    { id: 5, src: "../../../src/assets/images/profile/user-5.jpg" },
    { id: 6, src: "../../../src/assets/images/profile/user-6.jpg" },
    { id: 7, src: "../../../src/assets/images/profile/user-7.jpg" },
    { id: 8, src: "../../../src/assets/images/profile/user-8.jpg" },
    { id: 9, src: "../../../src/assets/images/profile/user-9.jpg" },
    { id: 10, src: "../../../src/assets/images/profile/user-10.jpg" },

]

let selectedAvatar = ref(null);

const selectAvatar = (index: number) => {

    console.log('selectAvatar', index, avatars[index]);
    selectedAvatar.value = avatars[index];
    console.log(selectedAvatar.value.id);
    getUserAvatarPath(selectedAvatar.value.id);
    authStore.saveAvatar(selectedAvatar.value.id);

    showModalDialog.value = false;

};
// const tab = ref(null);
// const items = shallowRef([
//     { tab: 'Profile', icon: UserCircleIcon, href: '/apps/user/profile' },
//     { tab: 'Followers', icon: HeartIcon, href: '/apps/user/profile/followers' },
//     { tab: 'Friends', icon: UsersIcon, href: '/apps/user/profile/friends' },
//     { tab: 'Gallery', icon: PhotoIcon, href: '/apps/user/profile/gallery' }
// ]);


</script>

<template>
    <v-card elevation="10" class="overflow-hidden">
        <img :src="profileBg" alt="profile" class="w-100" />
        <div>
            <v-row class="mt-1">
                <v-col cols="12" lg="4" sm="12" class="order-sm-second">
                    <!-- <div class="px-4 py-1">
                        <v-row class="justify-center">
                            <v-col cols="4" class="text-center">
                                <FileDescriptionIcon size="20" />
                                <h4 class="text-h4">938</h4>
                                <h6 class="text-h6 font-weight-regular">Posts</h6>
                            </v-col>
                            <v-col cols="4" class="text-center">
                                <UserCircleIcon size="20" />
                                <h4 class="text-h4">3,586</h4>
                                <h6 class="text-h6 font-weight-regular">Followers</h6>
                            </v-col>
                            <v-col cols="4" class="text-center">
                                <UserCheckIcon size="20" />
                                <h4 class="text-h4">2,659</h4>
                                <h6 class="text-h6 font-weight-regular">Following</h6>
                            </v-col>
                        </v-row>
                    </div> -->
                </v-col>
                <v-col cols="12" lg="4" sm="12" class="d-flex justify-center order-sml-first">
                    <div class="text-center top-spacer">
                        <div class="avatar-border">
                            <v-avatar size="100" class="userImage avatar-container" @click="showModal">
                                <img :src="getUserAvatarPath(userAvatar)" width="100" alt="Mathew" />
                                <div class="hover-text">Change Avatar
                                    <v-dialog v-model="showModalDialog" transition="dialog-top-transition"
                                        activator="parent" width="auto">
                                        <v-card>
                                            <v-container fluid>
                                                <v-layout justify-center>
                                                    <v-row>
                                                        <v-col v-for="(avatar, index) in avatars" :key="avatar.id" cols="4"
                                                            md="2">
                                                            <v-avatar size="80" @click="selectAvatar(index)">
                                                                <img :src="avatar.src" width="80" style="" />
                                                            </v-avatar>
                                                        </v-col>
                                                    </v-row>
                                                </v-layout>
                                            </v-container>
                                            <v-card-actions>
                                                <v-btn color="primary" class="justify-end" block
                                                    @click="showModalDialog = false">Close
                                                    Dialog</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>



                                </div>
                            </v-avatar>
                        </div>
                        <h5 class="text-h5 mt-3">{{ authStore.getUserAndName }}</h5>
                        <span class="text-h6 font-weight-regular">{{ authStore.getUserName
                        }}</span>
                    </div>
                </v-col>
                <!-- <v-col cols="12" lg="4" class="d-flex align-center justify-center justify-lg-end order-sm-third">
                    <div class="d-flex align-center justify-space-between px-10 py-1 gap-3">
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-facebook"
                            ><BrandFacebookIcon size="16"
                        /></v-btn>
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-twitter"
                            ><BrandTwitterIcon size="16"
                        /></v-btn>
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-dribbble"
                            ><BrandDribbbleIcon size="16"
                        /></v-btn>
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-youtube"
                            ><BrandYoutubeIcon size="16"
                        /></v-btn>
                        <v-btn variant="flat" color="primary">Add to Story</v-btn>
                    </div>
                </v-col> -->
                <!-- <v-col md="12" class="order-sm-last">
                    <v-tabs v-model="tab" color="primary" dark class="profiletab bg-grey100">
                        <v-tab v-for="item in items" :key="item.tab" :to="item.href">
                            <component :is="item.icon" size="18" stroke-width="1.5" class="mr-2"></component>
                            {{ item.tab }}
                        </v-tab>
                    </v-tabs>
                </v-col> -->
            </v-row>
        </div>
    </v-card>
</template>
<style lang="scss">
.avatar-container {
    position: relative;
}

.hover-text {
    position: absolute;
    font-size: 16px;
    backdrop-filter: blur(5px);
    /* color: #212121; */
    background-size: cover;
    top: 50%;
    left: 50%;
    text-align: center;
    width: 100%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
}

.avatar-container:hover .hover-text {
    opacity: 1;
}

.avatar-border {
    background-image: linear-gradient(rgb(80, 178, 252), rgb(244, 76, 102));
    border-radius: 50%;
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    .userImage {
        border: 4px solid rgb(255, 255, 255);
    }
}

.top-spacer {
    margin-top: -95px;
}

.profiletab .v-slide-group__content {
    justify-content: end;

    .v-btn--variant-text .v-btn__overlay {
        background: transparent;
    }
}

@media (max-width: 1023px) {
    .order-sm-second {
        order: 2;
    }

    .order-sml-first {
        order: 1;
    }

    .order-sm-third {
        order: 3;
    }

    .order-sm-last {
        order: 4;
    }
}

.btn-brand-facebook {
    background-color: rgb(24, 119, 242) !important;
}

.btn-brand-twitter {
    background-color: rgb(29, 161, 242) !important;
}

.btn-brand-dribbble {
    background-color: rgb(234, 76, 137) !important;
}

.btn-brand-youtube {
    background-color: rgb(205, 32, 31) !important;
}
</style>
