import debounce from 'debounce';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type Props = {
  value: string;
  language: string;
  onChange: (value: string) => void;
  onSave: (value: string) => void;
  debounceMs?: number;
  theme?: string;
};

export const Editor: React.FC<Props> = ({
  onSave,
  language,
  value,
  onChange,
  debounceMs = 500,
  theme,
}) => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const _preventChangeEvent = useRef(false);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (editor && language) {
      const model = editor.getModel()!;
      monaco.editor.setModelLanguage(model, language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (editor) {
      if (value === editor.getValue()) {
        return;
      }
      _preventChangeEvent.current = true;
      editor.setValue(value);
      _preventChangeEvent.current = false;

      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        onSave(editor.getValue());
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (theme) {
      monaco.editor.setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        const editerInstance = monaco.editor.create(monacoEl.current!, {
          language,
          value,
        });

        const handlerEditorChange = debounce(() => {
          onChange(editerInstance.getValue());
        }, debounceMs);

        editerInstance.onDidChangeModelContent(() => {
          handlerEditorChange();
        });

        return editerInstance;
      });
    }

    return () => editor?.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monacoEl.current]);

  return <StyledEditer ref={monacoEl}></StyledEditer>;
};

const StyledEditer = styled.div`
  width: 100%;
  height: 100%;
`;
