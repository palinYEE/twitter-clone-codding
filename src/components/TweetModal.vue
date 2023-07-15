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
								@click="onAddTweet"
								class="bg-primary hover:bg-dark text-white px-4 py-1 font-bold rounded-full text-sm"
							>
								트윗
							</button>
						</div>
					</div>
					<!-- tweeting section -->
					<div class="flex p-4">
						<img
							:src="currentUser.profile_image_url"
							class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
						/>
						<div class="ml-2 flex flex-col flex-1">
							<textarea
								v-model="tweetBody"
								rows="5"
								placeholder="무슨 일이 일어나고 있나요?"
								class="w-full text-lg font-bold focus:outline-none mb-3 resize-y"
							></textarea>
							<!-- tweet button -->
							<div class="text-right hidden sm:block">
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
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import addTweet from '../utils/addTweet';
import store from '../store';

const emit = defineEmits(['close-modal']);

const tweetBody = ref('');
const currentUser = computed(() => store.state.user);
const onAddTweet = async () => {
	try {
		await addTweet(tweetBody.value, currentUser.value);
		tweetBody.value = '';
		emit('close-modal');
	} catch (error) {
		console.log('on add tweet error on homepage: ', error.message);
	}
};
</script>

<style lang="scss" scoped></style>
