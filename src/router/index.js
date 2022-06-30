import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    redirect: '/user',
    children: [
      {
        path: '/user',
        component: () => import('../views/UserHome.vue'),
      },
      {
        path: '/about',
        component: () => import('../views/UserAbout.vue'),
      },
      {
        path: '/products',
        component: () => import('../views/UserProducts.vue'),
      },
      {
        path: '/product/:productId',
        component: () => import('../views/UserProductInfo.vue'),
      },
      {
        path: '/coupons',
        component: () => import('../views/UserCoupon.vue'),
      },
      {
        path: '/cart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: '/checkout/:orderId',
        component: () => import('../views/UserCheckout.vue'),
      },
      {
        path: '/favorites',
        component: () => import('../views/UserFavorites.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/AdminProducts.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/AdminOrders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/AdminCoupons.vue'),
      },
    ],
  },
  // 重新導向
  {
    path: '/:pathMatch(.*)*',
    redirect: '/user',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
