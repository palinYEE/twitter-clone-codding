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
			type="password"
			class="w-96 px-4 py-3 border rounded border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
			placeholder="비밀번호 "
		/>
		<button v-if="loading" class="w-96 rounded bg-light text-white py-3">
			회원가입 중입니다.
		</button>
		<button
			v-else
			class="w-96 rounded bg-primary text-white py-3 hover:bg-dark"
			@click="onRegister"
		>
			회원가입
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

import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const route = ref({});
const email = ref('');
const username = ref('');
const password = ref('');
const loading = ref(false);

const onRegister = async () => {
	if (!username.value || !email.value || !password.value) {
		alert('아이디, 이메일, 비밀번호를 모두 입력해주세요');
		return;
	}
	try {
		loading.value = true;
		const { user } = await createUserWithEmailAndPassword(
			auth,
			email.value,
			password.value,
		);
		const data = doc(db, `users/${user.uid}`);
		await setDoc(data, {
			uid: user.uid,
			email: email.value,
			profile_image_url: '/profile.jpeg',
			num_tweets: 0,
			followers: [],
			followings: [],
			created_at: Date.now(),
		});
		alert('회원 가입에 성공하셨습니다. 로그인 해주세요');
		router.push({ name: 'login' });
	} catch (error) {
		let message = error.message;
		switch (error.code) {
			case 'auth/invalid-email':
				message = '잘못된 이메일 형식입니다.';
				break;
			case 'auth/week-password':
				message = '비밀번호를 6글자 이상 작성이 필요합니다.';
				break;
			case 'auth/email-already-in-use':
				message = '이미 가입되어있는 이메일 입니다.';
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
