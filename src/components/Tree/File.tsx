import { FaCss3, FaFile, FaHtml5 } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { LuFileJson } from 'react-icons/lu';
import { SiTypescript } from "react-icons/si";
import styled from 'styled-components';

type Props = {
  fileName: string;
  onClick: () => void;
};

const getFileIconFromName = (fileName: string) => {
  const fileExtentions = fileName.split('.').at(-1)?.toLocaleLowerCase();

  switch (fileExtentions) {
    case 'js':
    case 'jsx':
      return <IoLogoJavascript fill="#FFCA28" />;
    case 'ts':
    case 'tsx':
      return <SiTypescript fill="#0588D1" />;
    case 'html':
      return <FaHtml5 fill="#E44D26" />;
    case 'css':
    case 'sass':
    case 'less':
      return <FaCss3 fill="#42A5F5" />;

    case 'json':
      return <LuFileJson fill="#8BC34A" />;
    default:
      return <FaFile fill="gray" />;
  }
};

const TreeFile = (props: Props) => {
  return (
    <StyledFile onClick={props.onClick}>
      {getFileIconFromName(props.fileName)}
      <p>{props.fileName}</p>
    </StyledFile>
  );
};

const StyledFile = styled.div`
  display: flex;
  padding-left: calc(var(--svg-width) + var(--icon-gap));
  gap: var(--icon-gap);

  &:hover {
    background-color: lightblue;
  }
`;

export default TreeFile;
