import React, { useMemo } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField, Schema } from '@formily/react';
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
} from '@formily/antd';
import { Card, Slider, Rate } from 'antd';
import { Segment, FieldRow } from '@toy-box/toybox-ui';
import {
  FieldString,
  FieldText,
  FieldNumber,
  FieldDate,
  FieldBoolean,
  FieldPercent,
  FieldSelect,
} from '@toy-box/meta-components';
import { TreeNode } from '@designable/core';
import { schemaPatch } from '@toy-box/form-formula';
import { convertTreeNodesToFormily } from '../../src/convert';

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
    FieldString,
    FieldText,
    FieldNumber,
    FieldPercent,
    FieldDate,
    FieldDatetime: FieldDate,
    FieldBoolean,
    FieldSingleOption: FieldSelect,
    Segment,
    FieldRow,
  },
});

export interface IPreviewWidgetProps {
  tree: TreeNode;
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), []);
  Schema.registerPatches(schemaPatch);
  const { form: formProps, schema } = convertTreeNodesToFormily(props.tree, {
    designableFormName: 'Root',
    designableFieldName: 'DesignableField',
  });
  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  );
};
