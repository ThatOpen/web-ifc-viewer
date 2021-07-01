<script>
	import { onMount } from 'svelte';
	import { IfcViewerAPI } from 'web-ifc-viewer';

	let viewer, fileInput
	onMount(async() => {
		const container = document.getElementById("viewer-container");
	viewer = new IfcViewerAPI({container});
	viewer.addAxes();
	viewer.addGrid();
	viewer.setWasmPath("wasm/");
	})
	

	//Setup loader
	const loadIfc = async (event) => {
   		await viewer.loadIfc(event.target.files[0], true);
	}

</script>

<main>
	<aside class="side-menu" id="side-menu-left">
		<input style="display:none" type="file" accept=".ifc" on:change={(e)=>loadIfc(e)} bind:this={fileInput}>
		<button on:click={()=>fileInput.click()}><img src='static/folder-icon.svg' alt='load file' class='icon'></button>
		{#if viewer}
		<button on:click={viewer.toggleClippingPlanes()}><img src='static/section-plane-down.svg' alt='clipping panes' class='icon'></button>
		<button on:click={viewer.openDropboxWindow()}><img src='static/dropbox-icon.svg' alt='dropbox' class='icon'></button>
		{/if}
	</aside>
	<div id="viewer-container" 
		style="width: 100vw; height: 100vh" 
		on:mousemove={viewer.prepickIfcItem} 
		on:keydown={viewer.removeClippingPlane()}
		on:dblclick={viewer.addClippingPlane}>
	</div>
</main>

<style>
	.side-menu {
    	z-index: 1;
    	position: fixed;
    	background-color: #36393F;
    	height:100vh;
	}

	#side-menu-left {
	    width: 40px;
	}
</style>