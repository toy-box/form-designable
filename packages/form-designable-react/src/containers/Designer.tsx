import React, { useEffect } from 'react';
import cls from 'classnames';
import { DesignerContext } from '../context';
import { IDesignerProps } from '../types';
import { GhostWidget } from '../widgets';
import { useDesigner } from '../hooks';

export const Designer: React.FC<IDesignerProps> = (props) => {
  const engine = useDesigner();

  useEffect(() => {
    if (props.engine) {
      props.engine.mount();
    }
    return () => {
      if (props.engine) {
        props.engine.unmount();
      }
    };
  }, []);

  if (engine)
    throw new Error(
      'There can only be one Designable Engine Context in the React Tree',
    );

  return (
    <div
      className={cls({
        [`${props.prefixCls}app`]: true,
        [`${props.prefixCls}${props.theme}`]: props.theme,
      })}
    >
      <DesignerContext.Provider
        value={{
          engine: props.engine,
          prefixCls: props.prefixCls,
          theme: props.theme,
        }}
      >
        {props.children}
        <GhostWidget />
      </DesignerContext.Provider>
    </div>
  );
};

Designer.defaultProps = {
  prefixCls: 'dn-',
  theme: 'light',
};
