import { Form, Input, Select, Switch, TimePicker } from 'antd';
import { useDispatch } from 'react-redux';
import style from './GameSettings.module.scss';
import { changeSettings } from '../../store/lobbyReducer';
import useTypedSelector from '../../hooks/useTypedSelector';
import { IGameSettingsData } from '../../types/types';

const GameSettings: React.FC = () => {
  const [formSettings] = Form.useForm();

  const dispatch = useDispatch();

  const { settings } = useTypedSelector((state) => state.lobby);
  const { scram, card, timerNeed, scoreType, scoreTypeShort, roundTime } = settings;

  const onChangeFormSetting = (_: IGameSettingsData, data: IGameSettingsData) => {
    dispatch(changeSettings({ ...data }));
  };

  return (
    <div className={style.settings}>
      <p className={style.title}>Game settings:</p>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 6,
        }}
        form={formSettings}
        onValuesChange={onChangeFormSetting}
        scrollToFirstError
      >
        <Form.Item
          name="scram"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Scram master as player:</span>}
          colon={false}
          initialValue={scram}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="card"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Changing card in round end:</span>}
          colon={false}
          initialValue={card}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="timerNeed"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Is timer needed:</span>}
          colon={false}
          initialValue={timerNeed}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="scoreType"
          label={<span style={{ fontSize: 18 }}>Score type:</span>}
          colon={false}
          initialValue={scoreType}
          hasFeedback
          rules={[
            {
              required: true,
              type: 'string',
              message: 'Score type is required!',
            },
          ]}
        >
          <Select defaultValue={scoreType} size="large">
            <Select.OptGroup label="Score type:">
              <Select.Option value="score type">score type</Select.Option>
            </Select.OptGroup>
            <Select.OptGroup label="Math:">
              <Select.Option value="fibonacci">fibonacci</Select.Option>
            </Select.OptGroup>
          </Select>
        </Form.Item>

        <Form.Item
          name="scoreTypeShort"
          label={<span style={{ fontSize: 18 }}>Score type (Short):</span>}
          colon={false}
          initialValue={scoreTypeShort}
          rules={[
            {
              required: true,
              type: 'string',
              message: 'Score type (short) is required!',
            },
          ]}
        >
          <Input style={{ textTransform: 'uppercase' }} placeholder="SP" size="large" maxLength={2} />
        </Form.Item>

        <Form.Item
          name="roundTime"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Round time:</span>}
          colon={false}
          initialValue={roundTime}
        >
          <TimePicker
            value={roundTime}
            format={'mm:ss'}
            clearIcon
            hideDisabledOptions={true}
            size="large"
            placeholder="Select a time"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default GameSettings;
