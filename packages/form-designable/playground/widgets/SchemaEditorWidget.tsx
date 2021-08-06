import React, { useMemo } from 'react';
import { TreeNode, ITreeNode } from '@designable/core';
import { MonacoInput } from '@toy-box/form-settings';
import { convertTreeNodesToSchema } from '../../src/convert';

export interface ISchemaEditorWidgetProps {
  tree: TreeNode;
  onChange?: (tree: ITreeNode) => void;
}

const Parser = {
  designableFormName: 'Root',
  designableFieldName: 'DesignableField',
};

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props,
) => {
  const code = useMemo(
    () => JSON.stringify(convertTreeNodesToSchema(props.tree, Parser), null, 2),
    [props.tree],
  );
  return (
    <MonacoInput
      {...props}
      value={code}
      // value={JSON.stringify(
      //   convertTreeNodesToSchema(props.tree, Parser),
      //   null,
      //   2,
      // )}
      // value={JSON.stringify(props.tree)}
      onChange={(value) => {
        // TODO:
        // props.onChange?.(transformToTreeNode(JSON.parse(value), Parser))
      }}
      language="json"
    />
  );
};
