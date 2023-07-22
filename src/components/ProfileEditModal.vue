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
						<div class="flex items-center">
							<button
								@click="$emit('close-modal')"
								class="flex items-center justify-center text-primary text-xl p-2 h-10 w-10 hover:bg-blue-50 rounded-full"
							>
								<font-awesome-icon icon="fa-times"></font-awesome-icon>
							</button>
							<span class="font-bold text-lg">프로필 수정</span>
						</div>
						<div class="text-right mr-2">
							<button
								@click="onSaveProfile"
								class="hover:bg-dark bg-primary text-white font-bold px-3 py-1 rounded-full"
							>
								저장
							</button>
						</div>
					</div>
					<!-- image section -->
					<div class="h-60">
						<!-- background image -->
						<div
							class="bg-gray-300 h-40 relative flex-none flex items-center justify-center"
						>
							<img
								ref="backgroundImage"
								:src="currentUser.background_image_url"
								class="object-cover absolute h-full w-full"
							/>
							<button
								@click="onChangeBackgroundImage"
								class="absolute h-10 w-10 hover:text-gray-200 rounded-full text-white text-lg"
							>
								<font-awesome-icon icon="fa-camera"></font-awesome-icon>
							</button>
							<input
								type="file"
								accept="image/*"
								id="backgroundImageInput"
								class="hidden"
								@change="previewBackgroundImage"
							/>

							<!-- profile image -->
							<img
								ref="profileImage"
								:src="currentUser.profile_image_url"
								class="border-4 border-white w-28 h-28 absolute -bottom-14 left-2 rounded-full"
							/>
							<button
								@click="onChangeProfileImage"
								class="absolute h-10 w-10 hover:text-gray-200 rounded-full text-white text-lg -bottom-5 left-11"
							>
								<font-awesome-icon icon="fa-camera"></font-awesome-icon>
							</button>
							<input
								type="file"
								accept="image/*"
								id="profileImageInput"
								class="hidden"
								@change="previewProfileImage"
							/>
						</div>
					</div>

					<div class="flex flex-col p-2">
						<div
							class="mx-2 my-1 px-2 py-1 border border-gray-200 rounded text-gray hover:border-primary hover:text-primary"
						>
							<div class="text-sm">이름</div>
							<input
								type="text"
								:value="currentUser.email"
								class="text-black focus:outline-none"
							/>
						</div>
						<div
							class="mx-2 my-1 px-2 py-5 border border-gray-200 rounded text-gray hover:border-primary hover:text-primary"
						>
							<input
								type="text"
								placeholder="자기소개"
								class="text-black focus:outline-none"
							/>
						</div>
						<div
							class="mx-2 my-1 px-2 py-3 border border-gray-200 rounded text-gray hover:border-primary hover:text-primary"
						>
							<input
								type="text"
								placeholder="위치"
								class="text-black focus:outline-none"
							/>
						</div>
						<div
							class="mx-2 my-1 px-2 py-3 border border-gray-200 rounded text-gray hover:border-primary hover:text-primary"
						>
							<input
								type="text"
								placeholder="웹사이트"
								class="text-black focus:outline-none"
							/>
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
import { storage, db } from '../firebase';
import {
	getDownloadURL,
	ref as firebaseRef,
	uploadBytes,
} from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';

const emit = defineEmits(['close-modal']);

const currentUser = computed(() => store.state.user);

const backgroundImageData = ref(null);
const backgroundImage = ref(null);

const profileImageData = ref(null);
const profileImage = ref(null);

const onChangeBackgroundImage = () => {
	document.getElementById('backgroundImageInput').click();
};

const onChangeProfileImage = () => {
	document.getElementById('profileImageInput').click();
};

const previewBackgroundImage = event => {
	const file = event.target.files[0];
	let reader = new FileReader();
	backgroundImageData.value = file;
	reader.onload = function (event) {
		backgroundImage.value.src = event.target.result;
	};
	reader.readAsDataURL(file);
};

const previewProfileImage = event => {
	const file = event.target.files[0];
	let reader = new FileReader();
	profileImageData.value = file;
	reader.onload = function (event) {
		profileImage.value.src = event.target.result;
	};
	reader.readAsDataURL(file);
};

const onSaveProfile = async () => {
	if (!profileImageData.value && !backgroundImageData.value) {
		return;
	}

	if (profileImageData.value) {
		try {
			const uploadRef = firebaseRef(
				storage,
				`profile/${currentUser.value.uid}/profile`,
			);
			const uploadTask = await uploadBytes(uploadRef, profileImageData.value);
			const url = await getDownloadURL(uploadTask.ref);
			await updateDoc(doc(db, `users/${currentUser.value.uid}`), {
				profile_image_url: url,
			});
			store.commit('SET_PROFILE_IMAGE', url);
		} catch (error) {
			console.log(`profile image data error: ${error.message}`);
		}
	}

	if (backgroundImageData.value) {
		try {
			const uploadRef = firebaseRef(
				storage,
				`profile/${currentUser.value.uid}/background`,
			);
			const uploadTask = await uploadBytes(
				uploadRef,
				backgroundImageData.value,
			);
			const url = await getDownloadURL(uploadTask.ref);
			await updateDoc(doc(db, `users/${currentUser.value.uid}`), {
				background_image_url: url,
			});
			store.commit('SET_BACKGROUND_IMAGE', url);
		} catch (error) {
			console.log(`profile image data error: ${error.message}`);
		}
	}

	emit('close-modal');
};
</script>

<style lang="scss" scoped></style>
