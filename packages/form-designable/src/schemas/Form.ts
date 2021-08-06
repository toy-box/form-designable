import { ISchema } from '@formily/react';
import { FormLayout } from './FormLayout';

export const Form: ISchema = {
  type: 'object',
  properties: {
    ...(FormLayout.properties as any),
  },
};
