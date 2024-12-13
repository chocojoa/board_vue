import { useAuthStore } from "@/store";
import { createRouter, createWebHistory } from "vue-router";

import PublicLayout from "@/components/layouts/PublicLayout.vue";
import MenuList from "@/pages/admin/menu/MenuList.vue";
import Role from "@/pages/admin/role/Role.vue";
import UserCreate from "@/pages/admin/user/UserCreate.vue";
import UserDetail from "@/pages/admin/user/UserDetail.vue";
import UserEdit from "@/pages/admin/user/UserEdit.vue";
import UserList from "@/pages/admin/user/UserList.vue";
import SignIn from "@/pages/auth/SignIn.vue";
import SignUp from "@/pages/auth/SignUp.vue";
import Dashboard from "@/pages/dashboard/Dashboard.vue";
import PostCreate from "@/pages/post/PostCreate.vue";
import PostDetail from "@/pages/post/PostDetail.vue";
import PostEdit from "@/pages/post/PostEdit.vue";
import PostList from "@/pages/post/PostList.vue";
import Profile from "@/pages/user/Profile.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "dashboard" },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
      },
      {
        path: "/board/:categoryId/posts",
        component: PostList,
        meta: { requiresAuth: true },
        children: [
          {
            path: "create",
            component: PostCreate,
            meta: { requiresAuth: true },
          },
          {
            path: ":postId",
            component: PostDetail,
            meta: { requiresAuth: true },
          },
          {
            path: ":postId/edit",
            component: PostEdit,
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: "/admin/users",
        component: UserList,
        meta: { requiresAuth: true },
        children: [
          {
            path: "create",
            component: UserCreate,
            meta: { requiresAuth: true },
          },
          {
            path: ":userId",
            component: UserDetail,
            meta: { requiresAuth: true },
          },
          {
            path: ":userId/edit",
            component: UserEdit,
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: "/admin/menus",
        component: MenuList,
        meta: { requiresAuth: true },
      },
      {
        path: "/admin/roles",
        component: Role,
        meta: { requiresAuth: true },
      },
      {
        path: "/user/profile",
        component: Profile,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/auth",
    component: PublicLayout,
    children: [
      {
        path: "signIn",
        component: SignIn,
      },
      {
        path: "signUp",
        component: SignUp,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 사용자가 로그인하지 않은 경우
    if (!authStore.isAuthenticated) {
      // 로그인 페이지로 리다이렉트
      next("/auth/signIn");
    } else {
      // 사용자가 로그인 한 경우
      next();
    }
  } else {
    // 로그인이 필요하지 않은 router 인 경우
    next();
  }
});

export default router;
