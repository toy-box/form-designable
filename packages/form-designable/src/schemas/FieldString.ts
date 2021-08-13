import { ISchema } from '@formily/react';

export const FieldString: ISchema = {
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
    formula: {
      type: 'string',
      'x-component': 'FormulaSetter',
    },
    'x-width': {
      type: 'number',
      enum: [
        {
          label: '1/4',
          value: '25%',
        },
        {
          label: '1/3',
          value: '33.33%',
        },
        {
          label: '1/2',
          value: '50%',
        },
        {
          label: '2/3',
          value: '66.66%',
        },
        {
          label: '3/4',
          value: '75%',
        },
        {
          label: '1/1',
          value: '100%',
        },
      ],
      default: '33.33%',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
        buttonStyle: 'solid',
      },
      'x-index': 5,
    },
  },
};
