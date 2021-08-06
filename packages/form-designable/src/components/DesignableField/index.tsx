import React from 'react';
import { FormPath } from '@formily/core';
import { GlobalRegistry, TreeNode } from '@designable/core';
import { useDesigner, useTreeNode } from '@toy-box/form-designable-react';
import {
  ArrayField,
  Field,
  ObjectField,
  VoidField,
  observer,
  Schema,
  ISchema,
} from '@formily/react';
import { clone } from '@formily/shared';
import { DesignableObject } from '../DesignableObject';
import { createOptions } from './options';
import { IDesignableFieldProps } from './types';
import { includesComponent } from '../../shared';
import * as defaultSchemas from '../../schemas';

Schema.silent();

function pick(props: any, keys: string[] = []) {
  return keys.reduce((buf, key) => {
    buf[key] = props[key];
    return buf;
  }, {} as Record<string, any>);
}

export const createDesignableField = (options: IDesignableFieldProps) => {
  const realOptions = createOptions(options);
  const getFieldPropsSchema = (node: TreeNode): ISchema => {
    return FormPath.getIn(defaultSchemas, node.props['x-component']);
  };

  const calculateRestricts = (target: TreeNode, source: TreeNode[]) => {
    const targetComponent = target.props['x-component'];
    const restrictChildrenComponents =
      realOptions.restrictChildrenComponents?.[targetComponent];
    if (restrictChildrenComponents?.length) {
      if (
        source.every((node) =>
          includesComponent(node, restrictChildrenComponents, target),
        )
      ) {
        return true;
      }
      return false;
    }
    return true;
  };

  if (!realOptions.registryName) throw new Error('Can not found registryName');

  GlobalRegistry.registerDesignerProps({
    [realOptions.registryName]: (node) => {
      const componentName = node.props?.['x-component'];
      const message = GlobalRegistry.getDesignerMessage(
        `components.${componentName}`,
      );
      const isObjectNode = node.props.type === 'object';
      const isArrayNode = node.props.type === 'array';
      const isVoidNode = node.props.type === 'void';
      const title = typeof message === 'string' ? message : message?.title;
      const nodeTitle =
        title ||
        (isObjectNode
          ? GlobalRegistry.getDesignerMessage('components.Object')
          : isVoidNode
          ? GlobalRegistry.getDesignerMessage('components.Void')
          : '');
      return {
        title: nodeTitle,
        draggable: true,
        droppable: isObjectNode || isArrayNode || isVoidNode,
        selfRenderChildren:
          isArrayNode ||
          includesComponent(node, realOptions.selfRenderChildrenComponents),
        inlineLayout: includesComponent(
          node,
          realOptions.inlineLayoutComponents,
        ),
        inlineChildrenLayout: includesComponent(
          node,
          realOptions.inlineChildrenLayoutComponents,
        ),
        allowAppend(target, source) {
          return (
            (target.props.type === 'void' ||
              target.props.type === 'array' ||
              target.props.type === 'object') &&
            calculateRestricts(target, source)
          );
        },
        propsSchema: getFieldPropsSchema(node),
      };
    },
  });

  const DesignableField: React.FC<ISchema> = observer((props) => {
    const designer = useDesigner();
    const node = useTreeNode();
    if (!node) return null;

    const getFieldProps = () => {
      const base = new Schema(clone(props)).compile();
      const fieldProps = base.toFieldProps({
        components: realOptions.components,
      });
      if (fieldProps.decorator?.[0]) {
        fieldProps.decorator[1] = fieldProps.decorator[1] || {};
        FormPath.setIn(
          fieldProps.decorator[1],
          designer.props.nodeIdAttrName,
          node.id,
        );
      } else if (fieldProps.component?.[0]) {
        fieldProps.component[1] = fieldProps.component[1] || {};
        FormPath.setIn(
          fieldProps.component[1],
          designer.props.nodeIdAttrName,
          node.id,
        );
      }
      fieldProps.value = fieldProps.initialValue;
      return fieldProps as any;
    };

    const getArrayFieldProps = () => {
      return props.items;
    };

    const fieldProps = getFieldProps();
    if (props.type === 'object') {
      return (
        <DesignableObject>
          <ObjectField {...fieldProps} name={node.id}>
            {props.children}
          </ObjectField>
        </DesignableObject>
      );
    } else if (props.type === 'array') {
      return <ArrayField {...fieldProps} name={node.id} />;
    } else if (node.props.type === 'void') {
      console.log('VoidField', fieldProps);
      return (
        <VoidField {...fieldProps} name={node.id}>
          {props.children}
        </VoidField>
      );
    }
    const fieldMeta = pick(props, [
      'key',
      'name',
      'type',
      'description',
      'primary',
      'options',
      'refObjectId',
      'unique',
      'required',
      'maximum',
      'minimum',
      'exclusiveMaximum',
      'exclusiveMinimum',
      'maxLength',
      'minLength',
      'precision',
      'multipleOf',
      'minProperties',
      'maxProperties',
      'maxItems',
      'minItems',
      'uniqueItems',
      'pattern',
      'format',
      'titleKey',
      'primaryKey',
      'parentKey',
      'properties',
      'items',
      'index',
      'defaultValue',
    ]);
    fieldProps.component[1] = Object.assign(fieldProps.component[1] || {}, {
      field: fieldMeta,
    });
    fieldProps.decorator[1] = Object.assign(fieldProps.decorator[1] || {}, {
      style: { width: props['x-width'] },
    });
    return (
      <Field
        {...fieldProps}
        title={fieldProps.name}
        field={fieldMeta}
        name={node.id}
      />
    );
  });

  return DesignableField;
};
