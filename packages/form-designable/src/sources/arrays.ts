import { GlobalDragSource } from '@designable/core';

GlobalDragSource.appendSourcesByGroup('arrays', [
  {
    componentName: 'DesignableField',
    props: {
      name: 'Table',
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      name: 'Card',
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayCards',
      'x-component-props': {
        title: `Title`,
      },
    },
  },
]);
