import './style.scss';
import { FC, useLayoutEffect } from 'react';
import { BaseComponentProps } from '../../../common/types';
import { PadletBox } from '../Padlet';

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
      {iframeSrc ? <PadletBox url={iframeSrc} /> : null}
    </div>
  );
};
