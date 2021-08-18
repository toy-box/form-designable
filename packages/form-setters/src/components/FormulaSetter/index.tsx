import React, { Fragment, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import { Modal, Button } from 'antd';
import { FormulaEditor } from '@toy-box/form-formula';
import { observer } from '@formily/reactive-react';
import {
  usePrefix,
  useTheme,
  useTree,
  TextWidget,
} from '@toy-box/form-designable-react';
import 'codemirror/lib/codemirror.css';
import { TreeNode } from '@designable/core';
import { ISchema } from '@formily/react';

type FormSchema = {
  form: Record<string, any>;
  schema: ISchema;
};

export interface IFormulaSetterProps {
  className?: string;
  style?: React.CSSProperties;
  onChange: (formula: string) => void;
  value: string;
  convert: (tree: TreeNode, option?: any) => FormSchema;
}

export const FormulaSetter: React.FC<IFormulaSetterProps> = observer(
  (props) => {
    const { className, value, onChange, convert } = props;
    const tree = useTree();
    const theme = useTheme();
    const prefix = usePrefix('formula-setter');
    const [modalVisible, setModalVisible] = useState(false);
    const { schema } = useMemo(
      () =>
        convert(tree, {
          designableFormName: 'Root',
          designableFieldName: 'DesignableField',
        }),
      [tree],
    );
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const [formula, setFormula] = useState<string>();
    useEffect(() => setFormula(value), [value]);

    return (
      <Fragment>
        <Button block onClick={openModal}>
          <TextWidget token="SettingComponents.FormulaSetter.configureFormula" />
        </Button>
        <Modal
          title={
            <TextWidget token="SettingComponents.FormulaSetter.configureFormula" />
          }
          width="65%"
          bodyStyle={{ padding: 10 }}
          transitionName=""
          maskTransitionName=""
          visible={modalVisible}
          onCancel={closeModal}
          onOk={() => {
            onChange(formula);
            closeModal();
          }}
        >
          <div
            className={`${cls(prefix, className)} ${prefix + '-' + theme} ${
              prefix + '-layout'
            }`}
          >
            <FormulaEditor
              title="表单公式型字段"
              schema={schema}
              value={formula}
              onChange={setFormula}
              path={'projects.total'}
            />
          </div>
        </Modal>
      </Fragment>
    );
  },
);
