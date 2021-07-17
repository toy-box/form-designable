import { ISchema } from '@formily/react';

export const FieldSingleOption: ISchema = {
  type: 'object',
  properties: {
    defaultValue: {
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-reactions': [
        {
          dependencies: ['.options'],
          when: '{{$deps[0]}}',
          fulfill: {
            state: {
              dataSource: '{{$deps[0]}}',
            },
          },
        },
      ],
    },
    options: {
      'x-decorator': 'FormItem',
      'x-component': 'DataSourceSetter',
    },
  },
};
