<script setup>
import useAxios from "@/services/axios";
import { useAuthStore } from "@/store";
import { useRouter } from "vue-router";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import LucideIcon from "../LucideIcon.vue";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";

const api = useAxios();
const store = useAuthStore();
const router = useRouter();

const signOut = () => {
  api({
    url: "/api/auth/signOut",
    method: "POST",
    data: {
      refreshToken: store.token.refreshToken,
    },
  }).then(() => {
    store.signOut();
    router.push("/");
  });
};
</script>

<template>
  <nav class="w-full border shadow-sm bg-white">
    <div class="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0 font-bold mr-10">
            <RouterLink to="/">Vue 연습화면</RouterLink>
          </div>
          <div
            class="flex flex-shrink-0 items-center space-x-6 mx-10 text-sm/[17px]"
          >
            <Menubar class="border-none shadow-none">
              <template v-for="menu in store.$state.userMenus">
                <MenubarMenu
                  v-if="menu.parentMenuId === 0 && menu.childCount === 0"
                >
                  <RouterLink :to="menu.menuUrl">
                    <MenubarTrigger>
                      <template v-if="menu.icon !== null || menu.icon !== ''">
                        <LucideIcon name="menu.icon" :size="20" class="mr-2" />
                      </template>
                      {{ menu.menuName }}
                    </MenubarTrigger>
                  </RouterLink>
                </MenubarMenu>
                <MenubarMenu
                  v-if="menu.parentMenuId === 0 && menu.childCount > 0"
                >
                  <MenubarTrigger>
                    <template v-if="menu.icon !== null || menu.icon !== ''">
                      <LucideIcon name="menu.icon" :size="20" class="mr-2" />
                    </template>
                    {{ menu.menuName }}
                  </MenubarTrigger>
                  <MenubarContent>
                    <template v-for="subMenu in store.$state.userMenus">
                      <template v-if="menu.menuId === subMenu.parentMenuId">
                        <RouterLink :to="subMenu.menuUrl">
                          <MenubarItem>
                            <template v-if="subMenu.icon">
                              <LucideIcon
                                :name="subMenu.icon"
                                :size="20"
                                class="mr-2"
                              />
                            </template>
                            {{ subMenu.menuName }}
                          </MenubarItem>
                        </RouterLink>
                      </template>
                    </template>
                  </MenubarContent>
                </MenubarMenu>
              </template>
            </Menubar>
          </div>
        </div>
        <div class="flex-shrink-0 text-sm">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div class="flex items-center">
                <LucideIcon name="Smile" :size="18" />
                <span class="ml-2">
                  {{ store.user.userName }} ({{ store.user.email }})
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <RouterLink to="/user/profile">Profile</RouterLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a v-on:click="signOut" style="cursor: pointer">Sign out</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </nav>
</template>
