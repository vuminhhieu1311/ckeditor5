export default class Placeholder extends Plugin {
    static get requires(): (typeof PlaceholderUI)[];
}
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import PlaceholderUI from './placeholderui';
