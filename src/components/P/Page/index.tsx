import './style.scss';
import { FC, useLayoutEffect } from 'react';
import { BaseComponentProps } from '../../../common/types';

export type Props = BaseComponentProps & {
  iframeSrc?: string;
  title?: string;
  redirectUri?: string;
  redirectDelay?: number;
};

export const Page: FC<Props> = (props) => {
  const { title, iframeSrc, redirectDelay, redirectUri } = props;
  useLayoutEffect(() => {
    if (redirectUri) {
      setTimeout(() => {
        window.location.href = redirectUri;
      }, (redirectDelay || 0) * 1000);
    }
  }, []);
  return (
    <div>
      {title}
      {iframeSrc ? (
        <iframe
          className='h-[68vh]'
          src={iframeSrc}
          allow='camera;microphone;geolocation'></iframe>
      ) : null}
    </div>
  );
};

export default Page;
