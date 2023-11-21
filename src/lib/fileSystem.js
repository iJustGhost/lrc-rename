// place files you want to import through the `$lib` alias in this folder.

import { readDir, copyFile } from '@tauri-apps/api/fs';

export async function listFiles(lrcDir, musicDir) {
	let lrcFiles = [];
	let musicFiles = [];
	let files;

	try {
		files = await readDir(lrcDir);
	} catch (e) {
		console.log(e);
		return { lrcFiles, musicFiles, status: false, statusMessage: 'Error with LRC directory...' };
	}

	for (const entry of files) {
		if (entry.name.split('.')[entry.name.split('.').length - 1] === 'lrc') {
			lrcFiles.push(entry.name);
		}
	}

	try {
		files = await readDir(musicDir);
	} catch (e) {
		console.log(e);
		return { lrcFiles, musicFiles, status: false, statusMessage: 'Error with Music directory...' };
	}

	for (const entry of files) {
		if (
			entry.name.split('.')[entry.name.split('.').length - 1] === 'flac' ||
			entry.name.split('.')[entry.name.split('.').length - 1] === 'mp3' ||
			entry.name.split('.')[entry.name.split('.').length - 1] === 'ogg' ||
			entry.name.split('.')[entry.name.split('.').length - 1] === 'wav'
		) {
			musicFiles.push(entry.name);
		}
	}
    
	return { lrcFiles, musicFiles, status: true, statusMessage: 'Success.' };
}

export async function moveRename(lrcFiles, musicFiles, lrcDir, musicDir) {
	for (const music of musicFiles) {
		for (const lrc of lrcFiles) {
			if (music.split('.')[0] === lrc.split('.')[0]) {
				await copyFile(
					lrcDir + '\\' + lrc,
					musicDir + '\\' + music.replace(music.split('.')[music.split('.').length - 1], 'lrc')
				);
				break;
			}
		}
	}
}
