import { ISchema } from '@formily/react';

export const FieldNumber: ISchema = {
  type: 'object',
  properties: {
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
