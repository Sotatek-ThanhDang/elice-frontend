import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
  getWorker(_: unknown, label: string) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

monaco.editor.defineTheme('dark', {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: {
    // 'editor.foreground': '#CBCBCB',
    // 'editor.background': '#202020',
    // 'editorCursor.foreground': '#8B0000',
    // 'editor.lineHighlightBackground': '#0000FF20',
    // 'editorLineNumber.foreground': '#008800',
    // 'editor.selectionBackground': '#3A3D41',
    // 'editor.inactiveSelectionBackground': '#88000015',
  },
});

monaco.editor.setTheme('dark');

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
