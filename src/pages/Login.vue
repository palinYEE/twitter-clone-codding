<template>
	<div class="flex flex-col items-center space-y-4 mt-10">
		<font-awesome-icon
			:icon="route.icon"
			class="text-4xl text-primary"
			:class="loading ? 'animate-bounce' : ''"
		></font-awesome-icon>
		<span class="text-2xl font-bold">윤영진 트위터 로그인</span>
		<input
			v-model="email"
			type="text"
			class="w-96 px-4 py-3 border rounded border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
			placeholder="이메일"
		/>
		<input
			v-model="password"
			type="text"
			class="w-96 px-4 py-3 border rounded border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
			placeholder="비밀번호"
		/>
		<button
			class="w-96 rounded bg-primary text-white py-3 hover:bg-dark"
			@click="onLogin"
		>
			로그인
		</button>
		<button class="text-primary" @click="goRegister">
			계정이 없으신가요? 회원가입 하기
		</button>
	</div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import router from '../router';

// 반응형 상수 선언
const route = ref({});
const email = ref('');
const password = ref('');
const loading = ref(false);

// 회원가입 창으로 이동
const vueRouter = useRouter();
const goRegister = () => vueRouter.push({ name: 'register' });

const onLogin = () => {
	loading.value = true;
};

onBeforeMount(
	() =>
		(route.value = router.options.routes.find(ele => ele.name === 'register')),
);
</script>

<style lang="scss" scoped></style>
