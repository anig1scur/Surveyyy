import classNames from 'classnames';
import { FC, useEffect, useRef, useState, useContext, useLayoutEffect } from 'react';
import './style.scss';
import { StoredContext } from '../../../context';
import ProgressBar from 'progressbar.js';

export type Props = {};

export const SpiralProgress: FC<Props> = (props) => {
  const ref = useRef<SVGPathElement>(null);
  const { progress } = useContext(StoredContext);
  // 这到底是个什么类型
  const [bar, setBar] = useState<any>();

  useLayoutEffect(() => {
    if (bar) {
      bar.animate(progress.active / progress.total || 0.1);
    }
  }, [progress]);

  useEffect(() => {
    let a = new ProgressBar.Path('#' + ref.current?.id, {
      easing: 'easeInOut',
      duration: 2000,
    });
    setBar(a);
  }, []);

  return (
    <div className={classNames('spiral-container')}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='105mm'
        height='109mm'
        viewBox='0 0 744.09448819 1052.3622047'
        id='svg2'
        version='1.1'>
        <defs id='defs4' />

        <g id='layer1'>
          <path
            ref={ref}
            id='spiral-path'
            style={{
              fill: 'none',
              fillRule: 'evenodd',
              stroke: '#000',
              strokeWidth: '7px',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeOpacity: 1,
            }}
            d='m 351.42856,426.64792 c 9.59792,6.58962 -4.14741,16.18889 -10.95239,15.95238 -18.44108,-0.64095 -25.50386,-22.79656 -20.95237,-37.85716 8.14156,-26.93987 40.60934,-35.95244 64.76192,-25.95235 35.44488,14.67553 46.65368,58.64316 30.95235,91.66668 -20.92741,44.01515 -76.75274,57.45913 -118.57145,35.95233 -52.62457,-27.06411 -68.31781,-94.89777 -40.95232,-145.4762 33.14327,-61.25727 113.06263,-79.20718 172.38097,-45.95232 69.9046,39.1897 90.11579,131.23985 50.95231,199.28574 -45.21579,78.56167 -149.4253,101.03724 -226.19051,55.95229 -87.2255,-51.22837 -111.96767,-167.61654 -60.95228,-253.09526 57.23156,-95.89421 185.81202,-122.90465 280.00003,-65.95228 104.56654,63.22792 133.8465,204.01069 70.95226,306.90479'
          />
        </g>
      </svg>
    </div>
  );
};

export default SpiralProgress;
