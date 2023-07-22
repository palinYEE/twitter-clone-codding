<template>
	<div class="flex-1 flex" v-if="profileUser">
		<!-- profile section -->
		<div class="flex-1 flex flex-col border-r border-color">
			<!-- title -->
			<div class="px-3 py-1 flex border-b border-color">
				<button class="mr-4" @click="router.go(-1)">
					<font-awesome-icon
						icon="arrow-left"
						class="text-primary p-3 rounded-full hover:bg-blue-50"
					></font-awesome-icon>
				</button>
				<div>
					<div class="font-extrabold text-lg">{{ profileUser.username }}</div>
					<div class="text-xs text-gray">{{ profileUser.num_tweets }} 트윗</div>
				</div>
			</div>
			<!-- background image -->
			<div class="bg-gray-300 h-48 relative flex-none">
				<img
					:src="profileUser.background_image_url"
					class="w-full h-48 object-cover"
				/>
				<!-- profile image -->
				<div
					class="w-28 h-28 border-4 border-white bg-gray-100 rounded-full absolute -bottom-14 left-2"
				>
					<img
						:src="profileUser.profile_image_url"
						class="rounded-full opacity-90 hover:opacity-100 cursor-pointer w-full h-full"
					/>
				</div>
			</div>
			<!-- profile edit button -->
			<div class="text-right mt-2 mr-2 h-14">
				<div v-if="currentUser.uid === profileUser.uid">
					<button
						@click="showProfileEditModal = true"
						class="text-sm border border-primary text-primary px-3 py-2 hover:bg-blue-50 font-bold rounded-full"
					>
						프로필 수정
					</button>
				</div>
				<div v-else>
					<div
						v-if="currentUser.followings.includes(profileUser.uid)"
						class="relative"
						@click="onUnfollow"
					>
						<button
							class="absolute w-24 right-0 text-sm bg-primary text-white px-3 py-2 hover:opacity-0 font-bold rounded-full"
						>
							팔로윙
						</button>
						<button
							class="absolute w-24 right-0 text-sm bg-red-400 text-white px-3 py-2 opacity-0 hover:opacity-100 font-bold rounded-full"
						>
							언팔로우
						</button>
					</div>
					<div v-else @click="onFollow">
						<button
							class="w-24 text-sm border border-primary text-primary px-3 py-2 hover:bg-primary hover:text-white font-bold rounded-full"
						>
							팔로우
						</button>
					</div>
				</div>
			</div>
			<!-- user info -->
			<div class="mx-3 mt-2">
				<div class="font-extrabold text-lg">{{ profileUser.email }}</div>
				<div class="text-gray text-sm">@{{ profileUser.username }}</div>
				<div class="mt-1 text-sm">
					<span class="text-gray mr-1">가입일:</span>
					<span class="text-gray">{{
						moment(profileUser.created_at).format('YYYY년 MM월')
					}}</span>
				</div>
				<div class="mt-1 text-sm">
					<span class="font-extrabold mr-1">{{
						profileUser.followings.length
					}}</span>
					<span class="text-gray mr-3">팔로우 중</span>
					<span class="font-extrabold mr-1">{{
						profileUser.followers.length
					}}</span
					><span class="text-gray mr-3">팔로워</span>
				</div>
			</div>
			<!-- tabs -->
			<div class="flex border-b border-color mt-3">
				<div
					@click="currentTab = 'tweet'"
					class="w-1/3 py-3 font-bold text-center hover:bg-blue-50 cursor-pointer"
					:class="
						currentTab == 'tweet'
							? 'border-b border-primary text-primary'
							: 'text-gray'
					"
				>
					트윗
				</div>
				<div
					@click="currentTab = 'retweet'"
					class="w-1/3 py-3 font-bold text-center hover:bg-blue-50 cursor-pointer"
					:class="
						currentTab == 'retweet'
							? 'border-b border-primary text-primary'
							: 'text-gray'
					"
				>
					리트윗
				</div>
				<div
					@click="currentTab = 'like'"
					class="w-1/3 py-3 font-bold text-center hover:bg-blue-50 cursor-pointer"
					:class="
						currentTab == 'like'
							? 'border-b border-primary text-primary'
							: 'text-gray'
					"
				>
					마음에 들어요
				</div>
			</div>
			<!-- tweets -->
			<div class="overflow-y-auto">
				<tweet
					v-for="tweet in currentTab === 'tweet'
						? tweets
						: currentTab === 'retweet'
						? retweets
						: liketweets"
					:key="tweet"
					:current-user="profileUser"
					:tweet="tweet"
				/>
			</div>
		</div>
		<!-- trend section -->
		<trends />
		<profile-edit-modal
			v-if="showProfileEditModal"
			@close-modal="showProfileEditModal = false"
		></profile-edit-modal>
	</div>
</template>

<script setup>
import Trends from '../components/Trends.vue';
import Tweet from '../components/Tweet.vue';
import ProfileEditModal from '../components/ProfileEditModal.vue';
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
	getDoc,
	arrayUnion,
	updateDoc,
	arrayRemove,
} from 'firebase/firestore';
import moment from 'moment';
import { useRoute } from 'vue-router';
import router from '../router';

const currentUser = computed(() => store.state.user);
const profileUser = ref(null);
const tweets = ref([]);
const retweets = ref([]);
const liketweets = ref([]);
const currentTab = ref('tweet');
const route = useRoute();
const showProfileEditModal = ref(false);

onBeforeMount(() => {
	const profileUID = route.params.id ?? currentUser.value.uid;

	onSnapshot(doc(collection(db, 'users'), profileUID), snapshot => {
		// store.commit('SET_USER', snapshot.data());
		profileUser.value = snapshot.data();
	});

	onSnapshot(
		query(
			collection(db, 'tweets'),
			where('uid', '==', profileUID),
			orderBy('created_at', 'desc'),
		),
		async snapshot => {
			let snapshotData = snapshot.docChanges();
			await snapshotData.forEach(async change => {
				let tweet = await getTweetInfo(change.doc.data(), profileUser.value);
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

	onSnapshot(
		query(
			collection(db, 'retweets'),
			where('uid', '==', profileUID),
			orderBy('created_at', 'desc'),
		),
		async snapshot => {
			let snapshotData = snapshot.docChanges();
			await snapshotData.forEach(async change => {
				const docData = await getDoc(
					doc(db, 'tweets', change.doc.data().from_tweet_id),
				);
				let tweet = await getTweetInfo(docData.data(), profileUser.value);
				if (change.type === 'added') {
					retweets.value.splice(change.newIndex, 0, tweet);
				} else if (change.type === 'modified') {
					retweets.value.splice(change.oldIndex, 1, tweet);
				} else if (change.type === 'removed') {
					retweets.value.splice(change.oldIndex, 1);
				}
			});
		},
	);

	onSnapshot(
		query(
			collection(db, 'likes'),
			where('uid', '==', profileUID),
			orderBy('created_at', 'desc'),
		),
		async snapshot => {
			let snapshotData = snapshot.docChanges();
			await snapshotData.forEach(async change => {
				const docData = await getDoc(
					doc(db, 'tweets', change.doc.data().from_tweet_id),
				);
				let tweet = await getTweetInfo(docData.data(), profileUser.value);
				if (change.type === 'added') {
					liketweets.value.splice(change.newIndex, 0, tweet);
				} else if (change.type === 'modified') {
					liketweets.value.splice(change.oldIndex, 1, tweet);
				} else if (change.type === 'removed') {
					liketweets.value.splice(change.oldIndex, 1);
				}
			});
		},
	);
});

const onUnfollow = async () => {
	await updateDoc(doc(db, `users/${currentUser.value.uid}`), {
		followings: arrayRemove(profileUser.value.uid),
	});

	await updateDoc(doc(db, `users/${profileUser.value.uid}`), {
		followers: arrayRemove(currentUser.value.uid),
	});

	store.commit('SET_UNFOLLOW', profileUser.value.uid);
};

const onFollow = async () => {
	await updateDoc(doc(db, `users/${currentUser.value.uid}`), {
		followings: arrayUnion(profileUser.value.uid),
	});

	await updateDoc(doc(db, `users/${profileUser.value.uid}`), {
		followers: arrayUnion(currentUser.value.uid),
	});

	store.commit('SET_FOLLOW', profileUser.value.uid);
};
</script>

<style lang="scss" scoped></style>
