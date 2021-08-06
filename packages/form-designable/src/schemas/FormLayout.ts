import { ISchema } from '@formily/react';

export const FormLayout: ISchema = {
  type: 'object',
  properties: {
    labelCol: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    wrapperCol: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    colon: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    layout: {
      type: 'string',
      enum: ['vertical', 'horizontal', 'inline', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'horizontal',
      },
    },
    tooltipLayout: {
      type: 'string',
      enum: ['icon', 'text', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'icon',
      },
    },
    labelAlign: {
      type: 'string',
      enum: ['left', 'right', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'right',
      },
    },
    wrapperAlign: {
      type: 'string',
      enum: ['left', 'right', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'left',
      },
    },
  },
};
