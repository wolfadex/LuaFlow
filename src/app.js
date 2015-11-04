import {Notification} from './components/Notification';
import {ProgressBar} from './components/ProgressBar';
import {Converter} from './libs/Converter';

window.LuaFlow = {};
let privateFn = {
    _startImport: function() {
        this.importInput.click();
    },
    _handleImport: function() {
        LuaFlow.progressBar.show({
                label: 'Reading File...'
            });
        LuaFlow.reader.readAsText(this.importInput.files[0]);
        this.importInput.value = '';
    },
    _importEnded: function() {
        LuaFlow.progressBar.hide();
    },
    _importFailed: function(error) {
        LuaFlow.notification.show({
                style: 'error',
                type: 'alert',
                title: 'Error',
                message: error
            });
    },
    _importSuccess: function() {
        LuaFlow.progressBar.show({
                label: 'Converting to AST...'
            });

        let result = LuaFlow.converter.luaToAST(LuaFlow.reader.result);

        LuaFlow.progressBar.hide();

        if (result.type && result.type === 'Chunk') {

        }
        else {
            LuaFlow.notification.show({
                    style: 'error',
                    type: 'alert',
                    title: 'Error',
                    message: result
                });
        }
    }
};

document.onreadystatechange = function() {
    if (document.readyState == 'complete') {
        this.root = document.getElementById('root');
        this.importInput = document.getElementById('import-input');

        // Add listeners
        document.getElementById('menu-file-import').addEventListener('click', privateFn._startImport.bind(this));
        this.importInput.addEventListener('change', privateFn._handleImport.bind(this));

        // Setup FileReader
        LuaFlow.reader = new FileReader();
        LuaFlow.reader.onerror = privateFn._importFailed.bind(this);
        LuaFlow.reader.onload = privateFn._importSuccess.bind(this);
        LuaFlow.reader.onloadend = privateFn._importEnded.bind(this);

        // Setup more
        LuaFlow.notification = new Notification();
        LuaFlow.progressBar = new ProgressBar();
        LuaFlow.converter = new Converter();
    }
}