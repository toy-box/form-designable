import { ISchema } from '@formily/react';

export const FieldNumber: ISchema = {
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
      type: 'number',
      maxLength: 18,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-index': 3,
    },
    precision: {
      type: 'number',
      maximum: 17,
      minimum: 0,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-index': 4,
    },
    maxLength: {
      type: 'number',
      maximum: 18,
      minimum: 0,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-index': 5,
    },
  },
};
