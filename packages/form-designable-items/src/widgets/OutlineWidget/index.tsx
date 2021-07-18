import React, { useRef, useLayoutEffect } from 'react';
import cls from 'classnames';
import { useTree, usePrefix, useOutline, useWorkbench } from '../../hooks';
import { observer } from '@formily/reactive-react';
import { OutlineTreeNode } from './OutlineNode';
import { Insertion } from './Insertion';
import { TreeNode } from '@designable/core';
import { NodeContext } from './context';

export interface IOutlineTreeWidgetProps {
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  renderTitle?: (node: TreeNode) => React.ReactNode;
  renderActions?: (node: TreeNode) => React.ReactNode;
}

export const OutlineTreeWidget: React.FC<IOutlineTreeWidgetProps> = observer(
  ({ onClose, style, renderActions, renderTitle, className, ...props }) => {
    const ref = useRef<HTMLDivElement>();
    const prefix = usePrefix('outline-tree');
    const workbench = useWorkbench();
    const workspaceId = workbench.currentWorkspace?.id;
    const tree = useTree(workspaceId);
    const outline = useOutline(workspaceId);

    useLayoutEffect(() => {
      if (ref.current && outline) {
        outline.onMount(ref.current, window);
      }
      return () => {
        outline.onUnmount();
      };
    }, []);

    if (!outline || !workspaceId) return null;
    return (
      <NodeContext.Provider value={{ renderActions, renderTitle }}>
        <div
          {...props}
          className={cls(prefix + '-container', className)}
          style={style}
        >
          <div className={prefix + '-content'} ref={ref}>
            <OutlineTreeNode node={tree} workspaceId={workspaceId} />
            <div
              className={prefix + '-aux'}
              style={{
                pointerEvents: 'none',
              }}
            >
              <Insertion workspaceId={workspaceId} />
            </div>
          </div>
        </div>
      </NodeContext.Provider>
    );
  },
);
