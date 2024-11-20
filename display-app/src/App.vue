<template>
	<div class="container">
		<h2 v-if="animalVotes.dogs">Dogs: {{ animalVotes.dogs }}</h2>
		<h2 v-if="animalVotes.cats">Cats: {{ animalVotes.cats }}</h2>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import axios from 'axios';

const animalVotes = ref({
	dogs: null,
	cats: null,
});

onMounted(() => {
	testBackend();
	getAnimalVotes('dogs');
	getAnimalVotes('cats');
});

const testBackend = async () => {
	await axios.get('/api/data');
};

const getAnimalVotes = async (animal: 'dogs' | 'cats'): Promise<void> => {
	const response = await axios.get(`/api/data/${animal}`);

	animalVotes.value[animal] = response.data.value;
};
</script>

<style scoped>
.container {
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: center;
}
</style>
