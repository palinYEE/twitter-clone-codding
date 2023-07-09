<template>
	<div class="flex flex-col items-center space-y-4 mt-10">
		<font-awesome-icon
			:icon="route.icon"
			class="text-4xl text-primary"
			:class="loading ? 'animate-bounce' : ''"
		></font-awesome-icon>
		<span class="text-2xl font-bold">윤영진 트위터 회원가입</span>
		<input
			v-model="email"
			type="text"
			class="w-96 px-4 py-3 border rounded border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
			placeholder="이메일"
		/>
		<input
			v-model="username"
			type="text"
			class="w-96 px-4 py-3 border rounded border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
			placeholder="아이디"
		/>
		<input
			v-model="password"
			type="text"
			class="w-96 px-4 py-3 border rounded border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
			placeholder="비밀번호 "
		/>
		<button
			class="w-96 rounded bg-primary text-white py-3 hover:bg-dark"
			@click="onRegister"
		>
			로그인
		</button>
		<!-- 라우터 링크로 이동 -->
		<router-link :to="{ name: 'login' }">
			<button class="text-primary">계정이 이미 있으신가요? 로그인 하기</button>
		</router-link>
	</div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import router from '../router';

const route = ref({});
const email = ref('');
const username = ref('');
const password = ref('');
const loading = ref(false);

const onRegister = () => {
	console.log(email.value, username.value, password.value);
	loading.value = true;
};

onBeforeMount(
	() =>
		(route.value = router.options.routes.find(ele => ele.name === 'register')),
);
</script>

<style lang="scss" scoped></style>
