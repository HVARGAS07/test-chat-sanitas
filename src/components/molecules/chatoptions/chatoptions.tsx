import {
  Button,
  CornerDialog,
  Heading,
  majorScale,
  Pane,
  Pre,
  Text,
  TextInputField,
} from "evergreen-ui";
import { useCallback, useMemo, useRef, useState } from "react";
import SanitasChat, {
  configSanitas,
  SanitasChatInterface,
  SanitasChatRef,
} from "../../organism/sanitasChat/sanitasChat";
import { ChatOptionsType } from "./chatoptions.types";
import "./chatoptions.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

const ChatOptions: React.FC<ChatOptionsType> = () => {
  
  const defaultValues: configSanitas = {
    languageOverride: "en",
    actionColor: "#00cdac",
    backgroundColor: "#00cdac",
    name: "",
    email: "",
    customAttributes: { cType: "support" },
  };

  const initialValues = useMemo(
    () => ({
      username: "",
      email: "",
    }),
    []
  );

  /**
   * Refs
   */
  const sanitasChatRef = useRef<SanitasChatRef>(null);

  /**
   * States
   */
  const [dataConfig, setDataConfig] = useState<configSanitas>(defaultValues);
  const [userData, setUserData] = useState<any>(null);

  /**
   * Events of buttons
   */

  const chatSupport = (isAuth: boolean) => {
    const supportChat: configSanitas = {
      languageOverride: "en",
      actionColor: "#00cdac",
      backgroundColor: "#00cdac",
      name: isAuth ? userData.username : "",
      email: isAuth ? userData.email : "",
      customAttributes: { cType: "support" },
    };
    changeData(supportChat);
    handlerShow()
  } 

  const educatorChat = () => {
    const educatorChat: configSanitas = {
      languageOverride: "en",
      actionColor: "#00cdac",
      backgroundColor: "#00cdac",
      name: userData.username,
      email: userData.email,
      customAttributes: { cType: "educator" },
    };
    changeData(educatorChat);
    handlerShow()
  } 

  const providerChat = () => {
    const providerChat: configSanitas = {
      languageOverride: "en",
      actionColor: "#00cdac",
      backgroundColor: "#00cdac",
      name: userData.username,
      email: userData.email,
      customAttributes: { cType: "provider" },
    };
    changeData(providerChat);
    handlerShow()
  } 

  /**
   * Handlers for manage chat events
   */

  const changeData = (data: configSanitas) => {
    setDataConfig(data);
    sanitasChatRef?.current?.setChatData(data);
  };

  const handlerShow = () => {
    setTimeout(async () => {
      if (sanitasChatRef) {
        sanitasChatRef?.current?.onShowChat();
      }
    });
  };

  const handlerHide = () => {
    setTimeout(async () => {
      if (sanitasChatRef) {
        sanitasChatRef?.current?.onHideChat();
      }
    });
  };

  /**
   * Form for manage data of user
   */

  
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      setUserData(values)
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required()
        .matches(/^[A-Za-z0-9]+$/, "Only letters from A-Z and numbers allowed"),
      email: Yup.string().required().email(),
    }),
    validateOnChange: true,
    validateOnBlur: false,
  });


  return (
    <>
      <SanitasChat ref={sanitasChatRef} dataConfig={dataConfig} />
      <div className="flex-container">
        <Pane
          display="flex"
          className="container"
          is="section"
          border={"default"}
          paddingY={40}
          paddingX={40}
          width={650}
          height={450}
        >
          <Pane
            is="div"
            width={"60%"}
            background="tint2"
            border={"default"}
            paddingY={20}
            paddingX={20}
          >
            <Heading
              size={400}
              textAlign="center"
              is="h1"
              marginBottom={majorScale(3)}
            >
              Credentials for Roles ("educator" - "provider")
            </Heading>
            <form onSubmit={formik.handleSubmit}>
              <TextInputField
                inputHeight={majorScale(5)}
                label="Username *"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                isInvalid={!!formik.errors.username}
                validationMessage={formik.errors.username}
              />
              <TextInputField
                inputHeight={majorScale(5)}
                label="Email *"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={formik.touched.email && !!formik.errors.email}
                validationMessage={formik.errors.email}
              />
              <Button
                type="submit"
                appearance="primary"
                intent="success"
                display="block"
                width="100%"
                height={majorScale(5)}
              >
                Change data properties
              </Button>
              <hr />
              <Button
                type="button"
                appearance="default"
                display="block"
                width="100%"
                height={majorScale(5)}
                onClick={() => {
                  setDataConfig(defaultValues)
                  setUserData(null)
                  formik.resetForm();
                }}
              >
                Clear data properties
              </Button>
            </form>
          </Pane>
          <Pane
            is="div"
            display={"grid"}
            width={"40%"}
            background="tint2"
            border={"default"}
            paddingY={20}
            paddingX={20}
          >
            <Button onClick={() => chatSupport(false)}>Support Chat</Button>
            <Button onClick={() => chatSupport(true)} disabled={userData ? false : true}>Support Chat (Authenticated)</Button>
            <Button onClick={educatorChat} disabled={userData ? false : true}>Educator Chat</Button>
            <Button onClick={providerChat} disabled={userData ? false : true}>Provider Chat</Button>
            <Button intent="danger" onClick={handlerHide}>CLOSE Chat</Button>
          </Pane>
        </Pane>
      </div>
      <React.Fragment>
        <CornerDialog title="State user" isShown={true} hasFooter={false} hasClose={false} hasCancel={false} position={"top-right"}>
          <Text color={userData ? 'green' : 'red'}>{userData ? 'Authenticated' : 'Not Authenticated'}</Text>
        </CornerDialog>
      </React.Fragment>
    </>
  );
};

export default ChatOptions;
