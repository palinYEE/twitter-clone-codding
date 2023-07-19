<template>
	<div
		class="relative z-10"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
		@click="$emit('close-modal')"
	>
		<div
			class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
		></div>

		<div class="fixed inset-0 z-10 overflow-y-auto">
			<div
				class="flex min-h-full justify-center text-center sm:items-start sm:p-4"
			>
				<!-- content -->
				<div
					@click.stop
					class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg"
				>
					<div
						class="border-b border-gray-100 p-2 flex items-center justify-between"
					>
						<button
							@click="$emit('close-modal')"
							class="text-primary text-xl p-2 h-10 w-10 hover:bg-blue-50 rounded-full"
						>
							<font-awesome-icon icon="fa-times"></font-awesome-icon>
						</button>
						<!-- tweet button -->
						<div class="text-right sm:hidden block mr-2">
							<button
								v-if="tweetBody.length === 0"
								class="bg-light text-white px-4 py-1 font-bold rounded-full text-sm"
							>
								트윗
							</button>
							<button
								v-else
								@click="onCommentTweet"
								class="bg-primary hover:bg-dark text-white px-4 py-1 font-bold rounded-full text-sm"
							>
								트윗
							</button>
						</div>
					</div>
					<div>
						<!-- original tweet -->
						<div>
							<div class="flex px-4 pt-4 pb-3">
								<div class="flex flex-col">
									<img
										:src="currentUser.profile_image_url"
										class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
									/>
									<div class="ml-5 w-0.5 h-full bg-gray-300 mt-2 -mb-1"></div>
								</div>
								<div class="flex-1 ml-2">
									<div class="flex space-x-2">
										<span class="font-bold text-sm">{{ tweet.email }}</span>
										<span class="text-gray text-sm">@{{ tweet.username }}</span>
										<span class="text-gray text-sm">{{
											moment(tweet.created_at).fromNow()
										}}</span>
									</div>
									<div class="text-sm">{{ tweet.tweet_body }}</div>
									<div>
										<span class="text-primary text-sm"
											>@{{ tweet.username }}</span
										>
										<span class="text-gray text-sm">님에게 보내는 답글</span>
									</div>
								</div>
							</div>
						</div>
						<!-- tweeting section -->
						<div class="flex px-4 pb-4">
							<img
								:src="currentUser.profile_image_url"
								class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
							/>
							<div class="ml-2 flex flex-col flex-1">
								<textarea
									v-model="tweetBody"
									rows="5"
									placeholder="내 답글을 트윗합니다."
									class="w-full text-lg font-bold focus:outline-none mb-3 resize-y"
								></textarea>
								<!-- tweet button -->
								<div class="text-right hidden sm:block">
									<button
										v-if="tweetBody.length === 0"
										class="bg-light text-white px-4 py-1 font-bold rounded-full text-sm"
									>
										답글
									</button>
									<button
										v-else
										@click="onCommentTweet"
										class="bg-primary hover:bg-dark text-white px-4 py-1 font-bold rounded-full text-sm"
									>
										답글
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import store from '../store';
import moment from 'moment';
import { setDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const emit = defineEmits(['close-modal']);
const props = defineProps({
	tweet: {
		type: Object,
		required: true,
	},
});

const tweetBody = ref('');
const currentUser = computed(() => store.state.user);
const onCommentTweet = async () => {
	try {
		let uniqueId = uuidv4();
		const data = doc(db, 'comments', uniqueId);
		await setDoc(data, {
			id: uniqueId,
			from_tweet_id: props.tweet.id,
			comment_tweet_body: tweetBody.value,
			uid: currentUser.value.uid,
			created_at: Date.now(),
		});

		await updateDoc(doc(db, `tweets/${props.tweet.id}`), {
			num_comments: increment(1),
		});
		tweetBody.value = '';
		emit('close-modal');
	} catch (error) {
		console.log('on comment tweet error: ', error);
	}
};
</script>

<style lang="scss" scoped></style>
