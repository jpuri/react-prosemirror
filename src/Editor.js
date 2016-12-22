import React, { Component } from 'react';
const {EditorState} = require("prosemirror-state")
const {MenuBarEditorView} = require("prosemirror-menu")
const {DOMParser, Schema} = require("prosemirror-model")
const {schema: baseSchema} = require("prosemirror-schema-basic")
const {exampleSetup} = require("prosemirror-example-setup")
import '../node_modules/prosemirror-menu/style/menu.css';
import '../node_modules/prosemirror-view/style/prosemirror.css';

class Editor extends Component {

  componentDidMount() {
    const schema = new Schema({
      nodes: baseSchema.nodeSpec,
      marks: baseSchema.markSpec,
    });
    let content = document.querySelector("#content");
    let view = new MenuBarEditorView(document.querySelector("#editor"), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(schema).parse(content),
        plugins: exampleSetup({schema})
      }),
      onAction(action) { view.updateState(view.editor.state.applyAction(action)) },
    });
    window.view = view.editor;
  }

  render() {
    return (
      <div>
        <div id="editor"></div>
        <div id="content" style={{ display: 'none' }}>
          <h2>Demonstration Text</h2>
          <p>A ProseMirror document is based on a schema.</p>
        </div>
      </div>
    );
  }
}

export default App;
