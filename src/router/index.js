import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Notifications from '../pages/Notifications.vue';
import Messages from '../pages/Messages.vue';
import Profile from '../pages/Profile.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Tweet from '../pages/Tweet.vue';
import store from '../store';

const routes = [
	{
		path: '/',
		name: 'home',
		title: '홈',
		icon: ['fas', 'house-chimney'],
		component: Home,
		meta: {
			isMenu: true,
			layout: 'DefaultLayout',
			requireAuth: true,
		},
	},
	{
		path: '/',
		name: 'explore',
		title: '탐색하기',
		icon: ['fas', 'hashtag'],
		component: Home,
		meta: {
			isMenu: true,
			layout: 'DefaultLayout',
			requireAuth: true,
		},
	},
	{
		path: '/notification',
		name: 'notification',
		title: '알림',
		icon: ['fas', 'bell'],
		component: Notifications,
		meta: {
			isMenu: true,
			layout: 'DefaultLayout',
			requireAuth: true,
		},
	},
	{
		path: '/messages',
		name: 'messages',
		title: '쪽지',
		icon: ['fas', 'envelope'],
		component: Messages,
		meta: {
			isMenu: true,
			layout: 'DefaultLayout',
			requireAuth: true,
		},
	},
	{
		path: '/',
		name: 'bookmark',
		title: '북마크',
		icon: ['fas', 'bookmark'],
		component: Home,
		meta: {
			isMenu: true,
			layout: 'DefaultLayout',
			requireAuth: true,
		},
	},
	{
		path: '/',
		name: 'list',
		title: '리스트',
		icon: ['fas', 'list-alt'],
		component: Home,
		meta: {
			isMenu: true,
			layout: 'DefaultLayout',
			requireAuth: true,
		},
	},
	{
		path: '/profile',
		name: 'profile',
		title: '프로필',
		icon: ['fas', 'user'],
		component: Profile,
		meta: {
			isMenu: true,
			layout: 'DefaultLayout',
			requireAuth: true,
		},
	},
	{
		path: '/profile/:id',
		component: Profile,
		meta: {
			isMenu: false,
			layout: 'DefaultLayout',
			requireAuth: true,
		},
	},
	{
		path: '/',
		name: 'more',
		title: '더보기',
		icon: ['fas', 'ellipsis-h'],
		component: Home,
		meta: {
			isMenu: true,
			layout: 'DefaultLayout',
			requireAuth: true,
		},
	},
	{
		path: '/tweet/:id',
		name: 'tweet',
		component: Tweet,
		meta: {
			isMenu: false,
			layout: 'DefaultLayout',
			requireAuth: true,
		},
	},
	{
		path: '/register',
		name: 'register',
		icon: ['fas', 'dove'],
		component: Register,
		meta: {
			isMenu: false,
			layout: 'EmptyLayout',
		},
	},
	{
		path: '/login',
		name: 'login',
		icon: ['fas', 'dove'],
		component: Login,
		meta: {
			isMenu: false,
			layout: 'EmptyLayout',
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const currentUser = store.state.user;
	const requireAuth = to.matched.some(record => record.meta.requireAuth);
	// not authenticated
	if (requireAuth && !currentUser) next({ name: 'login' });
	// authenticated
	else next();
});

export default router;
