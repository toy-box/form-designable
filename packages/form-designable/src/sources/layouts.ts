import { GlobalDragSource } from '@designable/core';

GlobalDragSource.appendSourcesByGroup('layouts', [
  {
    componentName: 'DesignableField',
    props: {
      type: 'void',
      'x-component': 'Segment',
      'x-component-props': {
        title: 'Segment',
      },
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'void',
      'x-component': 'FormGrid',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'void',
      'x-component': 'FieldRow',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'void',
      'x-component': 'FormTab',
    },
  },
]);
