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
		return `${minutes}:${seconds}.${milliseconds}`;
	}
	get() {
		return this.time;
	}
}

class Score {
	constructor() {
		this.key = 'score';
	}
	get() {
		return sessionStorage.getItem(this.key);
	}
	save(value) {
		let score = this.get() || 0;
		score = parseFloat(score);
		score += value;
		sessionStorage.setItem(this.key, score);
	}
}

document.addEventListener('DOMContentLoaded', function() {
	const timer = new Timer();
	const score = new Score();

	if(score.get() === null && window.location.pathname !== '/') {
		window.location.href = '/';
	}

	const gameIcons = Array.from(document.querySelectorAll('button.icon'));
	gameIcons.forEach(function(gameIcon, index) {
		gameIcon.addEventListener('mousedown', customPreventDefault);
		gameIcon.addEventListener('click', function(event) {
			customPreventDefault(event);
			if(this.classList.contains('is-finish')) {
				customSubmit(this);
			}
		});
		gameIcon.addEventListener('keypress', function(event) {
			customPreventDefault(event);
			if(event.keyCode === 32 || event.keyCode === 13) {
				if(this.classList.contains('is-finish')) {
					this.classList.add('is-good');
					timer.stop();
					customSubmit(this);
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
		customPreventDefault(event);
		score.save(timer.get());
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
		customPreventDefault(event);
	});

	function customPreventDefault(event) {
		event.preventDefault();
		event.stopPropagation();
	}

	function customSubmit(submitter) {
		let event = new Event('submit', {
			'bubbles'    : true,
			'cancelable' : true
		});
		if(typeof SubmitEvent !== 'undefined') {
			event = new SubmitEvent('submit', { submitter: submitter, cancelable: true });
		}
		submitter.form.dispatchEvent(event);
	}

	// Add specific instructions for Safari
	const isSafari = /^((?!chrome|android|edge).)*safari/i.test(navigator.userAgent);
	if(isSafari) {
		const instructionsItems = document.querySelectorAll('.instructions p');
		instructionsItems.forEach(function(item, index) {
			if(item.classList.contains('is-key-next') || item.classList.contains('is-key-previous')) {
				item.innerHTML = "<kbd>OPTION</kbd> + " + item.innerHTML;
			}
		});
	}

	// Keyboard simulation for touch devices
	if(window.matchMedia('(pointer:coarse)').matches) {
		const instructions = document.querySelector('.instructions');
		instructions.addEventListener('mousedown', function(event) {
			event.preventDefault();
			event.stopPropagation();
		});

		const keyNext = document.querySelector('.is-key-next');
		keyNext.addEventListener('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			let next = document.activeElement.nextElementSibling;
			if(next && next.getAttribute('tabindex') == "-1") {
				next = next.nextElementSibling;
			}
			if(next == null) {
				document.querySelector('.game button:first-of-type').focus();
			} else {
				next.focus();
			}
		});

		const keyPrevious = document.querySelector('.is-key-previous');
		keyPrevious.addEventListener('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			let previous = document.activeElement.previousElementSibling;
			if(previous.getAttribute('tabindex') == "-1") {
				previous = previous.previousElementSibling;
			}
			if(previous == null || previous.tagName.toLowerCase() !== 'button') {
				document.querySelector('.game button:last-of-type').focus();
			} else {
				previous.focus();
			}
		});

		const keyValidate = document.querySelector('.is-key-validate');
		keyValidate.addEventListener('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			document.activeElement.dispatchEvent(new KeyboardEvent('keypress', {'keyCode':'32'}));
		});
	}
});