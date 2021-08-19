import { ISchema } from '@formily/react';
import { convertTreeNodesToFormily } from '../convert';

export const FieldText: ISchema = {
  type: 'object',
  properties: {
    key: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-index': 0,
    },
    name: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-index': 1,
    },
    description: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-index': 2,
    },
    defaultValue: {
      type: 'string',
      maxLength: 10240,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-index': 3,
    },
    formula: {
      type: 'string',
      'x-component': 'FormulaSetter',
      'x-component-props': {
        convert: convertTreeNodesToFormily,
      },
      'x-index': 4,
    },
  },
};
