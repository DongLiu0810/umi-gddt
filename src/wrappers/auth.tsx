import React, {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'umi';
import { Spin } from 'antd';

const style: React.CSSProperties | undefined = {
  position: 'fixed',
  top: '50%',
  left: '50%',
};
export default (props: {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(
    (state: { globalModel: { userInfo: { id: string } } }) => state.globalModel,
  );
  useEffect(() => {
    dispatch({
      type: 'globalModel/initial',
    });
  }, []);
  if (userInfo.id) {
    return <div>{props.children}</div>;
  } else {
    return <Spin style={style} />;
  }
};
