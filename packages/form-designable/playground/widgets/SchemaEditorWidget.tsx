import React, { useMemo } from 'react';
import { TreeNode, ITreeNode } from '@designable/core';
import { MonacoInput } from '@toy-box/form-settings';
import {
  convertTreeNodesToSchema,
  convertTreeNodesToFormily,
} from '../../src/convert';

export interface ISchemaEditorWidgetProps {
  tree: TreeNode;
  mode?: 'meta' | 'formily';
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
    () =>
      props.mode === 'formily'
        ? JSON.stringify(convertTreeNodesToFormily(props.tree, Parser), null, 2)
        : JSON.stringify(convertTreeNodesToSchema(props.tree, Parser), null, 2),
    [props.tree, props.mode],
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
