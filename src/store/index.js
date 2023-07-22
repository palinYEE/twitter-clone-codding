import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
	// 상태
	state() {
		return {
			user: null,
		};
	},
	mutations: {
		SET_USER: (state, user) => {
			state.user = user;
		},
		SET_BACKGROUND_IMAGE: (state, image) => {
			state.user.background_image_url = image;
		},
		SET_PROFILE_IMAGE: (state, image) => {
			state.user.profile_image_url = image;
		},
		SET_FOLLOW: (state, uid) => {
			state.user.followings.push(uid);
		},
		SET_UNFOLLOW: (state, uid) => {
			state.user.followings = state.user.followings.filter(u => u != uid);
		},
	},
	// 새로고침 되어도 vuex 의 값이 없어지지 않게 해주는 플러그인
	plugins: [createPersistedState()],
});

export default store;
