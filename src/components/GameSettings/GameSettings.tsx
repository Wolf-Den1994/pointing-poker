import { Form, Input, Switch, TimePicker } from 'antd';
import { useDispatch } from 'react-redux';
import style from './GameSettings.module.scss';
import { changeSettings } from '../../store/lobbyReducer';
import useTypedSelector from '../../hooks/useTypedSelector';
import { IGameSettingsData } from '../../types/types';

const GameSettings: React.FC = () => {
  const [formSettings] = Form.useForm();

  const dispatch = useDispatch();

  const { settings } = useTypedSelector((state) => state.lobby);

  const onChangeFormSetting = (data: IGameSettingsData) => {
    const { scram, card, timerNeed, scoreType, scoreTypeShort, roundTime } = data;

    dispatch(
      changeSettings({
        scram,
        card,
        timerNeed,
        scoreType,
        scoreTypeShort,
        roundTime,
      }),
    );
    // console.log('change switch', data);
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
        <Form.Item name="scram" valuePropName="checked" label="Scram master as player:" initialValue={settings.scram}>
          <Switch />
        </Form.Item>

        <Form.Item name="card" valuePropName="checked" label="Changing card in round end:" initialValue={settings.card}>
          <Switch />
        </Form.Item>

        <Form.Item name="timerNeed" valuePropName="checked" label="Is timer needed:" initialValue={settings.timerNeed}>
          <Switch />
        </Form.Item>

        <Form.Item
          name="scoreType"
          label="Score type:"
          initialValue={settings.scoreType}
          rules={[
            {
              required: true,
              type: 'string',
              message: 'Score type is required!',
            },
          ]}
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item
          name="scoreTypeShort"
          label="Score type (Short):"
          initialValue={settings.scoreTypeShort}
          rules={[
            {
              required: true,
              type: 'string',
              message: 'Score type (short) is required!',
            },
          ]}
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item
          name="roundTime"
          valuePropName="checked"
          label="Round time (minutes/seconds):"
          initialValue={settings.roundTime}
        >
          <TimePicker
            defaultValue={settings.roundTime}
            format={'mm:ss'}
            clearIcon
            size="large"
            placeholder="Select a time"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default GameSettings;
