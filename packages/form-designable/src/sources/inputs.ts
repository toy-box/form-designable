import { GlobalDragSource } from '@designable/core';

GlobalDragSource.appendSourcesByGroup('inputs', [
  {
    componentName: 'DesignableField',
    props: {
      name: '文本',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'FieldString',
      'x-width': '33.33%',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      name: '大段文本',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'FieldText',
      'x-width': '100%',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      name: '单选',
      type: 'singleOption',
      'x-decorator': 'FormItem',
      'x-component': 'FieldSingleOption',
      'x-width': '33.33%',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      name: '日期',
      type: 'date',
      'x-decorator': 'FormItem',
      'x-component': 'FieldDate',
      'x-width': '33.33%',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'datetime',
      name: '日期时间',
      'x-decorator': 'FormItem',
      'x-component': 'FieldDatetime',
      'x-width': '33.33%',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'number',
      name: '数字',
      'x-decorator': 'FormItem',
      'x-component': 'FieldNumber',
      'x-width': '33.33%',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'percent',
      name: '百分比',
      'x-decorator': 'FormItem',
      'x-component': 'FieldPercent',
      'x-width': '33.33%',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'boolean',
      name: '是非',
      'x-decorator': 'FormItem',
      'x-component': 'FieldBoolean',
      'x-width': '33.33%',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'object',
    },
  },
]);
