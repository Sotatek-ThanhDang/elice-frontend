import { GoDotFill } from 'react-icons/go';

import { getFileIconFromName } from '@/utils/file';

import { ActionContainer, StyledClose, StyledTab } from './index.styles';

type Props = {
  name: string;
  path: string;
  isChange: boolean;
  isActive: boolean;
  onClick: (path: string) => void;
  onClose: (path: string) => void;
};

export default function FileTab(props: Props) {
  return (
    <StyledTab
      isActive={props.isActive}
      isChange={props.isChange}
      title={props.path}
      onClick={props.onClick.bind(null, props.path)}
    >
      {getFileIconFromName(props.name)}
      <p>{props.name}</p>

      <ActionContainer>
        {props.isChange && <GoDotFill fill='olive' />}
        <StyledClose
          onClick={(e) => {
            e.stopPropagation();
            props.onClose(props.path);
          }}
        />
      </ActionContainer>
    </StyledTab>
  );
}
