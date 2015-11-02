import {Notification} from './Notification';
import {ProgressBar} from './ProgressBar';

class Header {
    constructor() {
        this.html = [
        	'<div class="ui attached stackable menu" id="header-menu">',
				'<div class="header item">',
					'Lua Flow',
				'</div>',
				'<div class="ui simple dropdown item">',
					'File',
					'<i class="dropdown icon"></i>',
					'<div class="menu">',
						'<a id="menu-file-new" class="item">New</a>',
						'<a id="menu-file-import" class="item">Import</a>',
						'<input type="file" id="import-input" style="display: none;">',
						'<a id="menu-file-export" class="item">Export</a>',
						'<a id="menu-file-exit" class="item">Exit</a>',
					'</div>',
				'</div>',
				'<div class="ui simple dropdown item">',
					'Edit',
					'<i class="dropdown icon"></i>',
					'<div class="menu">',
						'<a class="item">Undo</a>',
						'<a class="item">Redo</a>',
						'<a class="item">Cut</a>',
						'<a class="item">Copy</a>',
						'<a class="item">Paste</a>',
					'</div>',
				'</div>',
				'<div class="ui simple dropdown item">',
					'View',
					'<i class="dropdown icon"></i>',
					'<div class="menu">',
						'<a class="item">Properties</a>',
						'<a class="item">Components</a>',
					'</div>',
				'</div>',
			'</div>'].join('');


    	this.reader = new FileReader();
    	this.reader.onerror = this._importFailed.bind(this);
    	this.reader.onload = this._importSuccess.bind(this);
    	this.reader.onloadend = this._importEnded.bind(this);

    	this.notification = new Notification();
    	this.progressBar = new ProgressBar();
    }

    appendTo(el) {
    	if (el && el.querySelectorAll('#header-menu').length < 1) {
    		el.innerHTML = this.html;
    		this.content = el.querySelectorAll('#header-menu')[0];
    		this.content.querySelectorAll('#menu-file-import')[0].addEventListener('click', this._startImport.bind(this));
    		this.importInput = this.content.querySelectorAll('#import-input')[0];
    		this.importInput.addEventListener('change', this._handleImport.bind(this));
    	}
    	else {

    	}
    }

    _startImport() {
    	this.importInput.click();
    }

    _handleImport() {
    	this.progressBar.show({
    			label: 'Reading File'
    		});
    	this.reader.readAsText(this.importInput.files[0]);
    	this.importInput.value = '';
    }

    _importEnded() {
    	this.progressBar.hide();
    }

    _importFailed(error) {
    	this.notification.show({
    			style: 'error',
    			type: 'alert',
    			title: 'Error',
    			message: error
    		});
    }

    _importSuccess(content) {
    	console.log('Success');
    }
}
export {Header}
