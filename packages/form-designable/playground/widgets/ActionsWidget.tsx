import React, { useMemo } from 'react';
import { Space, Button, Radio } from 'antd';
import { TextWidget } from '@toy-box/form-designable-react';
import { GlobalRegistry } from '@designable/core';
import { observer } from '@formily/react';

export const ActionsWidget = observer(() => {
  return (
    <Space style={{ marginRight: 10 }}>
      <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: 'Engligh', value: 'en-US' },
          { label: '简体中文', value: 'zh-CN' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value);
        }}
      />
      <Button type="primary">
        <TextWidget>Publish</TextWidget>
      </Button>
    </Space>
  );
});
