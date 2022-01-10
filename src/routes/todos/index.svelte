<script context="module" lang="ts">
	import { enhance } from '$lib/form';
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/api/asset.json', {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.ok) {
			const todos = await res.json();

			return {
				props: { todos }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { Debt, Asset } from '@prisma/client';
	import Unit from '$lib/Unit.svelte';

	let assetName = '';
	let assetPrice = 0;
	const addAsset = async () => {
		if (assetName.length === 0) {
			return;
		}
		const res = await fetch('/api/asset.json', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: assetName,
				price: assetPrice
			})
		});
	};
	export let todos: Asset[];
	$: {
		console.log(todos);
	}
</script>

<svelte:head>
	<title>Todos</title>
</svelte:head>

<div class="todos">
	<h1>Todos</h1>
	<label for="assetName">資産名<input type="text" id="assetName" bind:value={assetName} /></label>
	<label for="assetPrice">金額<input type="number" id="assetPrice" bind:value={assetPrice} /></label
	>
	<button type="button" on:click={addAsset}>追加</button>
	{#each todos as todo (todo.id)}
		<Unit asset={todo} />
	{/each}
	<div>合計: {todos.reduce((a, c) => a + c.price, 0)}円</div>
</div>
