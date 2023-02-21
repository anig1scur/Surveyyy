import { FC, useLayoutEffect } from 'react';

export type Props = {
  style?: string;
};

const Intro: FC<Props> = (props) => {

  const getStats = async (params?: {}) => {
    // console.log(params);
  };

  useLayoutEffect(() => {
    getStats();
  }, []);

  return <div>我是首页</div>;
};

export default Intro;
