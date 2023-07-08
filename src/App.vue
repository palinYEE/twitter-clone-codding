<template>
	<div class="flex h-screen container mx-auto">
		<!-- side section -->
		<div
			class="w-20 xl:w-1/4 pt-5 xl:ml-10 flex flex-col justify-between border-r border-gray-200"
		>
			<div class="flex flex-col items-center xl:items-start">
				<!-- twitter logo -->
				<font-awesome-icon
					icon="dove"
					class="fab text-2xl text-primary xl:ml-4 mb-3"
				></font-awesome-icon>
				<!-- flex-col 하면 세로로 쌓인다. -->
				<!-- side menu icons -->
				<div class="flex flex-col items-start space-y-1">
					<div
						class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
					>
						<font-awesome-icon
							:icon="['fas', 'house-chimney']"
							class="text-2xl fa-fw"
						></font-awesome-icon>
						<span class="ml-5 text-xl hidden xl:inline-block">홈</span>
					</div>
					<div
						class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
					>
						<font-awesome-icon
							icon="hashtag"
							class="text-2xl fa-fw"
						></font-awesome-icon>
						<span class="ml-5 text-xl hidden xl:inline-block">탐색하기</span>
					</div>
					<div
						class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
					>
						<font-awesome-icon
							icon="bell"
							class="text-2xl fa-fw"
						></font-awesome-icon>
						<span class="ml-5 text-xl hidden xl:inline-block">알림</span>
					</div>
					<div
						class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
					>
						<font-awesome-icon
							:icon="['fas', 'envelope']"
							class="text-2xl fa-fw"
						></font-awesome-icon>
						<span class="ml-5 text-xl hidden xl:inline-block">쪽지</span>
					</div>
					<div
						class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
					>
						<font-awesome-icon
							icon="bookmark"
							class="text-2xl fa-fw"
						></font-awesome-icon>
						<span class="ml-5 text-xl hidden xl:inline-block">북마크</span>
					</div>
					<div
						class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
					>
						<font-awesome-icon
							icon="list-alt"
							class="text-2xl fa-fw"
						></font-awesome-icon>
						<span class="ml-5 text-xl hidden xl:inline-block">리스트</span>
					</div>
					<div
						class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
					>
						<font-awesome-icon
							icon="user"
							class="text-2xl fa-fw"
						></font-awesome-icon>
						<span class="ml-5 text-xl hidden xl:inline-block">프로필</span>
					</div>
					<div
						class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
					>
						<font-awesome-icon
							icon="ellipsis-h"
							class="text-2xl fa-fw"
						></font-awesome-icon>
						<span class="ml-5 text-xl hidden xl:inline-block">더보기</span>
					</div>
				</div>
				<!-- tweet button -->
				<div class="w-full xl:pr-3 flex justify-center">
					<button
						class="mt-3 bg-primary text-white xl:w-full w-12 h-12 rounded-full hover:bg-dark"
					>
						<span class="hidden xl:block">트윗</span>
						<font-awesome-icon
							icon="plus"
							class="xl:hidden"
						></font-awesome-icon>
					</button>
				</div>
			</div>
			<!-- profile button -->
			<div class="xl:pr-3 mb-3">
				<button
					class="hidden xl:flex mt-3 px-2 py-1 w-full h-12 rounded-full hover:bg-blue-50 items-center"
				>
					<img src="" class="w-10 h-10 rounded-full" />
					<div class="xl:ml-2 hidden xl:block">
						<div class="text-sm font-bold">yjyoon</div>
						<div class="text-xs text-gray-500 text-left">test</div>
					</div>
					<font-awesome-icon
						icon="ellipsis-h"
						class="ml-auto text-xs hidden xl:block"
					></font-awesome-icon>
				</button>
				<div class="xl:hidden flex justify-center">
					<img
						src=""
						class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
					/>
				</div>
			</div>
		</div>
		<!-- main section -->
		<div class="flex-1">
			<div class="flex h-screen">
				<!-- <home /> -->
				<!-- <notifications></notifications> -->
				<!-- <messages /> -->
				<profile />
			</div>
		</div>
	</div>
</template>

<script setup>
// import Home from './pages/Home.vue';
// import Notifications from './pages/Notifications.vue';
// import Trands from './components/Trends.vue';
// import Messages from './pages/Messages.vue';
import Profile from './pages/Profile.vue';
</script>

<style lang="scss" scoped></style>
