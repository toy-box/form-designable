import { ISchema } from '@formily/react';

export const FieldRow: ISchema = {
  type: 'object',
  properties: {
    'x-component-props': {
      type: 'object',
      properties: {
        size: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            prefix: 'PX',
          },
        },
      },
    },
  },
};
