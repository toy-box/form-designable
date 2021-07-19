import { ISchema } from '@formily/react';

export const FieldString: ISchema = {
  type: 'object',
  properties: {
    defaultValue: {
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-index': 3,
    },
    format: {
      type: 'string',
      enum: [
        {
          label: '日期',
          value: 'date',
        },
        {
          label: '日期时间',
          value: 'datetime',
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        allowClear: true,
      },
      'x-index': 4,
    },
  },
};
