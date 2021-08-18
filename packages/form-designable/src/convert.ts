import React from 'react';
import { ISchema } from '@formily/react';
import { IFieldMeta, IFieldOption, MetaValueType } from '@toy-box/meta-schema';
import { pick, clone } from '@toy-box/toybox-shared';
import { TreeNode } from '@designable/core';
import { IMetaSchema } from './types';

const COLUMN_PREFIX = 'column_prefix';

export const convertFormilyField2IFieldMeta = (
  schema: ISchema,
  props: Record<string, any>,
  type?: string,
): Toybox.MetaSchema.Types.IFieldMeta => {
  const pickProps = pick(schema, [
    'multipleOf',
    'maximum',
    'exclusiveMaximum',
    'minimum',
    'exclusiveMinimum',
    'maxLength',
    'minLength',
    'maxItems',
    'minItems',
    'uniqueItems',
    'maxProperties',
    'minProperties',
    'required',
    'description',
  ]) as Pick<
    Toybox.MetaSchema.Types.IFieldMeta,
    | 'multipleOf'
    | 'maximum'
    | 'exclusiveMaximum'
    | 'minimum'
    | 'exclusiveMinimum'
    | 'maxLength'
    | 'minLength'
    | 'maxItems'
    | 'minItems'
    | 'uniqueItems'
    | 'maxProperties'
    | 'minProperties'
    | 'required'
    | 'description'
  >;

  return {
    key: schema.name as string,
    type: type || (schema.type as string),
    name: schema.title,
    ...pickProps,
    format: props.format,
    pattern: props.pattern,
    defaultValue: schema.default,
    options: schema.enum as IFieldOption[],
  };
};

export interface IFormilySchema {
  schema: ISchema;
  form: Record<string, any>;
}

export interface ITransformerOptions {
  designableFieldName?: string;
  designableFormName?: string;
  schemaFieldName?: string;
  schemaFormName?: string;
}

export interface IToyboxSchema {
  schema?: IMetaSchema;
  form?: Record<string, any>;
}

export interface FormilySchema {
  schema?: ISchema;
  form?: Record<string, any>;
}

const createOptions = (options: ITransformerOptions): ITransformerOptions => {
  return {
    designableFieldName: 'DesignableField',
    designableFormName: 'DesignableForm',
    ...options,
  };
};

export const convertTreeNodesToSchema = (
  node: TreeNode,
  options: ITransformerOptions,
): IToyboxSchema => {
  const realOptions = createOptions(options);
  const root = node.find((child) => {
    return child.componentName === realOptions.designableFormName;
  });
  const schema = {
    key: '',
    name: '',
    type: 'object',
    properties: {},
  };
  if (!root) return { schema };
  const createSchema = (
    node: TreeNode,
    schema: IMetaSchema = { key: '', name: '', type: 'void', properties: {} },
  ) => {
    if (node !== root) {
      Object.assign(schema, clone(node.props));
    }
    schema['_designableId'] = node.id;
    if (schema.type === 'array') {
      if (node.children[0]) {
        if (
          node.children[0].componentName === realOptions.designableFieldName
        ) {
          schema.items = createSchema(node.children[0]);
          schema['x-index'] = node.index;
        }
      }
      node.children.slice(1).forEach((child, index) => {
        if (child.componentName !== realOptions.designableFieldName) return;
        const key = child.props?.key || child.id;
        schema.properties = schema.properties || {};
        schema.properties[key] = createSchema(child);
        schema.properties[key]['x-index'] = child.index;
      });
    } else {
      node.children.forEach((child, index) => {
        if (child.componentName !== realOptions.designableFieldName) return;
        const key = child.props?.key || child.id;
        schema.properties = schema.properties || {};
        schema.properties[key] = createSchema(child);
        schema.properties[key]['x-index'] = child.index;
      });
    }
    return schema;
  };
  return { form: clone(root.props), schema: createSchema(root, schema) };
};

const convertType = (type: MetaValueType | string) => {
  switch (type) {
    case MetaValueType.SINGLE_OPTION:
      return 'string';
    case MetaValueType.MULTI_OPTION:
      return 'Array<string>';
    case MetaValueType.TEXT:
      return 'string';
    case MetaValueType.INTEGER:
      return 'number';
    case MetaValueType.OBJECT_ID:
      return 'string';
    case MetaValueType.PERCENT:
      return 'number';
    case MetaValueType.RATE:
      return 'number';
    default:
      return type;
  }
};

const makeProperties = (
  type: string,
  properties?: Record<string, IMetaSchema>,
) => {
  if (type === 'array') {
    return makeArrayTableProperties();
  }
  return properties ? mapProperties(properties, type) : undefined;
};

const mapProperties = (
  properties: Record<string, IMetaSchema>,
  type: string,
) => {
  if (type === 'array') {
    return makeTableItems(properties);
  }
  const props: Record<string, ISchema> = {};
  Object.keys(properties).forEach((key) => {
    props[key] = converSchemaToFormily(properties[key]);
  });
  return props;
};

const makeTableItems = (properties: Record<string, IMetaSchema>) => {
  const props: Record<string, ISchema> = {};
  Object.keys(properties).forEach((key) => {
    props[`${COLUMN_PREFIX}_${key}`] = makeColumn(key, properties[key]);
  });
  return props;
};

const makeArrayTableProperties = () => {
  return {
    addition: {
      type: 'void',
      'x-component': 'ArrayTable.Addition',
      title: '添加',
    },
  };
};

const makeColumn = (key: string, metaSchema: IMetaSchema) => {
  const field = Object.assign(
    pick(metaSchema, [
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
      'index',
      'defaultValue',
    ]),
    { key },
  );

  return {
    type: 'void',
    properties: {
      [key]: {
        type: convertType(metaSchema.type),
        title: metaSchema.name,
        'x-component': metaSchema['x-component'],
        'x-decorator': 'FormItem',
        'x-component-props': {
          field,
        },
      },
    },
    'x-component': 'ArrayTable.Column',
    'x-component-props': {
      title: metaSchema.name,
    },
    'x-index': metaSchema['x-index'],
  };
};

/** 将Toybox Schema 转为 Formily 的Schema */
export const converSchemaToFormily = (schema: IMetaSchema) => {
  const {
    key,
    name,
    defaultValue,
    type,
    options,
    titleKey,
    parentKey,
    refObjectId,
    items,
    index,
    properties,
    ['x-component-props']: componentsProps,
    ...others
  } = schema;
  const field = pick(schema, [
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
    'index',
    'defaultValue',
    'formula',
  ]);
  const xcomponentProps = Object.assign(
    {
      ...componentsProps,
    },
    ['void', 'array', 'object'].includes(type) ? {} : { field },
  );

  const decoratorProps = Object.assign(
    clone(schema['x-decorator-props'] || {}),
    schema['x-width'] ? { style: { width: schema['x-width'] } } : {},
  );

  return {
    ...others,
    name: key,
    title: name,
    default: defaultValue,
    type: convertType(type),
    properties: makeProperties(convertType(type), properties),
    items: items
      ? {
          type: items.type,
          properties: items.properties
            ? mapProperties(items.properties, convertType(type))
            : undefined,
        }
      : undefined,
    enum: options,
    ['x-component-props']: xcomponentProps,
    ['x-decorator-props']: decoratorProps,
    ['x-reactions']: field.formula
      ? [
          {
            type: 'formula',
            formula: field.formula,
          },
        ]
      : [],
  };
};

export const convertTreeNodesToFormily = (
  node: TreeNode,
  options: ITransformerOptions,
): FormilySchema => {
  const data = convertTreeNodesToSchema(node, options);
  return {
    schema: data.schema ? converSchemaToFormily(data.schema) : undefined,
    form: data.form,
  };
};
