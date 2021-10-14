document.addEventListener('DOMContentLoaded', function() {
	const gameIcons = Array.from(document.querySelectorAll('button.icon'));
	gameIcons.forEach(function(gameIcon, index) {
		gameIcon.addEventListener('mousedown', function(event) {
			if(index !== 0) {
				event.preventDefault();
				event.stopPropagation();
			}
		});
		// gameIcon.addEventListener('click', function(event) {
		// 	event.preventDefault();
		// 	event.stopPropagation();
		// });
		gameIcon.addEventListener('keypress', function(event) {
			if(event.keyCode === 32 || event.keyCode === 13) {
				console.log(this.innerHTML);
			}
		});
		gameIcon.addEventListener('focus', function(event) {
			if(index == (gameIcons.length - 1)) {
				console.log("Game Over");
			}
		});
	});
	// history.pushState(null, '', '/');
});