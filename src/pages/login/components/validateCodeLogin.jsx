import React, { useState } from 'react';
import { Button, message } from 'antd';
import { loginRule } from 'utils/rules';
import IconMap from 'components/common/IconMap';
import $http from 'api';

const ValidateCodeLogin = ({ FormItem, Input, form }) => {
  const [valiBtnDisabled, setValiBtnDisabled] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(true);
  // 验证码的时间长度
  const valiTimeLong = 10; // 60
  // 验证码的倒计时
  let [currentTime, setCurrentTime] = useState(valiTimeLong);

  /**
   * 发送验证码组件内部进行发送
   */
  const _sendSmCode = async () => {
    setCurrentStatus(false);
    //- 获取当前用户输入的手机号码
    const mobile = form.getFieldValue('mobile');
    const res = await $http.getSmCode({ mobile });
    message.success(res.msg);
    setValiBtnDisabled(true);
    runTime();
  };

  /**
   * 倒计时时间显示
   */
  const runTime = () => {
    const timer = setInterval(() => {
      if (currentTime === 0) {
        clearInterval(timer);
        setCurrentStatus(true);
        setValiBtnDisabled(false);
        setCurrentTime(valiTimeLong);
        return;
      }
      setCurrentTime(--currentTime);
    }, 1000);
  };

  /**
   * 验证 发送验证码的手机号码是否正确
   */
  const mobileValChange = async () => {
    await form
      .validateFields(['mobile'])
      .then(() => {
        console.log('done');
        setValiBtnDisabled(false);
      })
      .catch(() => {
        console.log('fail');
        setValiBtnDisabled(true);
      });
  };

  return (
    <div>
      <FormItem name="mobile" rules={loginRule.mobileRule} hasFeedback>
        <Input
          prefix={IconMap.mobileIcon}
          placeholder="请输入您的手机号码"
          onChange={mobileValChange}
        />
      </FormItem>
      <FormItem name="code" rules={loginRule.smCodeRule}>
        <Input
          prefix={IconMap.smCodeIcon}
          addonAfter={
            <Button onClick={_sendSmCode} disabled={valiBtnDisabled}>
              {currentStatus ? '发送验证码' : `${currentTime}秒后重新发送`}
            </Button>
          }
          placeholder="请输入验证码"
        />
      </FormItem>
    </div>
  );
};

/**
 * 验证码登录
 */
export default ValidateCodeLogin;
