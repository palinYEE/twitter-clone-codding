<template>
	<div class="flex-1 flex">
		<div class="flex-1 border-r border-gray-100">
			<div class="flex flex-col" v-if="tweet">
				<!-- title -->
				<div class="flex items-center px-3 py-2 border-b border-gray-100">
					<button @click="router.go(-1)">
						<font-awesome-icon
							icon="fa-arrow-left"
							class="text-primary text-lg ml-3 hover:bg-blue-50 p-2 rounded-full h-5 w-5"
						></font-awesome-icon>
					</button>
					<span class="font-bold text-lg ml-6">트윗</span>
				</div>
				<!-- tweet -->
				<div class="px-3 py-2 flex">
					<img
						:src="tweet.profile_image_url"
						class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer"
					/>
					<div class="ml-2">
						<div class="font-bold">{{ tweet.email }}</div>
						<div class="text-gray text-sm">@{{ tweet.username }}</div>
					</div>
				</div>
				<!-- 본문 -->
				<div class="px-3 py-2">{{ tweet.tweet_body }}</div>
				<div class="px-3 py-2 text-gray text-xs">
					{{ moment(tweet.created_at).fromNow() }}
				</div>
				<div class="h-px w-full bg-gray-100"></div>
				<div class="flex space-x-2 px-3 py-2 items-center">
					<span class="text-sm">{{ tweet.num_retweets }}</span>
					<span class="text-sm text-gray">리트윗</span>
					<span class="text-sm ml-5">{{ tweet.num_likes }}</span>
					<span class="text-sm text-gray">마음에 들어요</span>
				</div>
				<div class="h-px w-full bg-gray-100"></div>
				<!-- buttons -->
				<div class="flex justify-around py-2">
					<button @click="showCommentModal = true">
						<font-awesome-icon
							icon="fa-comment"
							class="text-gray-400 text-xl hover:bg-blue-50 hover:text-primary p-2 rounded-full w-5 h-5"
						></font-awesome-icon>
					</button>
					<button @click="handleRetweet(tweet)">
						<font-awesome-icon
							v-if="tweet.isRetweeted"
							icon="fa-retweet"
							class="text-xl hover:bg-green-50 text-green-400 p-2 rounded-full w-5 h-5"
						></font-awesome-icon>
						<font-awesome-icon
							v-else
							icon="fa-retweet"
							class="text-gray-400 text-xl hover:bg-green-50 hover:text-green-400 p-2 rounded-full w-5 h-5"
						></font-awesome-icon>
					</button>
					<button @click="handleLike(tweet)">
						<font-awesome-icon
							v-if="tweet.isLiked"
							icon="fa-heart"
							class="text-xl hover:bg-red-50 text-red-400 p-2 rounded-full w-5 h-5"
						></font-awesome-icon>
						<font-awesome-icon
							v-else
							icon="fa-heart"
							class="text-gray-400 text-xl hover:bg-red-50 hover:text-red-400 p-2 rounded-full w-5 h-5"
						></font-awesome-icon>
					</button>
				</div>
				<div class="h-px w-full bg-gray-100"></div>
				<!-- comments -->
				<div
					v-for="comment in comments"
					:key="comment"
					class="flex hover:bg-gray-50 cursor-pointer px-3 py-3 border-b border-gray-100"
				>
					<img
						:src="comment.profile_image_url"
						class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer"
					/>
					<div class="ml-2 flex-1">
						<div class="flex items-center space-x-2">
							<span class="font-bold">{{ comment.email }}</span>
							<span class="text-gray text-sm">@{{ comment.username }}</span>
							<span>{{ moment(comment.created_at).fromNow() }}</span>
						</div>
						<div>{{ comment.comment_tweet_body }}</div>
					</div>
					<button
						@click="handleDeleteComment(comment)"
						v-if="comment.uid === currentUser.uid"
					>
						<font-awesome-icon
							icon="fa-trash"
							class="text-red-400 hover:bg-red-50 w-5 h-5 rounded-full p-2"
						></font-awesome-icon>
					</button>
				</div>
			</div>
		</div>
		<trends></trends>
		<comment-modal
			v-if="showCommentModal"
			:tweet="tweet"
			@close-modal="showCommentModal = false"
		></comment-modal>
	</div>
</template>

<script setup>
import Trends from '../components/Trends.vue';
import router from '../router';
import { onBeforeMount, ref, computed } from 'vue';
import store from '../store';
import {
	collection,
	onSnapshot,
	doc,
	query,
	orderBy,
	deleteDoc,
	updateDoc,
	increment,
	where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useRoute } from 'vue-router';
import getTweetInfo from '../utils/getTweetInfo';
import moment from 'moment';
import CommentModal from '../components/CommentModal.vue';
import handleRetweet from '../utils/handleRetweet';
import handleLike from '../utils/handleLike';

const tweet = ref(null);
const comments = ref([]);
const currentUser = computed(() => store.state.user);
const showCommentModal = ref(false);
const route = useRoute();

const handleDeleteComment = async comment => {
	if (!confirm('커멘트를 삭제하시겠습니까?')) {
		return;
	}
	// delete comment
	const commentsCollection = collection(db, 'comments');
	await deleteDoc(doc(commentsCollection, comment.id));
	// decrease tweet num comments
	await updateDoc(doc(db, `tweets/${comment.from_tweet_id}`), {
		num_comments: increment(-1),
	});
};

onBeforeMount(async () => {
	const tweetCollection = collection(db, `tweets`);
	await onSnapshot(doc(tweetCollection, route.params.id), async docData => {
		const t = await getTweetInfo(docData.data(), currentUser.value);
		tweet.value = t;
	});

	onSnapshot(
		query(
			collection(db, 'comments'),
			where('from_tweet_id', '==', route.params.id),
			orderBy('created_at', 'desc'),
		),
		snapshot => {
			let snapshotData = snapshot.docChanges();
			snapshotData.forEach(async change => {
				let comment = await getTweetInfo(change.doc.data(), currentUser.value);
				if (change.type === 'added') {
					comments.value.splice(change.newIndex, 0, comment);
				} else if (change.type === 'modified') {
					comments.value.splice(change.oldIndex, 1, comment);
				} else if (change.type === 'removed') {
					comments.value.splice(change.oldIndex, 1);
				}
			});
		},
	);
});
</script>

<style lang="scss" scoped></style>
