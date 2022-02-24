/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import VirtualTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/virtualtesteditor';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import UndoEditing from '@ckeditor/ckeditor5-undo/src/undoediting';
import { getData, setData } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';
import DocumentListPropertiesEditing from '../../src/documentlistproperties/documentlistpropertiesediting';
import { modelList } from '../documentlist/_utils/utils';

describe( 'DocumentListPropertiesEditing', () => {
	let editor, model;

	it( 'should have pluginName', () => {
		expect( DocumentListPropertiesEditing.pluginName ).to.equal( 'DocumentListPropertiesEditing' );
	} );

	describe( 'config', () => {
		beforeEach( async () => {
			editor = await VirtualTestEditor.create( {
				plugins: [ DocumentListPropertiesEditing ]
			} );
		} );

		afterEach( () => {
			return editor.destroy();
		} );

		it( 'should have default values', () => {
			expect( editor.config.get( 'list' ) ).to.deep.equal( {
				properties: {
					styles: true,
					startIndex: false,
					reversed: false
				}
			} );
		} );

		it( 'should be loaded', () => {
			expect( editor.plugins.get( DocumentListPropertiesEditing ) ).to.be.instanceOf( DocumentListPropertiesEditing );
		} );
	} );

	describe( 'listStyle', () => {
		beforeEach( async () => {
			editor = await VirtualTestEditor.create( {
				plugins: [ Paragraph, DocumentListPropertiesEditing, UndoEditing ],
				list: {
					properties: { styles: true, startIndex: false, reversed: false }
				}
			} );

			model = editor.model;
		} );

		afterEach( () => {
			return editor.destroy();
		} );

		describe( 'schema rules', () => {
			it( 'should allow set `listStyle` on the `paragraph`', () => {
				expect( model.schema.checkAttribute( [ '$root', 'paragraph' ], 'listStyle' ) ).to.be.true;
			} );

			it( 'should not allow set `listReversed` on the `paragraph`', () => {
				expect( model.schema.checkAttribute( [ '$root', 'paragraph' ], 'listReversed' ) ).to.be.false;
			} );

			it( 'should not allow set `listStart` on the `paragraph`', () => {
				expect( model.schema.checkAttribute( [ '$root', 'paragraph' ], 'listStart' ) ).to.be.false;
			} );
		} );

		describe( 'post-fixer', () => {
			it( 'should ensure that all item in a single list have the same `listStyle` attribute', () => {
				setData( model, modelList( `
					* 1. {style:circle}
					* 2.
					* 3. {style:square}
					* 4.
					  # 4.1. {style:default}
					  # 4.2. {style:upper-roman}
					  # 4.3. {style:decimal}
					    # 4.3.1. {style:decimal}
					    # 4.3.2. {style:upper-roman}
					* 5. {style:disc}
				` ) );

				expect( getData( model, { withoutSelection: true } ) ).to.equalMarkup( modelList( `
					* 1. {style:circle}
					* 2.
					* 3.
					* 4.
					  # 4.1. {style:default}
					  # 4.2.
					  # 4.3.
					    # 4.3.1. {style:decimal}
					    # 4.3.2.
					* 5.
				` ) );
			} );

			it( 'should ensure that all list item have the same `listStyle` after removing a block between them', () => {
				setData( model,
					'<paragraph listItemId="01" listStyle="circle" listType="bulleted">1.</paragraph>' +
					'<paragraph listItemId="02" listStyle="circle" listType="bulleted">2.</paragraph>' +
					'<paragraph>Foo</paragraph>' +
					'<paragraph listItemId="03" listStyle="square" listType="bulleted">3.</paragraph>' +
					'<paragraph listItemId="04" listStyle="square" listType="bulleted">4.</paragraph>'
				);

				model.change( writer => {
					writer.remove( model.document.getRoot().getChild( 2 ) );
				} );

				expect( getData( model, { withoutSelection: true } ) ).to.equalMarkup(
					'<paragraph listItemId="01" listStyle="circle" listType="bulleted">1.</paragraph>' +
					'<paragraph listItemId="02" listStyle="circle" listType="bulleted">2.</paragraph>' +
					'<paragraph listItemId="03" listStyle="circle" listType="bulleted">3.</paragraph>' +
					'<paragraph listItemId="04" listStyle="circle" listType="bulleted">4.</paragraph>'
				);
			} );
		} );
	} );

	describe( 'listReversed', () => {
		beforeEach( async () => {
			editor = await VirtualTestEditor.create( {
				plugins: [ Paragraph, DocumentListPropertiesEditing, UndoEditing ],
				list: {
					properties: { styles: false, startIndex: false, reversed: true }
				}
			} );

			model = editor.model;
		} );

		afterEach( () => {
			return editor.destroy();
		} );

		describe( 'schema rules', () => {
			it( 'should not allow set `listStyle` on the `paragraph`', () => {
				expect( model.schema.checkAttribute( [ '$root', 'paragraph' ], 'listStyle' ) ).to.be.false;
			} );

			it( 'should not allow set `listReversed` on the `paragraph`', () => {
				expect( model.schema.checkAttribute( [ '$root', 'paragraph' ], 'listReversed' ) ).to.be.true;
			} );

			it( 'should allow set `listStart` on the `paragraph`', () => {
				expect( model.schema.checkAttribute( [ '$root', 'paragraph' ], 'listStart' ) ).to.be.false;
			} );
		} );

		describe( 'post-fixer', () => {
			it( 'should ensure that all item in a single list have the same `listReversed` attribute', () => {
				setData( model, modelList( `
					# 1. {reversed:true}
					# 2.
					# 3. {reversed:false}
					# 4.
					  # 4.1. {reversed:false}
					  # 4.2. {reversed:true}
					  # 4.3. {reversed:false}
					    # 4.3.1. {reversed:true}
						# 4.3.2. {reversed:false}
					# 5. {reversed:true}
				` ) );

				expect( getData( model, { withoutSelection: true } ) ).to.equalMarkup( modelList( `
					# 1. {reversed:true}
					# 2.
					# 3.
					# 4.
					  # 4.1. {reversed:false}
					  # 4.2.
					  # 4.3.
					    # 4.3.1. {reversed:true}
					    # 4.3.2.
					# 5.
				` ) );
			} );

			it( 'should ensure that all list item have the same `listReversed` after removing a block between them', () => {
				setData( model,
					'<paragraph listItemId="01" listReversed="true" listType="numbered">1.</paragraph>' +
					'<paragraph listItemId="02" listReversed="true" listType="numbered">2.</paragraph>' +
					'<paragraph>Foo</paragraph>' +
					'<paragraph listItemId="03" listReversed="false" listType="numbered">3.</paragraph>' +
					'<paragraph listItemId="04" listReversed="false" listType="numbered">4.</paragraph>'
				);

				model.change( writer => {
					writer.remove( model.document.getRoot().getChild( 2 ) );
				} );

				expect( getData( model, { withoutSelection: true } ) ).to.equalMarkup(
					'<paragraph listItemId="01" listReversed="true" listType="numbered">1.</paragraph>' +
					'<paragraph listItemId="02" listReversed="true" listType="numbered">2.</paragraph>' +
					'<paragraph listItemId="03" listReversed="true" listType="numbered">3.</paragraph>' +
					'<paragraph listItemId="04" listReversed="true" listType="numbered">4.</paragraph>'
				);
			} );
		} );
	} );

	describe( 'listStart', () => {
		beforeEach( async () => {
			editor = await VirtualTestEditor.create( {
				plugins: [ Paragraph, DocumentListPropertiesEditing, UndoEditing ],
				list: {
					properties: { styles: false, startIndex: true, reversed: false }
				}
			} );

			model = editor.model;
		} );

		afterEach( () => {
			return editor.destroy();
		} );

		describe( 'schema rules', () => {
			it( 'should allow set `listStyle` on the `paragraph`', () => {
				expect( model.schema.checkAttribute( [ '$root', 'paragraph' ], 'listStyle' ) ).to.be.false;
			} );

			it( 'should not allow set `listReversed` on the `paragraph`', () => {
				expect( model.schema.checkAttribute( [ '$root', 'paragraph' ], 'listReversed' ) ).to.be.false;
			} );

			it( 'should not allow set `listStart` on the `paragraph`', () => {
				expect( model.schema.checkAttribute( [ '$root', 'paragraph' ], 'listStart' ) ).to.be.true;
			} );
		} );

		describe( 'post-fixer', () => {
			it( 'should ensure that all item in a single list have the same `listStart` attribute', () => {
				setData( model, modelList( `
					# 1. {start:2}
					# 2.
					# 3. {start:5}
					# 4.
					  # 4.1. {start:3}
					  # 4.2. {start:7}
					  # 4.3. {start:1}
					    # 4.3.1. {start:42}
					    # 4.3.2. {start:1}
					# 5. {start:8}
				` ) );

				expect( getData( model, { withoutSelection: true } ) ).to.equalMarkup( modelList( `
					# 1. {start:2}
					# 2.
					# 3.
					# 4.
					  # 4.1. {start:3}
					  # 4.2.
					  # 4.3.
					    # 4.3.1. {start:42}
					    # 4.3.2.
					# 5.
				` ) );
			} );

			it( 'should ensure that all list item have the same `listStart` after removing a block between them', () => {
				setData( model,
					'<paragraph listItemId="01" listStart="2" listType="numbered">1.</paragraph>' +
					'<paragraph listItemId="02" listStart="2" listType="numbered">2.</paragraph>' +
					'<paragraph>Foo</paragraph>' +
					'<paragraph listItemId="03" listStart="7" listType="numbered">3.</paragraph>' +
					'<paragraph listItemId="04" listStart="7" listType="numbered">4.</paragraph>'
				);

				model.change( writer => {
					writer.remove( model.document.getRoot().getChild( 2 ) );
				} );

				expect( getData( model, { withoutSelection: true } ) ).to.equalMarkup(
					'<paragraph listItemId="01" listStart="2" listType="numbered">1.</paragraph>' +
					'<paragraph listItemId="02" listStart="2" listType="numbered">2.</paragraph>' +
					'<paragraph listItemId="03" listStart="2" listType="numbered">3.</paragraph>' +
					'<paragraph listItemId="04" listStart="2" listType="numbered">4.</paragraph>'
				);
			} );
		} );
	} );
} );
