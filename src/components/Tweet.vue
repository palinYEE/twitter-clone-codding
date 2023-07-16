<template>
	<div
		class="flex px-3 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
	>
		<img
			:src="currentUser.profile_image_url"
			class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
		/>
		<div class="ml-3 flex-1 flex flex-col space-y-1">
			<!-- 제목 -->
			<div class="text-sm space-x-1">
				<span class="font-bold">{{ tweet.email }}</span>
				<span class="text-gray-500 text-xs">@{{ tweet.username }}</span>
				<span>·</span>
				<span class="text-gray-500 text-xs">{{
					moment(tweet.created_at).fromNow()
				}}</span>
			</div>
			<!-- 내용 -->
			<div>{{ tweet.tweet_body }}</div>
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
</script>

<style lang="scss" scoped></style>
