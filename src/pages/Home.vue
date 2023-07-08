<template>
	<!-- main part -->
	<div class="flex-1 border-r border-gray-100 overflow-y-auto">
		<div class="flex flex-col">
			<!-- page title -->
			<div class="border-b border-gray-100 px-3 py-2 font-bold text-lg">홈</div>
			<!-- tweeting section -->
			<div class="flex px-3 py-3 border-b-8 border-gray-100">
				<img
					src=""
					class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
				/>
				<div class="ml-2 flex flex-col flex-1">
					<textarea
						placeholder="무슨 일이 일어나고 있나요?"
						class="w-full text-lg font-bold focus:outline-none mb-3 resize-y"
					></textarea>
					<div class="text-right">
						<button
							class="bg-primary hover:bg-dark text-white px-4 py-1 font-bold rounded-full text-sm"
						>
							트윗
						</button>
					</div>
				</div>
			</div>
			<!-- tweets -->
			<tweet />
		</div>
	</div>
	<!-- trend part -->
	<trands />
</template>

<script setup>
import Trands from '../components/Trends.vue';
import Tweet from '../components/Tweet.vue';
</script>

<style lang="scss" scoped></style>
