import { ISchema } from '@formily/react';

export const FieldPercent: ISchema = {
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
      'x-decorator': 'FormItem',
      'x-component': 'FieldPercent',
      'x-index': 3,
      'x-component-props': {
        field: {
          key: 'defaultValue',
          type: 'percent',
        },
      },
    },
  },
};
