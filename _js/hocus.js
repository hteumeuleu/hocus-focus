---
layout: null
permalink: "/assets/js/hocus.js"
---
class Timer {
	constructor() {
		this.value = 0;
		this.element = document.querySelector('.timer');
		this.running = false;
        this.time = 0;
        this.startTime = null;
        this.animationFrame = null;
        this.maxTime = (99 * 60 * 1000) + (59 * 1000) + 999;
	}
	start() {
		if(!this.running) {
			this.running = true;
			this.animationFrame = requestAnimationFrame(this.step.bind(this));
        }
	}
	stop() {
		this.running = false;
		cancelAnimationFrame(this.animationFrame);
	}
	step(timestamp) {
		if(this.running) {
			if (this.startTime === null) {
				this.startTime = timestamp;
			}
			if(this.time < this.maxTime) {
				this.time = timestamp - this.startTime;
				this.print();
				this.animationFrame = requestAnimationFrame(this.step.bind(this));
			}
		}
	}
	print() {
		this.element.innerText = this.getFormattedValue();
	}
	getFormattedValue() {
		let minutes = Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((this.time % (1000 * 60)) / 1000);
		let milliseconds = Math.floor(this.time - (minutes * 60 * 1000) - (seconds * 1000));
		minutes = minutes.toString().padStart(2, '0');
		seconds = seconds.toString().padStart(2, '0');
		milliseconds = milliseconds.toString().padStart(3, '0').substring(0, 2);
		return `${minutes}:${seconds}:${milliseconds}`;
	}
	save() {
		localStorage.setItem('score', this.value);
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
				if(this.classList.contains('is-finish')) {
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
	});

	const form = document.querySelector('form');
	form.addEventListener('submit', function(event) {
		event.preventDefault();
		event.stopPropagation();
		window.location = form.getAttribute('action');
	}, { once:true });

	const gameIconStart = document.querySelector('.is-start + *');
	gameIconStart.addEventListener('focus', function(event) {
		if(document.hasFocus()) {
			timer.start();
		}
	}, { once:true });

	const game = document.querySelector('.game');
	game.addEventListener('mousedown', function(event) {
		event.preventDefault();
		event.stopPropagation();
	});

	function customPreventDefault(event) {
		if(!(this.classList.contains('is-finish'))) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
});