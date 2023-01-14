import './style.scss';
import { FC } from 'react';
import { BaseComponentProps } from '../../common/types';

export type Props = BaseComponentProps & {
  url: string;
};

export const PadletBox: FC<Props> = (props) => {
  const { url } = props;

  return (
    <div className='padlet-embed'>
      <p>
        <iframe
          src={url}
          frameBorder='0'
          allow='camera;microphone;geolocation'></iframe>
      </p>
    </div>
  );
};
