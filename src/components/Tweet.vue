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
				<div class="text-gray-500 hover:text-primary">
					<font-awesome-icon
						:icon="['fas', 'comment']"
						class="fa-fw hover:bg-blue-50 rounded-full p-2"
					></font-awesome-icon>
					<span class="ml-1 text-sm">{{ tweet.num_comments }}</span>
				</div>
				<div class="text-gray-500 hover:text-green-500">
					<font-awesome-icon
						:icon="['fas', 'retweet']"
						class="fa-fw hover:bg-green-50 rounded-full p-2"
					></font-awesome-icon>
					<span class="ml-1 text-sm">{{ tweet.num_retweets }}</span>
				</div>
				<div class="text-gray-500 hover:text-red-500">
					<font-awesome-icon
						:icon="['fas', 'heart']"
						class="fa-fw hover:bg-red-50 rounded-full p-2"
					></font-awesome-icon>
					<span class="ml-1 text-sm">{{ tweet.num_likes }}</span>
				</div>
				<div class="text-gray-500 hover:text-primary">
					<font-awesome-icon
						:icon="['fas', 'share-square']"
						class="fa-fw hover:bg-blue-50 rounded-full p-2"
					></font-awesome-icon>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import moment from 'moment';
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
</script>

<style lang="scss" scoped></style>
