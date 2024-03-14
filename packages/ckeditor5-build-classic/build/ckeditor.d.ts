/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { CKFinderUploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic, Underline, Strikethrough } from '@ckeditor/ckeditor5-basic-styles';
import { CKBox } from '@ckeditor/ckeditor5-ckbox';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, PictureEditing, ImageResizeEditing, ImageResizeHandles } from '@ckeditor/ckeditor5-image';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import Placeholder from './placeholder/placeholder.js';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Font } from '@ckeditor/ckeditor5-font';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
export default class ClassicEditor extends ClassicEditorBase {
    static builtinPlugins: (typeof TextTransformation | typeof Essentials | typeof SimpleUploadAdapter | typeof CKFinderUploadAdapter | typeof Paragraph | typeof Heading | typeof Autoformat | typeof Bold | typeof Italic | typeof Strikethrough | typeof Underline | typeof Image | typeof ImageCaption | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof ImageResizeEditing | typeof CloudServices | typeof CKBox | typeof CKFinder | typeof EasyImage | typeof Link | typeof List | typeof PasteFromOffice | typeof Alignment | typeof Font | typeof Mention | typeof Table | typeof TableToolbar | typeof ImageResizeHandles | typeof PictureEditing | typeof Placeholder)[];
    static defaultConfig: {
        toolbar: {
            items: string[];
        };
        image: {
            toolbar: string[];
        };
        language: string;
    };
}
