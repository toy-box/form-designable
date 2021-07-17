import { ISchema } from '@formily/react';

export const FieldDate: ISchema = {
  type: 'object',
  properties: {
    defaultValue: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        showTime: false,
        format: 'YYYY/MM/DD',
      },
      'x-index': 3,
    },
  },
};
