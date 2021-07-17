import { ISchema } from '@formily/react';

export const FieldText: ISchema = {
  type: 'object',
  properties: {
    defaultValue: {
      type: 'string',
      maxLength: 10240,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-index': 3,
    },
  },
};
