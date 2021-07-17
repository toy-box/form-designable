import { ISchema } from '@formily/react';

export const FieldDatetime: ISchema = {
  type: 'object',
  properties: {
    defaultValue: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        showTime: true,
        format: 'YYYY/MM/DD HH:mm:ss',
      },
      'x-index': 3,
    },
  },
};
