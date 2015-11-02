import {Header} from './components/Header';

global.app = function () {
    let header = new Header();
    let root = document.getElementById('root');
    
    header.appendTo(root);
};