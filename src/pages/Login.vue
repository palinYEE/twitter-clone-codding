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
			@keyup.enter="onLogin"
			v-model="password"
			type="password"
			class="w-96 px-4 py-3 border rounded border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
			placeholder="비밀번호"
		/>
		<button v-if="loading" class="w-96 rounded bg-light text-white py-3">
			로그인 중입니다.
		</button>
		<button
			v-else
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
import router from '../router';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import store from '../store';

// 반응형 상수 선언
const route = ref({});
const email = ref('');
const password = ref('');
const loading = ref(false);

// 회원가입 창으로 이동
const goRegister = () => router.push({ name: 'register' });

const onLogin = async () => {
	if (!email.value || !password.value) {
		alert('이메일, 비밀번호를 모두 입력해주세요');
		return;
	}
	try {
		loading.value = true;
		const { user } = await signInWithEmailAndPassword(
			auth,
			email.value,
			password.value,
		);

		// get user info
		const docData = await getDoc(doc(db, 'users', user.uid));
		store.commit('SET_USER', docData.data());
		router.replace({ name: 'home' });
	} catch (error) {
		let message = error.message;
		switch (error.code) {
			case 'auth/invalid-email':
				message = '잘못된 이메일 형식입니다.';
				break;
			case 'auth/wrong-password':
				message = '비밀번호가 틀립니다.';
				break;
			case 'auth/user-not-found':
				message = '등록되지 않는 이메일입니다.';
				break;
			default:
				break;
		}
		alert(message);
	} finally {
		loading.value = false;
	}
};

onBeforeMount(
	() =>
		(route.value = router.options.routes.find(ele => ele.name === 'register')),
);
</script>

<style lang="scss" scoped></style>
