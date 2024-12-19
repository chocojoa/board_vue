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
import PrivateLayout from "@/components/layouts/PrivateLayout.vue";
import NotFound from "@/pages/common/NotFound.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "dashboard" },
  },
  {
    component: PrivateLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "/boards/:categoryId/posts",
        component: PostList,
        children: [
          {
            path: "create",
            component: PostCreate,
          },
          {
            path: ":postId",
            component: PostDetail,
          },
          {
            path: ":postId/edit",
            component: PostEdit,
          },
        ],
      },
      {
        path: "/admin/users",
        component: UserList,
        children: [
          {
            path: "create",
            component: UserCreate,
          },
          {
            path: ":userId",
            component: UserDetail,
          },
          {
            path: ":userId/edit",
            component: UserEdit,
          },
        ],
      },
      {
        path: "/admin/menus",
        component: MenuList,
      },
      {
        path: "/admin/roles",
        component: Role,
      },
      {
        path: "/user/profile",
        component: Profile,
      },
    ],
  },
  {
    component: PublicLayout,
    children: [
      {
        path: "/auth",
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
    ],
  },
  {
    path: "/error",
    name: "error",
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "error" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = !!authStore.token;

  if (to.path === "/") {
    if (isLoggedIn) {
      next("/dashboard");
    } else {
      next("/auth/signIn");
    }
  } else {
    next();
  }
});

export default router;
