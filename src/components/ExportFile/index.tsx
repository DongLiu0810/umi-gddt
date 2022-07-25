/**
 * 导出文件
 */
import React from 'react';
import { Button } from 'antd';
import { downLoad } from '@/utils/utils';

// const { DownloadIcon } = Icons;

interface propsValidator {
  url: string;
  params?: object;
  buttonText?: string;
  className: string;
}

export default function ExportFile(props: propsValidator) {
  const { url, params, buttonText = '导出', className } = props;

  const exportDetail = () => downLoad(url, params);

  return (
    <Button onClick={exportDetail} className={className}>
      {buttonText}
    </Button>
  );
}
