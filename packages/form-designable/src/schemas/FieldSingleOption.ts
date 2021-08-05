import { ISchema } from '@formily/react';

export const FieldSingleOption: ISchema = {
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
    options: {
      'x-decorator': 'FormItem',
      'x-component': 'DataSourceSetter',
      'x-index': 3,
    },
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
      'x-index': 4,
    },
  },
};
