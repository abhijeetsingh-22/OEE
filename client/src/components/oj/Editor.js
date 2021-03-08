import React, {useLayoutEffect, useRef} from 'react';
import * as monaco from 'monaco-editor';

function Editor() {
  useLayoutEffect(() => {
    console.log('the element passed is ', document.getElementById('editor'));
    const editor = monaco.editor.create(document.getElementById('editor'), {
      // value: this.$store.state.code[this.$store.state.language],
      minimap: {
        showSlider: false,
      },
      value: 'hello world',
      // language: langModes[this.$store.state.language],
      language: 'cpp',
      automaticLayout: true,
      dragAndDrop: true,
      fontFamily: 'Ubuntu Mono',
      // fontSize: this.$store.state.fontSize,
      // tabSize: this.$store.state.tabSize,
      parameterHints: true,
      renderIndentGuides: true,
      lineNumbersMinChars: 3,
      theme: 'vs-dark',
      scrollBeyondLastLine: true,
    });
  }, []);
  return (
    <div>
      <div id='editor' className='mt-5'></div>
    </div>
  );
}

export default Editor;
