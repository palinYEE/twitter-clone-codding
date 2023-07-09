import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Notifications from '../pages/Notifications.vue';
import Messages from '../pages/Messages.vue';
import Profile from '../pages/Profile.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		title: '홈',
		icon: ['fas', 'house-chimney'],
		component: Home,
	},
	{
		path: '/',
		name: 'explore',
		title: '탐색하기',
		icon: ['fas', 'hashtag'],
		component: Home,
	},
	{
		path: '/notification',
		name: 'notification',
		title: '알림',
		icon: ['fas', 'bell'],
		component: Notifications,
	},
	{
		path: '/messages',
		name: 'messages',
		title: '쪽지',
		icon: ['fas', 'envelope'],
		component: Messages,
	},
	{
		path: '/',
		name: 'bookmark',
		title: '북마크',
		icon: ['fas', 'bookmark'],
		component: Home,
	},
	{
		path: '/',
		name: 'list',
		title: '리스트',
		icon: ['fas', 'list-alt'],
		component: Home,
	},
	{
		path: '/profile',
		name: 'profile',
		title: '프로필',
		icon: ['fas', 'user'],
		component: Profile,
	},
	{
		path: '/',
		name: 'more',
		title: '더보기',
		icon: ['fas', 'ellipsis-h'],
		component: Home,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
