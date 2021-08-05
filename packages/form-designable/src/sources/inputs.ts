import { GlobalDragSource } from '@designable/core';

GlobalDragSource.appendSourcesByGroup('inputs', [
  {
    componentName: 'DesignableField',
    props: {
      name: 'String',
      type: 'string',
      component: 'FieldString',
      'x-decorator': 'FormItem',
      'x-component': 'FieldString',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      name: 'Text',
      type: 'string',
      component: 'FieldText',
      'x-decorator': 'FormItem',
      'x-component': 'FieldText',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      name: 'Select',
      component: 'FieldSingleOption',
      'x-decorator': 'FormItem',
      'x-component': 'FieldSingleOption',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'date',
      title: 'DatePicker',
      component: 'FieldDate',
      'x-decorator': 'FormItem',
      'x-component': 'FieldDate',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'datetime',
      title: 'DateTimePicker',
      component: 'FieldDatetime',
      'x-decorator': 'FormItem',
      'x-component': 'FieldDatetime',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'number',
      name: 'Number',
      component: 'FieldNumber',
      'x-decorator': 'FormItem',
      'x-component': 'FieldNumber',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'percent',
      name: 'Percent',
      component: 'FieldPercent',
      'x-decorator': 'FormItem',
      'x-component': 'FieldPercent',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'boolean',
      name: 'Switch',
      component: 'FieldBoolean',
      'x-decorator': 'FormItem',
      'x-component': 'FieldBoolean',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'object',
    },
  },
]);
