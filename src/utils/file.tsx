import { FaCss3, FaFileAlt, FaHtml5 } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { LuFileJson } from 'react-icons/lu';
import { SiTypescript } from 'react-icons/si';

const getFileNameWithoutExtension = (fileName: string) => {
  return fileName.replace(/\.[^/.]+$/, '');
};

const getFileNameFromPath = (fileName: string) => {
  return fileName.split('/').at(-1);
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
    case 'scss':
    case 'less':
      return <FaCss3 fill="#42A5F5" />;

    case 'json':
      return <LuFileJson fill="#8BC34A" />;
    default:
      return <FaFileAlt fill="gray" />;
  }
};

const getFileLangFromName = (fileName: string) => {
  const fileExtentions = fileName.split('.').at(-1)?.toLocaleLowerCase();

  switch (fileExtentions) {
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'html':
      return 'html';
    case 'css':
    case 'sass':
    case 'scss':
    case 'less':
      return 'css';

    case 'json':
      return 'json';
    default:
      return 'custom';
  }
};

export {
  getFileIconFromName,
  getFileLangFromName,
  getFileNameFromPath,
  getFileNameWithoutExtension,
};
