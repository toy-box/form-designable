import { ISchema } from '@formily/react';

export const FieldString: ISchema = {
  type: 'object',
  properties: {
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
