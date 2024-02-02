import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const Editor: React.FC = () => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        const editerInstance = monaco.editor.create(monacoEl.current!, {
          value: `.border-radius (@radius: 5px) {
						border-radius: @radius;
						-moz-border-radius: @radius;
						-webkit-border-radius: @radius;
					  }

					  #header {
						.border-radius;
					  }`,
          language: 'css',
        });

        editerInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
          console.log(editerInstance.getValue());
          alert('save');
        });

        return editerInstance;
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  return <StyledEditer ref={monacoEl}></StyledEditer>;
};

const StyledEditer = styled.div`
  width: 100%;
  height: 100%;
`;
