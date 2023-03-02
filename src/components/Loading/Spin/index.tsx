import './style.scss';

import { FC } from 'react';
import { BaseComponentProps } from '../../../common/types';

export type Props = BaseComponentProps & {};

export const Spin: FC<Props> = (props) => {
  return <div className='spin-loader' />;
};

export default Spin;
