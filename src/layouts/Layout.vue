<template>
	<!-- component 를 layout 으로 바꿔준다. -->
	<component :is="layout"></component>
</template>

<script>
// component tag 를 사용하려면 먼저 컴포넌트를 등록해야 한다.
// Syntax Sugar 에서는 import 하는것 만으로는 component 가 등록이 안되는듯?
import DefaultLayout from './DefaultLayout.vue';
import EmptyLayout from './EmptyLayout.vue';
export default {
	components: {
		DefaultLayout: DefaultLayout,
		EmptyLayout: EmptyLayout,
	},
};
</script>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const layout = computed(() => route.meta.layout || 'DefaultLayout');
</script>

<style lang="scss" scoped></style>
