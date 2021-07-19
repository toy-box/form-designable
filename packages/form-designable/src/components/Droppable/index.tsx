import React from 'react';
import { usePrefix, TextWidget } from '@toy-box/form-designable-react';
import { Empty } from 'antd';
import cls from 'classnames';
import './styles.less';

export interface IDroppableProps {
  style?: React.CSSProperties;
  className?: string;
}

export const Droppable: React.FC<IDroppableProps> = (props: any) => {
  const prefix = usePrefix('droppable');
  return (
    <Empty
      {...props}
      className={cls(prefix, props.className)}
      description={<TextWidget token="Common.droppable" />}
    />
  );
};
