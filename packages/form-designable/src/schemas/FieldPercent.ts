import { ISchema } from '@formily/react';

export const FieldPercent: ISchema = {
  type: 'object',
  properties: {
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
