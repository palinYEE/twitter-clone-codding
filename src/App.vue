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
				<!-- side menu v-for 을 이용하여 공통화 -->
				<div class="flex flex-col items-start space-y-1">
					<router-link
						class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
						v-for="route in routes"
						:key="route.name"
						:to="{ name: route.name }"
					>
						<font-awesome-icon
							:icon="route.icon"
							class="text-2xl fa-fw"
						></font-awesome-icon>
						<span class="ml-5 text-xl hidden xl:inline-block">{{
							route.title
						}}</span>
					</router-link>
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
		<div class="flex-1 flex h-screen">
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import router from './router/';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const routes = ref([]);
onBeforeMount(() => {
	routes.value = router.options.routes;
});
</script>

<style lang="scss" scoped></style>
