<script>
	import { listFiles, moveRename } from '$lib/fileSystem.js';

	let lrcPath;
	let musicPath;
	let feedback = 'Ready.';

	async function buttonImport() {
		let data;
		
		if (lrcPath && musicPath) {
			feedback = 'Getting files...';
			data = await listFiles(lrcPath, musicPath);
		} else if (!lrcPath) {
			feedback = "LRC path cannot be empty."
			return;
		} else {
			feedback = "Music path cannot be empty."
			return;
		}

		if (!data.status) {
			feedback = data.statusMessage;
			return;
		}

		if (data.lrcFiles.length !== 0 && data.musicFiles.length !== 0) {
			moveRename(data.lrcFiles, data.musicFiles, lrcPath, musicPath);
			feedback = 'Done.';
		} else if (data.lrcFiles.length === 0) {
			feedback = 'LRC directory is empty.';
			return;
		} else {
			feedback = 'Music directory is empty.';
			return;
		}
	}
</script>

<div
	class="absolute w-full h-full flex flex-col justify-around items-center -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 text-xl"
>
	<p class="text-4xl">LRC Rename</p>
	<div class="flex items-center">
		<input
			class="text-black rounded-xl p-2 select-none outline-none"
			type="text"
			name="lrcDir"
			id="lrc-dir"
			placeholder="LRC path"
			bind:value={lrcPath}
		/>
		<p class="px-4">To</p>
		<input
			class="text-black rounded-xl p-2 outline-none"
			type="text"
			name="musicDir"
			id="music-dir"
			placeholder="Music folder path"
			bind:value={musicPath}
		/>
	</div>
	<button class="bg-slate-500 rounded-xl p-2 w-1/4" on:click={buttonImport}>IMPORT</button>
</div>
<p class="mx-1 text-green-500">STATUS: {feedback}</p>
