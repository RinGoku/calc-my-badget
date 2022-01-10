<script lang="ts">
	import type { Asset } from '@prisma/client';

	export let asset: Asset;
	let thisTitle = asset.title;
	let thisPrice = asset.price;
	let isEditMode = false;
	$: editON = () => {
		isEditMode = !isEditMode;
	};
	$: update = async () => {
		await fetch('/api/asset', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...asset, title: thisTitle, price: thisPrice })
		});
		editON();
	};
	$: deleteAsset = async () => {
		await fetch('/api/asset', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: asset.id })
		});
		editON();
	};
</script>

<div class="unit">
	<button type="button" on:click={editON}>編集</button>
	{#if !isEditMode}
		<div>{thisTitle}</div>
		<div>{thisPrice}円</div>
	{:else}
		<input type="text" bind:value={thisTitle} />
		<input type="number" bind:value={thisPrice} />
		<button type="button" on:click={update}>更新</button>
		<button type="button" on:click={deleteAsset}>削除</button>
	{/if}
</div>

<style>
	.unit {
		display: flex;
		column-gap: 8px;
	}
</style>
