import React, { FC } from 'react';
import { observer } from '@formily/react';
import { MetaTable } from '@toy-box/meta-components';
import { useTreeNode, useNodeIdProps } from '@toy-box/form-designable-react';

export const DesignableMetaTable = observer((props) => {
  const node = useTreeNode();
  const nodeId = useNodeIdProps();
  console.log('node', node);
  const columnMetas = [
    { key: 'id', name: 'ID', type: 'string', index: 0 },
    { key: 'name', name: 'Name', type: 'string', index: 1 },
  ];
  return (
    <div {...nodeId}>
      <MetaTable columnMetas={columnMetas} />
    </div>
  );
});
