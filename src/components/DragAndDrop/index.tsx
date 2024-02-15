import { PropsWithChildren, useState } from 'react';
import { TbDragDrop } from 'react-icons/tb';
import styled from 'styled-components';

type Props = {
  width: string;
  height: string;
  handlerDropFile: (file: File) => void;
};

export const DragAndDrop = (props: PropsWithChildren<Props>) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      props.handlerDropFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div onDragEnter={handleDrag} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {dragActive && (
        <DropContainer
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            width: props.width,
            height: props.height,
          }}
        >
          <h3>Drag and drop file here</h3>
          <TbDragDrop />
        </DropContainer>
      )}
      {props.children}
    </div>
  );
};

const DropContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: rgba(0, 255, 255, 0.8);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  border-radius: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;

  h3 {
    font-size: 2.5rem;
  }

  svg {
    width: 5rem;
    height: 5rem;
  }
`;
