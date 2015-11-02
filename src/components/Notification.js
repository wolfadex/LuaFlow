class Notification {
    constructor() {
    	this.styles = {
    			info: 'blue',
    			error: 'red',
    			warning: 'yellow'
    		};
    	this.types = {
    			alert: 'alert',
    			confirmation: 'confirmation'
    		};

        this.body = [
            '<div id="notification-modal" class="ui dimmer modals page transition hidden" style="display: block !important;">',
            '</div>'].join('');

		if (!document.body.querySelectorAll('#notification-modal')[0]) {
			document.body.children[0].insertAdjacentHTML('beforebegin', this.body);
		}

		this.notification = document.body.querySelectorAll('#notification-modal')[0];
    }

    show({style = 'info', type = 'alert', message = 'Content', title = 'Message', positive, negative}) {
    	this.style = this.styles[style] || this.styles['info'];
    	this.type = this.types[type] || this.types['alert'];
    	this.title = title;
    	this.message = message;
        this.positive = positive;
        this.negative = negative;

    	this.notification.innerHTML = '<div class="ui basic modal">' + this._getTitle() + this._getContent() + this._getButtons() + '</div>';

        if (this.type === 'confirmation') {
            this.notification.querySelectorAll('.red')[0].addEventListener('click', this._negative.bind(this));
            this.notification.querySelectorAll('.green')[0].addEventListener('click', this._positive.bind(this));
        }
        else {
            this.notification.querySelectorAll('.button')[0].addEventListener('click', this._positive.bind(this));
        }

    	this.notification.classList.add('active');
        this.notification.classList.remove('hidden');
        this.notification.classList.add('visible');
        this.notification.querySelectorAll('.modal')[0].classList.add('active');
        // this.notification.querySelectorAll('.modal')[0].classList.remove('hidden');
        // this.notification.querySelectorAll('.modal')[0].classList.add('visible');
    }

    hide() {
    	this.notification.classList.remove('active');
        this.notification.classList.remove('visible');
        this.notification.classList.add('hidden');
        this.notification.querySelectorAll('.modal')[0].classList.remove('active');
        // this.notification.querySelectorAll('.modal')[0].classList.remove('visible');
        // this.notification.querySelectorAll('.modal')[0].classList.add('hidden');
    	this.notification.innerHTML = '';
    }

    _positive() {
        this.hide();

        if (this.positive) {
            this.positive();
        }
    }

    _negative() {
        this.hide();

        if (this.negative) {
            this.negative();
        }
    }

    _getTitle() {
        let title = '<div id="notification-title" class="ui icon header ' + this.style + '">' + this.title + '</div>';
    	return title;
    }

    _getContent() {
        let content =
            '<div class="image content">' +
                '<div class="description">' +
                    '<p id="notification-message" class="">' + this.message + '</p>' +
                '</div>' +
            '</div>';
    	return content;
    }

    _getButtons() {
    	let buttons =
    		'<div class="actions">' +
    			'<div id="notification-buttons" class="ui inverted buttons">';

    	if (this.type === 'confirmation') {
    		buttons +=
    			'<div class="ui red basic inverted button">' +
					'<i class="remove icon"></i>' +
					'No' +
				'</div>' +
				'<div class="ui green basic inverted button">' +
					'<i class="checkmark icon"></i>' +
					'Yes' +
				'</div>';
    	}
    	else if (this.type === 'alert') {
    		buttons +=
    			'<div class="ui basic inverted button">' +
					'Ok' +
				'</div>';
    	}

    	buttons += '</div></div>';

    	return buttons;
    }
}
export {Notification}
