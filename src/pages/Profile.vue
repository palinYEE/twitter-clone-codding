<template>
	<div class="flex-1 flex">
		<!-- profile section -->
		<div class="flex-1 flex flex-col border-r border-color">
			<!-- title -->
			<div class="px-3 py-1 flex border-b border-color">
				<button class="mr-4">
					<font-awesome-icon
						icon="arrow-left"
						class="text-primary p-3 rounded-full hover:bg-blue-50"
					></font-awesome-icon>
				</button>
				<div>
					<div class="font-extrabold text-lg">{{ currentUser.username }}</div>
					<div class="text-xs text-gray">{{ currentUser.num_tweets }} 트윗</div>
				</div>
			</div>
			<!-- background image -->
			<div class="bg-gray-300 h-40 relative flex-none">
				<!-- profile image -->
				<div
					class="w-28 h-28 border-4 border-white bg-gray-100 rounded-full absolute -bottom-14 left-2"
				>
					<img
						:src="currentUser.profile_image_url"
						class="rounded-full opacity-90 hover:opacity-100 cursor-pointer"
					/>
				</div>
			</div>
			<!-- profile edit button -->
			<div class="text-right mt-2 mr-2">
				<button
					class="text-sm border border-primary text-primary px-3 py-2 hover:bg-blue-50 font-bold rounded-full"
				>
					프로필 수정
				</button>
			</div>
			<!-- user info -->
			<div class="mx-3 mt-2">
				<div class="font-extrabold text-lg">{{ currentUser.email }}</div>
				<div class="text-gray text-sm">@{{ currentUser.username }}</div>
				<div class="mt-1 text-sm">
					<span class="text-gray mr-1">가입일:</span>
					<span class="text-gray">{{
						moment(currentUser.created_at).format('YYYY년 MM월')
					}}</span>
				</div>
				<div class="mt-1 text-sm">
					<span class="font-extrabold mr-1">{{
						currentUser.followings.length
					}}</span>
					<span class="text-gray mr-3">팔로우 중</span>
					<span class="font-extrabold mr-1">{{
						currentUser.followers.length
					}}</span
					><span class="text-gray mr-3">팔로워</span>
				</div>
			</div>
			<!-- tabs -->
			<div class="flex border-b border-color mt-3">
				<div
					class="w-1/4 py-3 font-bold text-primary border-b border-primary text-center hover:bg-blue-50 cursor-pointer"
				>
					트윗
				</div>
				<div
					class="w-1/4 py-3 font-bold hover:text-primary text-center hover:bg-blue-50 cursor-pointer"
				>
					트윗 및 답글
				</div>
				<div
					class="w-1/4 py-3 font-bold hover:text-primary text-center hover:bg-blue-50 cursor-pointer"
				>
					미디어
				</div>
				<div
					class="w-1/4 py-3 font-bold hover:text-primary text-center hover:bg-blue-50 cursor-pointer"
				>
					마음에 들어요
				</div>
			</div>
			<!-- tweets -->
			<div class="overflow-y-auto">
				<tweet
					v-for="tweet in tweets"
					:key="tweet"
					:current-user="currentUser"
					:tweet="tweet"
				/>
			</div>
		</div>
		<!-- trend section -->
		<trends />
	</div>
</template>

<script setup>
import Trends from '../components/Trends.vue';
import Tweet from '../components/Tweet.vue';
import store from '../store';
import { computed, ref, onBeforeMount } from 'vue';
import { db } from '../firebase';
import getTweetInfo from '../utils/getTweetInfo';
import {
	where,
	collection,
	onSnapshot,
	query,
	orderBy,
	doc,
} from 'firebase/firestore';
import moment from 'moment';

const currentUser = computed(() => store.state.user);
const tweets = ref([]);
onBeforeMount(() => {
	onSnapshot(doc(collection(db, 'users'), currentUser.value.uid), snapshot => {
		store.commit('SET_USER', snapshot.data());
	});

	onSnapshot(
		query(
			collection(db, 'tweets'),
			where('uid', '==', currentUser.value.uid),
			orderBy('created_at', 'desc'),
		),
		async snapshot => {
			let snapshotData = snapshot.docChanges();
			await snapshotData.forEach(async change => {
				let tweet = await getTweetInfo(change.doc.data(), currentUser.value);
				if (change.type === 'added') {
					tweets.value.splice(change.newIndex, 0, tweet);
				} else if (change.type === 'modified') {
					tweets.value.splice(change.oldIndex, 1, tweet);
				} else if (change.type === 'removed') {
					tweets.value.splice(change.oldIndex, 1);
				}
			});
		},
	);
});
</script>

<style lang="scss" scoped></style>
