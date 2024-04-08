/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { InlineEditor as InlineEditorBase } from '@ckeditor/ckeditor5-editor-inline';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { CKFinderUploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic, Underline, Strikethrough } from '@ckeditor/ckeditor5-basic-styles';
import { CKBox } from '@ckeditor/ckeditor5-ckbox';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { Heading } from '@ckeditor/ckeditor5-heading';
import {
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing,
	ImageResizeEditing,
	ImageResizeHandles
} from '@ckeditor/ckeditor5-image';
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

class ClassicEditor extends ClassicEditorBase {}
class InlineEditor extends InlineEditorBase {}

const builtinPlugins = [
	Essentials,
	CKFinderUploadAdapter,
	Autoformat,
	Bold,
	Underline,
	Strikethrough,
	Italic,
	CKBox,
	CKFinder,
	CloudServices,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Link,
	List,
	Paragraph,
	PasteFromOffice,
	PictureEditing,
	TextTransformation,
	Placeholder,
	Font,
	Alignment,
	SimpleUploadAdapter,
	ImageResizeEditing,
	ImageResizeHandles,
	Mention,
	Table,
	TableToolbar
];

const defaultConfig = {
	toolbar: {
		items: [
			'undo', 'redo',
			'|', 'heading', 'fontFamily',
			'|', 'bold', 'italic', 'underline', 'strikethrough', 'fontColor',
			'|', 'bulletedList', 'numberedList', 'alignment',
			'|', 'uploadImage', 'insertTable', 'link'
		]
	},
	image: {
		toolbar: [
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'|',
			'toggleImageCaption',
			'imageTextAlternative'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};

ClassicEditor.builtinPlugins = builtinPlugins;
ClassicEditor.defaultConfig = defaultConfig;
InlineEditor.builtinPlugins = builtinPlugins;
InlineEditor.defaultConfig = defaultConfig;

export default {
	ClassicEditor,
	InlineEditor
};
