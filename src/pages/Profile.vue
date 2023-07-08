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
					<div class="font-extrabold text-lg">yjyoon</div>
					<div class="text-xs text-gray">393 트윗</div>
				</div>
			</div>
			<!-- background image -->
			<div class="bg-gray-300 h-40 relative flex-none">
				<!-- profile image -->
				<div
					class="w-28 h-28 border-4 border-white bg-gray-100 rounded-full absolute -bottom-14 left-2"
				>
					<img
						src="http://picsum.photos/200"
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
				<div class="font-extrabold text-lg">yjyoon</div>
				<div class="text-gray text-sm">@test</div>
				<div class="mt-1 text-sm">
					<span class="text-gray mr-1">가입일:</span>
					<span class="text-gray">2011년 10월</span>
				</div>
				<div class="mt-1 text-sm">
					<span class="font-extrabold mr-1">28</span>
					<span class="text-gray mr-3">팔로우 중</span>
					<span class="font-extrabold mr-1">7</span
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
				<tweet v-for="tweet in 100" :key="tweet" />
			</div>
		</div>
		<!-- trend section -->
		<trends />
	</div>
</template>

<script setup>
import Trends from '../components/Trends.vue';
import Tweet from '../components/Tweet.vue';
</script>

<style lang="scss" scoped></style>
