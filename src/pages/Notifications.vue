<template>
	<!-- notification -->
	<div class="flex-1 border-r border-gray-100 flex flex-col overflow-y-auto">
		<!-- title -->
		<div class="p-3 font-bold text-lg border-b border-gray-100">알림</div>
		<!-- notifications -->
		<div
			class="flex flex-col hover:bg-gray-50 p-3 space-y-2 border-b border-gray-100 cursor-pointer"
			v-for="notification in notifications"
			:key="notification.id"
		>
			<div class="flex justify-between">
				<router-link :to="`/profile/${notification.uid}`">
					<img
						:src="notification.profile_image_url"
						class="w-10 h-10 rounded-full hover:opacity-80"
					/>
				</router-link>
				<font-awesome-icon
					icon="ellipsis-h"
					class="fas text-gray-500 hover:bg-blue-50 hover:text-primary p-2 rounded-full w-5 h- flex items-center justify-center"
				></font-awesome-icon>
			</div>
			<div>
				<span class="font-bold">{{ notification.username }}</span> 님의 최근
				트윗
			</div>
			<router-link :to="`/tweet/${notification.id}`" class="text-gray-500">{{
				notification.tweet_body
			}}</router-link>
		</div>
	</div>
	<!-- trends -->
	<trends />
</template>

<script setup>
import Trends from '../components/Trends.vue';
import { ref, computed, onBeforeMount } from 'vue';
import store from '../store';
import {} from 'firebase/storage';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import getTweetInfo from '../utils/getTweetInfo';

const currentUser = computed(() => store.state.user);
const notifications = ref([]);
onBeforeMount(() => {
	currentUser.value.followings.forEach(async following => {
		const tweetCollection = collection(db, 'tweets');
		const dateFrom = Date.now() - 60 * 60 * 24 * 7 * 1000; // before 7 days
		const snapshot = await getDocs(
			query(
				tweetCollection,
				where('uid', '==', following),
				where('created_dat', '>=', dateFrom),
				orderBy('created_at', 'desc'),
			),
		);
		snapshot.docs.forEach(async element => {
			let tweet = await getTweetInfo(element.data(), currentUser.value);
			notifications.value.push(tweet);
		});
	});
});
</script>

<style lang="scss" scoped></style>
