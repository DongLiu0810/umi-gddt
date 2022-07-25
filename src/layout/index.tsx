import React from 'react';
import './index.less';

export default (props: { children: React.ReactNode }) => {
  return <div className="layout">{props.children}</div>;
};
