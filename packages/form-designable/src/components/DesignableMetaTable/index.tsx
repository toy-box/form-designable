import React from 'react';
import { Droppable } from '../Droppable';
import { TreeNode } from '@designable/core';
import { useTreeNode, useNodeIdProps } from '@toy-box/form-designable-react';
import { Table } from 'antd';
import { observer } from '@formily/react';
import { useDropTemplate } from '../../hooks';
import {
  queryNodesByComponentPath,
  createEnsureTypeItemsNode,
  createNodeId,
} from '../../shared';

const ensureVoidItemsNode = createEnsureTypeItemsNode('void');

export const DesignableMetaTable: React.FC = observer((props) => {
  const node = useTreeNode();
  const nodeId = useNodeIdProps();
  const designer = useDropTemplate('ArrayTable', (source) => {
    const voidNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
      },
      children: [...source],
    });
    return [voidNode];
  });
  const defaultRowKey = () => {
    return node.id;
  };
  const createColumnId = (props: any) => {
    return createNodeId(
      designer,
      props.className.match(/data-id\:([^\s]+)/)?.[1],
    );
  };
  const renderColumn = () => {
    if (node.children.length === 0) return <Droppable />;
    const children = queryNodesByComponentPath(node, [
      'ArrayTable',
      '*',
      (name) => name.indexOf('ArrayTable.') === -1,
    ]);
    return (
      <Table
        {...createNodeId(designer, ensureVoidItemsNode(node).id)}
        size="small"
        bordered
        scroll={{ x: '100%' }}
        style={{ marginBottom: 16 }}
        rowKey={defaultRowKey}
        dataSource={[{ id: '1' }]}
        pagination={false}
        components={{
          header: {
            cell: (props: any) => {
              return (
                <th {...props} {...createColumnId(props)}>
                  {props.children}
                </th>
              );
            },
          },
          body: {
            cell: (props: any) => {
              return (
                <td {...props} {...createColumnId(props)}>
                  {props.children}
                </td>
              );
            },
          },
        }}
      >
        <Table.Column title={'#'} width={80}></Table.Column>
        {children.length ? (
          children.map((node, key) => {
            return (
              <Table.Column
                key={key}
                dataIndex={node.id}
                title={node.props.name}
                className={`data-id:${node.id}`}
                render={() => {
                  return <div style={{ height: '80px' }}></div>;
                }}
              />
            );
          })
        ) : (
          <Droppable />
        )}
      </Table>
    );
  };

  return <div {...nodeId}>{renderColumn()}</div>;
});
