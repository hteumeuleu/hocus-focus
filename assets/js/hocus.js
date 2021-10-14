document.addEventListener('DOMContentLoaded', function() {
	const gameIcons = Array.from(document.querySelectorAll('.game-icon'));
	gameIcons.forEach(function(gameIcon) {
		gameIcon.addEventListener('mousedown', function(event) {
			event.preventDefault();
			event.stopPropagation();
		});
		// gameIcon.addEventListener('click', function(event) {
		// 	console.log(this.innerHTML);
		// });
		gameIcon.addEventListener('keypress', function(event) {
			if(event.keyCode === 32 || event.keyCode === 13) {
				console.log(this.innerHTML);
			}
		});
	});
});