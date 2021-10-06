import { Form, Input, Select, Switch, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import style from './GameSettings.module.scss';
import { changeSettings, setCards } from '../../store/settingsReducer';
import useTypedSelector from '../../hooks/useTypedSelector';
import { IGameSettingsData, OptionSettings, TextForUser } from '../../types/types';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { startTime } from '../../store/timerReducer';
import { getCardsFromLocalStorage } from '../../utils/localStorage.service';

const GameSettings: React.FC = () => {
  const [formSettings] = Form.useForm();
  const { roomId } = useParams<{ roomId: string }>();

  const dispatch = useDispatch();
  const { settings } = useTypedSelector((state) => state.settings);
  const {
    isDealerActive,
    voteAfterRoundEnd,
    autoAdmitMembers,
    autoFlipCards,
    autoFlipCardsAllVoted,
    showTimer,
    scoreType,
    roundTime,
  } = settings;

  const handleChangeFormSettings = (currentData: IGameSettingsData, data: IGameSettingsData) => {
    const newSettings = { ...data };
    const newCardSet = getCardsFromLocalStorage(roomId, newSettings.scoreType);
    if (!currentData.roundTime) newSettings.roundTime = 1;
    dispatch(changeSettings(newSettings));
    dispatch(setCards(newCardSet));

    if (currentData.roundTime) {
      const defaultTime = currentData.roundTime * 60;
      dispatch(startTime(defaultTime));
    }
  };

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
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item
          name="autoFlipCards"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Flip the cards automatically after the timer ends:</span>}
          colon={false}
          initialValue={autoFlipCards}
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item
          name="autoFlipCardsAllVoted"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Flip the cards automatically after all users voted:</span>}
          colon={false}
          initialValue={autoFlipCardsAllVoted}
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
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
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item
          name="voteAfterRoundEnd"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Changing card in round end:</span>}
          colon={false}
          initialValue={voteAfterRoundEnd}
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item
          name="showTimer"
          valuePropName="checked"
          label={<span style={{ fontSize: 18 }}>Is timer needed:</span>}
          colon={false}
          initialValue={showTimer}
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
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
            label={<span style={{ fontSize: 18 }}>Round time (minutes):</span>}
            colon={false}
            initialValue={roundTime}
          >
            <InputNumber
              value={roundTime}
              bordered
              min={1}
              max={30}
              keyboard={true}
              size="large"
              placeholder="Minutes"
              style={{ width: '100%' }}
            />
          </Form.Item>
        ) : null}
      </Form>
    </div>
  );
};

export default GameSettings;
