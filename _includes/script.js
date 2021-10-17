class Timer {
	// Loosely based on https://codepen.io/_Billy_Brown/pen/dbJeh
	constructor() {
		this.value = 0;
		this.element = document.querySelector('.timer');
		this.running = false;
        this.times = [ 0, 0, 0 ];
	}
	start() {
		if(!this.time) {
			this.time = performance.now();
		}
		if(!this.running) {
			this.running = true;
			requestAnimationFrame(this.step.bind(this));
        }
	}
	stop() {
		this.running = false;
	}
	step(timestamp) {
		if(this.running) {
			this.calculate(timestamp);
			this.time = timestamp;
			this.print();
			requestAnimationFrame(this.step.bind(this));
		}
	}
	calculate(timestamp) {
		var diff = timestamp - this.time;
		// Hundredths of a second are 100 ms
		this.times[2] += diff / 10;
		// Seconds are 100 hundredths of a second
		if (this.times[2] >= 100) {
			this.times[1] += 1;
			this.times[2] -= 100;
		}
		// Minutes are 60 seconds
		if (this.times[1] >= 60) {
			this.times[0] += 1;
			this.times[1] -= 60;
		}
	}
	print() {
		this.element.innerText = this.getFormattedValue();
	}
	getFormattedValue() {
		return `\
${this.times[0].toString().padStart(2, '0')}:\
${this.times[1].toString().padStart(2, '0')}:\
${Math.floor(this.times[2]).toString().padStart(2, '0')}`;
	}
}

document.addEventListener('DOMContentLoaded', function() {
	const timer = new Timer();
	const gameIcons = Array.from(document.querySelectorAll('button.icon'));
	gameIcons.forEach(function(gameIcon, index) {
		gameIcon.addEventListener('mousedown', customPreventDefault);
		gameIcon.addEventListener('click', customPreventDefault);
		gameIcon.addEventListener('keypress', function(event) {
			if(event.keyCode === 32 || event.keyCode === 13) {
				if(this.classList.contains('is-over') || this.classList.contains('is-finish')) {
					timer.stop();
				} else {
					this.classList.remove('is-error');
					this.classList.add('is-error');
					this.addEventListener('animationend', function() {
						this.classList.remove('is-error');
					}, { once:true });
				}
			}
		});
		gameIcon.addEventListener('focus', function(event) {
			if(this.classList.contains('is-over')) {
			}
		});
	});

	const form = document.querySelector('form');
	if(form) {
		form.addEventListener('submit', function(event) {
			event.preventDefault();
			event.stopPropagation();
			window.location = form.getAttribute('action');
		}, { once:true });
	}

	const gameIconStart = document.querySelector('.is-start + *');
	gameIconStart.addEventListener('focus', function(event) {
		if(document.hasFocus()) {
			timer.start();
		}
	}, { once:true });

	function customPreventDefault(event) {
		if(!(this.classList.contains('is-finish'))) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
});

document.addEventListener('mousedown', function() {
	event.preventDefault();
	event.stopPropagation();
});