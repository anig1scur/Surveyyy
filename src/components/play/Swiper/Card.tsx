import { FC } from 'react';
import { animated, to as interpolate, useSpring } from 'react-spring';
import { connect } from 'react-redux';
import { useGesture } from 'react-use-gesture';
import { Vector2 } from 'react-use-gesture/dist/types';

import { no, NO, yes, YES, RESET, resetChoice } from './redux/actions';
import { LastChoiceState } from './redux/reducers';
import { Attachment } from '../../../common/types';

const NO_DIR = -1;
const YES_DIR = 1;
const TRIGGER_THRESHOLD = 0.2;
type FlyOutDirection = typeof NO_DIR | typeof YES_DIR;

interface Props {
  index: number;
  attachment?: Attachment;
  text?: string;
  lastChoice: LastChoiceState;
  yes: Function;
  no: Function;
  resetChoice: Function;
  cardLength: number;
}

const to = (i: number, cardLength: number) => ({
  x: 0,
  y: Math.min(50, (cardLength - i - 1) * 25),
  rot: 0,
  scale: 1 - Math.min(0.1, (cardLength - i - 1) * 0.05),
  delay: 100 * i - 100,
  opacity: 1,
  yesOpacity: 0,
  noOpacity: 0,
});
const from = () => ({
  x: 0,
  y: 0,
  rot: 0,
  scale: 0.01,
  opacity: 0,
  yesOpacity: 0,
  noOpacity: 0,
});

const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const extractCardName = (image: string) => {
  return ((image.split('/').pop() || '').split('.').shift() || '').replace(/-/g, ' ');
};

const flyOut = ({
  set,
  flyOutDirection,
  xDelta,
  velocity,
}: {
  set: Function;
  flyOutDirection: FlyOutDirection;
  xDelta: number;
  velocity: number;
}) => {
  const yesOpacity: number = flyOutDirection === YES_DIR ? 2 : 0;
  const noOpacity: number = flyOutDirection === NO_DIR ? 2 : 0;
  const x: number = (200 + window.innerWidth) * flyOutDirection;
  const rot: number = xDelta / 100 + flyOutDirection * 10 * velocity;
  const scale: number = 1;
  const tension: number = 220;

  set(() => ({
    x,
    rot,
    scale,
    yesOpacity,
    noOpacity,
    delay: undefined,
    config: { friction: 40, tension },
  }));
};

const reset = (set: Function, index: number, cardLength: number) => {
  set(() => ({
    x: 0,
    y: Math.min(50, (cardLength - index - 1) * 25),
    rot: 0,
    scale: 1 - Math.min(0.1, (cardLength - index - 1) * 0.05),
    delay: 200 * index,
    opacity: 1,
    yesOpacity: 0,
    noOpacity: 0,
    config: { friction: 20, tension: 200 },
  }));
};

const Card: FC<Props> = ({ index, attachment, text, cardLength, lastChoice, ...actions }) => {
  const [props, set] = useSpring(() => ({ ...to(index, cardLength), from: from() }));

  if (lastChoice.currentCardIndex === index && (lastChoice.type === YES || lastChoice.type === NO)) {
    flyOut({
      set,
      flyOutDirection: lastChoice.type === YES ? YES_DIR : NO_DIR,
      xDelta: 200,
      velocity: 0.8,
    });
  } else if (lastChoice.type === RESET) {
    reset(set, index, cardLength);
  }

  const bind = useGesture(
    ({
      down,
      delta: [xDelta],
      direction: [horizontalDirection],
      velocity,
      distance,
    }: {
      down: boolean;
      delta: Vector2;
      direction: Vector2;
      velocity: number;
      distance: number;
    }) => {
      const shouldFlyOut: boolean = !down && velocity > TRIGGER_THRESHOLD;
      const flyOutDirection: FlyOutDirection = horizontalDirection < 0 ? NO_DIR : YES_DIR;

      if (shouldFlyOut) {
        if (flyOutDirection === YES_DIR) {
          actions.yes(lastChoice.currentCardIndex);
        } else if (flyOutDirection === NO_DIR) {
          actions.no(lastChoice.currentCardIndex);
        }
      } else {
        const yesOpacity = down && xDelta > 5 ? Math.min(1, distance / 150) : 0;
        const noOpacity = down && xDelta < -5 ? Math.min(1, distance / 150) : 0;
        const x: number = down ? xDelta : 0;
        const rot: number = xDelta / 100;
        const scale: number = down ? 1.1 : 1;
        const tension: number = down ? 720 : 400;

        set(() => ({
          x,
          rot,
          scale,
          yesOpacity,
          noOpacity,
          delay: undefined,
          config: { friction: 40, tension },
        }));
      }
    }
  );

  // @ts-ignore
  const yesClassName = props.yesOpacity.value === 2 ? 'card-yes hide' : 'card-yes ';
  // @ts-ignore
  const noClassName = props.noOpacity.value === 2 ? 'card-no hide' : 'card-no';

  return (
    <animated.div
      key={index}
      className='card-container'
      style={{ transform: interpolate([props.x, props.y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
      <animated.div
        {...bind(index)}
        className='card-image'
        style={{
          opacity: props.opacity,
          transform: interpolate([props.rot, props.scale], trans),
        }}>
        {text}
        <animated.div
          className={yesClassName}
          style={{ opacity: props.yesOpacity }}>
          YES
        </animated.div>
        <animated.div
          className={noClassName}
          style={{ opacity: props.noOpacity }}>
          NO
        </animated.div>
        <div className='card-title'>{attachment ? extractCardName(attachment.url) : text}</div>
      </animated.div>
    </animated.div>
  );
};

const mapStateToProps = (state: any) => {
  return { lastChoice: state.lastChoice };
};

export default connect(mapStateToProps, { yes, no, resetChoice })(Card);
