<template>
	<!-- main part -->
	<div class="flex-1 border-r border-gray-100 overflow-y-auto">
		<div class="flex flex-col">
			<!-- page title -->
			<div class="border-b border-gray-100 px-3 py-2 font-bold text-lg">홈</div>
			<!-- tweeting section -->
			<div class="flex px-3 py-3 border-b-8 border-gray-100">
				<img
					:src="currentUser.profile_image_url"
					class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
				/>
				<div class="ml-2 flex flex-col flex-1">
					<textarea
						v-model="tweetBody"
						placeholder="무슨 일이 일어나고 있나요?"
						class="w-full text-lg font-bold focus:outline-none mb-3 resize-y"
					></textarea>
					<div class="text-right">
						<button
							v-if="tweetBody.length === 0"
							class="bg-light text-white px-4 py-1 font-bold rounded-full text-sm"
						>
							트윗
						</button>
						<button
							v-else
							@click="onAddTweet"
							class="bg-primary hover:bg-dark text-white px-4 py-1 font-bold rounded-full text-sm"
						>
							트윗
						</button>
					</div>
				</div>
			</div>
			<!-- tweets -->
			<tweet
				:currentUser="currentUser"
				:tweet="tweet"
				v-for="tweet in tweets"
				:key="tweet.id"
			/>
		</div>
	</div>
	<!-- trend part -->
	<trands />
</template>

<script setup>
import Trands from '../components/Trends.vue';
import Tweet from '../components/Tweet.vue';
import { ref, computed, onBeforeMount } from 'vue';
import store from '../store';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import addTweet from '../utils/addTweet';
import getTweetInfo from '../utils/getTweetInfo';

const tweets = ref([]);
onBeforeMount(() => {
	onSnapshot(
		query(collection(db, 'tweets'), orderBy('created_at', 'desc')),
		async snapshot => {
			let snapshotData = snapshot.docChanges();
			await snapshotData.forEach(async change => {
				let tweet = await getTweetInfo(change.doc.data(), currentUser.value);
				console.log(tweet);
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

const tweetBody = ref('');
const onAddTweet = async () => {
	try {
		await addTweet(tweetBody.value, currentUser.value);
		tweetBody.value = '';
	} catch (error) {
		console.log('on add tweet error on homepage: ', error.message);
	}
};

const currentUser = computed(() => store.state.user);
</script>

<style lang="scss" scoped></style>
