// https://codepen.io/chris22smith/pen/PEmNBX

import classNames from 'classnames';
import { FC, useEffect, useRef, useState, useContext } from 'react';
import './style.scss';
import { StoredContext } from '../../../context';
import { Progress } from '../../../common/types';

export type Props = {};

export const SwirlyProgress: FC<Props> = (props) => {
  const [curProgress, setCurProgress] = useState<Progress>({
    active: 0,
    total: 0,
  });
  const [isGrow, setIsGrow] = useState<boolean>(false);
  const [animationPlayState, setAnimationPlayState] = useState<string>('paused');
  const { progress } = useContext(StoredContext);

  useEffect(() => {
    if (!ref.current) return;

    // create nested div as much as progress, most 4
    const divs: string[] = [];
    for (let i = 0; i < Math.min(1, (curProgress.active / curProgress.total) * 4); i++) {
      divs.splice(0, 0, '<div>');
      divs.push('</div>');
    }
    ref.current.innerHTML = divs.join('');

    // if progress grow, the circle clockwise
    // if progress shrink, the circle counterclockwise
    if (progress.active === 0) {
      return;
    }

    setIsGrow((curProgress.active / curProgress.total || 0) < progress.active / progress.total);
    setCurProgress(progress);
    setAnimationPlayState('running');

    setTimeout(() => {
      setAnimationPlayState('paused');
    }, 1000);
  }, [progress]);

  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className={classNames('swirly-progress')}
      style={{ '--progress': curProgress.active / curProgress.total || 0.1 } as React.CSSProperties}>
      <div
        className={classNames('circle', {
          playing: animationPlayState === 'running',
          reverse: curProgress.active !== 0 && !isGrow,
        })}
        ref={ref}></div>
    </div>
  );
};

export default SwirlyProgress;
