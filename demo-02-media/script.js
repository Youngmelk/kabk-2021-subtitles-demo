// 1. Get the audio element from the DOM

const audio = document.querySelector('video');

// 2. When you click the anywhere on the page, play the audio	

document.body.addEventListener('click', () => {
	audio.play();
})

// 3. When the audio starts playing, set up some function to handle 'onenter' and 'onexit' events

audio.addEventListener('play', () => {

	// get the track, there can be multiple but we're only using one, so just get the first one
	const tracks = audio.textTracks[0];

	// each individual subtitle/statement/sentence is called a 'cue'
	const cues = tracks.cues;

	for (const [index, cue] of Object.entries(cues)) {
		if(typeof(cue) === 'object'){
			cue.onenter = cueEnter;
			cue.onexit = cueExit;
		}
	}
});

// 4.
// this function will be called when each subtitle starts
// you can access the text of the current subtitle in `this.text`

function cueEnter(){

	let subtitleText = this.text;
	
	// 4a. Check if the subtitle text contains double brackets

	if(subtitleText.includes('[[')){


		// 4b. Get the media id that we want to switch on
		const matches = this.text.match(/\[\[(.*)\]\]/);
		if(matches[1]){

			// 4c. Show the media element with the matched ID
			document.querySelector('#'+matches[1]).style.display = 'block';

			// 4d. remove the media element text from the subtitle
			subtitleText = subtitleText.replace(matches[0], '');
		}
		
	}
	document.querySelector('#subtitle-container').innerText = subtitleText;
}

// 5.
// this function will be called when each subtitle ends
// so these two functions will be called repeatedly, for each subtitle in your track.

function cueExit(){
	document.querySelector('#subtitle-container').innerText = '';
}



