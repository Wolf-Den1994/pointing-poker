import { Form, Input, Select, Switch, TimePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import style from './GameSettings.module.scss';
import { changeSettings, setCards } from '../../store/settingsReducer';
import useTypedSelector from '../../hooks/useTypedSelector';
import { IGameSettingsData, OptionSettings, TextForUser } from '../../types/types';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { startTime } from '../../store/timerReducer';

const arrayFibonacci = ['pass', '0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];
const arrayModifiedFibonacci = ['pass', '0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100'];
const arrayPowerOfTwo = ['pass', '0', '1', '2', '4', '8', '16', '32', '64'];
const arrayCustomYour = ['pass'];

const GameSettings: React.FC = () => {
  const [formSettings] = Form.useForm();

  const dispatch = useDispatch();
  const { settings } = useTypedSelector((state) => state.settings);
  const {
    isDealerActive,
    voteAfterRoundEnd,
    autoAdmitMembers,
    autoFlipCards,
    showTimer,
    scoreType,
    customizeCard,
    roundTime,
  } = settings;

  const handleChangeFormSettings = (currentData: IGameSettingsData, data: IGameSettingsData) => {
    dispatch(changeSettings({ ...data }));

    if (currentData.roundTime) {
      const defaultTime = Number(currentData.roundTime.seconds()) + Number(currentData.roundTime.minutes()) * 60;
      dispatch(startTime(defaultTime));
    }
  };

  useEffect(() => {
    switch (scoreType) {
      case OptionSettings.Fibonacci:
        dispatch(setCards(arrayFibonacci));
        break;
      case OptionSettings.ModifiedFibonacci:
        dispatch(setCards(arrayModifiedFibonacci));
        break;
      case OptionSettings.PowerOfTwo:
        dispatch(setCards(arrayPowerOfTwo));
        break;
      default:
        dispatch(setCards(arrayCustomYour));
        break;
    }
  }, [scoreType]);

  return (
    <div className={style.settings}>
      <p className={style.title}>Game settings:</p>
      <Form
        wrapperCol={{
          span: 6,
        }}
        form={formSettings}
        onValuesChange={handleChangeFormSettings}
        scrollToFirstError
      >
        <Form.Item
          name="isDealerActive"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Scram master as player:</span>}
          colon={false}
          initialValue={isDealerActive}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="autoFlipCards"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Flip card automatically once all vote:</span>}
          colon={false}
          initialValue={autoFlipCards}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="autoAdmitMembers"
          valuePropName="checked"
          label={
            <span style={{ fontSize: 18 }}>
              Auto admit all new members if the game started (or admit/reject mechanism)
            </span>
          }
          colon={false}
          initialValue={autoAdmitMembers}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="voteAfterRoundEnd"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Changing card in round end:</span>}
          colon={false}
          initialValue={voteAfterRoundEnd}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="showTimer"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Is timer needed:</span>}
          colon={false}
          initialValue={showTimer}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="scoreType"
          label={<span style={{ fontSize: 18 }}>Score type:</span>}
          colon={false}
          initialValue={scoreType}
          rules={[
            {
              required: true,
              type: 'string',
              message: TextForUser.RequiredScoreType,
            },
          ]}
        >
          <Select value={scoreType} size="large">
            <Select.OptGroup label="Default:">
              <Select.Option value={OptionSettings.StoryPoint}>{OptionSettings.StoryPoint}</Select.Option>
            </Select.OptGroup>
            <Select.OptGroup label="Math:">
              <Select.Option value={OptionSettings.Fibonacci}>{OptionSettings.Fibonacci}</Select.Option>
              <Select.Option value={OptionSettings.ModifiedFibonacci}>{OptionSettings.ModifiedFibonacci}</Select.Option>
              <Select.Option value={OptionSettings.PowerOfTwo}>{OptionSettings.PowerOfTwo}</Select.Option>
            </Select.OptGroup>
            <Select.OptGroup label="Custom/your:">
              <Select.Option value={OptionSettings.CustomYour}>{OptionSettings.CustomYour}</Select.Option>
            </Select.OptGroup>
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.scoreType !== currentValues.scoreType}
        >
          {({ getFieldValue }) =>
            getFieldValue('scoreType') === 'custom/your' ? (
              <Form.Item
                name="customizeCard"
                label={<span style={{ fontSize: 18 }}>Customize card type:</span>}
                colon={false}
                initialValue={customizeCard}
                rules={[
                  {
                    required: true,
                    message: TextForUser.RequiredCustomizeCard,
                  },
                ]}
              >
                <Input size="large" placeholder="Your card type name" maxLength={28} />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          name="scoreTypeShort"
          label={<span style={{ fontSize: 18 }}>Score type (Short):</span>}
          colon={false}
          valuePropName={scoreType}
        >
          <Input style={{ textTransform: 'uppercase' }} size="large" value={getFirstUpLetters(scoreType)} readOnly />
        </Form.Item>

        {showTimer ? (
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
              allowClear={false}
              hideDisabledOptions={true}
              size="large"
              placeholder="Select a time"
            />
          </Form.Item>
        ) : null}
      </Form>
    </div>
  );
};

export default GameSettings;
