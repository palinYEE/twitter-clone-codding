<template>
	<div
		class="flex px-3 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
	>
		<router-link :to="`/profile/${tweet.uid}`">
			<img
				:src="tweet.profile_image_url"
				class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
			/>
		</router-link>
		<div class="ml-3 flex-1 flex flex-col space-y-1">
			<!-- 제목 -->
			<div class="text-sm flex justify-between items-center">
				<div class="space-x-1">
					<span class="font-bold">{{ tweet.email }}</span>
					<span class="text-gray-500 text-xs">@{{ tweet.username }}</span>
					<span>·</span>
					<span class="text-gray-500 text-xs">{{
						moment(tweet.created_at).fromNow()
					}}</span>
				</div>
				<button
					v-if="currentUser.uid === tweet.uid"
					@click="onDeleteTweet(tweet)"
				>
					<font-awesome-icon
						icon="fa-trash"
						class="text-red-400 rounded-full hover:bg-red-50"
					></font-awesome-icon>
				</button>
			</div>
			<!-- 내용 -->
			<router-link :to="`/tweet/${tweet.id}`">{{
				tweet.tweet_body
			}}</router-link>
			<!-- 아이콘들 -->
			<div class="flex justify-between">
				<!-- comment button -->
				<div
					class="text-gray-500 hover:text-primary"
					@click="showCommentModal = true"
				>
					<font-awesome-icon
						:icon="['fas', 'comment']"
						class="fa-fw hover:bg-blue-50 rounded-full p-2"
					></font-awesome-icon>
					<span class="ml-1 text-sm">{{ tweet.num_comments }}</span>
				</div>
				<!-- retweet button -->
				<div
					v-if="!tweet.isRetweeted"
					class="text-gray-500 hover:text-green-500"
					@click="handleRetweet(tweet)"
				>
					<font-awesome-icon
						:icon="['fas', 'retweet']"
						class="fa-fw hover:bg-green-50 rounded-full p-2"
					></font-awesome-icon>
					<span class="ml-1 text-sm">{{ tweet.num_retweets }}</span>
				</div>
				<div v-else class="text-green-400" @click="handleRetweet(tweet)">
					<font-awesome-icon
						:icon="['fas', 'retweet']"
						class="fa-fw hover:bg-green-50 rounded-full p-2"
					></font-awesome-icon>
					<span class="ml-1 text-sm">{{ tweet.num_retweets }}</span>
				</div>
				<!-- like button -->
				<div
					v-if="!tweet.isLiked"
					class="text-gray-500 hover:text-red-500"
					@click="handleLike(tweet)"
				>
					<font-awesome-icon
						:icon="['fas', 'heart']"
						class="fa-fw hover:bg-red-50 rounded-full p-2"
					></font-awesome-icon>
					<span class="ml-1 text-sm">{{ tweet.num_likes }}</span>
				</div>
				<div v-else class="text-red-400" @click="handleLike(tweet)">
					<font-awesome-icon
						:icon="['fas', 'heart']"
						class="fa-fw hover:bg-red-50 rounded-full p-2"
					></font-awesome-icon>
					<span class="ml-1 text-sm">{{ tweet.num_likes }}</span>
				</div>
				<!-- share -->
				<div class="text-gray-500 hover:text-primary">
					<font-awesome-icon
						:icon="['fas', 'share-square']"
						class="fa-fw hover:bg-blue-50 rounded-full p-2"
					></font-awesome-icon>
				</div>
			</div>
		</div>
	</div>
	<comment-modal
		v-if="showCommentModal"
		@close-modal="showCommentModal = false"
		:tweet="tweet"
	></comment-modal>
</template>

<script setup>
import moment from 'moment';
import { ref } from 'vue';
import CommentModal from './CommentModal.vue';
import handleRetweet from '../utils/handleRetweet';
import handleLike from '../utils/handleLike';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	increment,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../firebase';

defineProps({
	currentUser: {
		type: Object,
		required: true,
	},
	tweet: {
		type: Object,
		required: true,
	},
});

const showCommentModal = ref(false);

const onDeleteTweet = async tweet => {
	if (!confirm('정말로 트윗을 삭제하시겠습니까?')) return;
	// delete tweet
	await deleteDoc(doc(db, 'tweets', tweet.id));
	// delete comments
	const commentSnapshot = await getDocs(
		query(collection(db, 'comments'), where('from_tweet_id', '==', tweet.id)),
	);
	commentSnapshot.docs.forEach(async docData => await deleteDoc(docData.ref));
	// delete likes
	const likeSnapshot = await getDocs(
		query(collection(db, 'likes'), where('from_tweet_id', '==', tweet.id)),
	);
	likeSnapshot.docs.forEach(async docData => await deleteDoc(docData.ref));
	// delete retweets
	const retweetSnapshot = await getDocs(
		query(collection(db, 'retweets'), where('from_tweet_id', '==', tweet.id)),
	);
	retweetSnapshot.docs.forEach(async docData => await deleteDoc(docData.ref));
	// user collection - num_tweets (-1)
	await updateDoc(doc(db, `users/${tweet.uid}`), {
		num_tweets: increment(-1),
	});
};
</script>

<style lang="scss" scoped></style>
