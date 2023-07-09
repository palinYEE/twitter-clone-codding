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
	},
	// 새로고침 되어도 vuex 의 값이 없어지지 않게 해주는 플러그인
	plugins: [createPersistedState()],
});

export default store;
