class ProgressBar {
    constructor() {
    	this.body = [
    		'<div id="loading-modal" class="ui dimmer modals page transition hidden" style="display: block !important;">',
			'</div>'].join('');

        this.bar = [
        	'<div class="ui indicating progress active" data-percent="0">',
				'<div class="bar" style="transition-duration: 300ms; width: 30%;"></div>',
				'<div class="label"></div>',
			'</div>'].join('');

		this.wheel = [
			'<div class="ui active dimmer">',
				'<div class="ui text loader"></div>',
			'</div>'].join('');

		if (!document.body.querySelectorAll('#loading-modal')[0]) {
			document.body.children[0].insertAdjacentHTML('beforebegin', this.body);
		}

		this.loadingModal = document.body.querySelectorAll('#loading-modal')[0];
    }

    show({percent, label}) {
    	if (this.loadingModal.className.indexOf('active') < 0) {
	    	this.loadingModal.innerHTML = '<div class="ui basic modal">' + (percent === undefined ? this.wheel : this.bar) + '</div>';

	    	if (label) {
	    		this.loadingModal.querySelectorAll((percent === undefined ? '.text' : '.label'))[0].innerHTML = label;
	    	}

	    	if (percent !== undefined) {
	    		this.loadingModal.querySelectorAll('.progress')[0].setAttribute('data-percent', percent);
	    	}

	    	this.loadingModal.classList.add('active');
	        this.loadingModal.classList.remove('hidden');
	        this.loadingModal.classList.add('visible');
	        this.loadingModal.querySelectorAll('.modal')[0].classList.add('active');
	    }
    }

    update({percent, label}) {
    	this.loadingModal.querySelectorAll('.progress')[0].setAttribute('data-percent', percent);

    	if (label) {
    		this.loadingModal.querySelectorAll((percent === undefined ? '.text' : '.label'))[0].innerHTML = label;
    	}
    }

    hide() {
    	this.loadingModal.classList.remove('active');
        this.loadingModal.classList.remove('visible');
        this.loadingModal.classList.add('hidden');
    	this.loadingModal.innerHTML = '';
    }
}

export {ProgressBar}
