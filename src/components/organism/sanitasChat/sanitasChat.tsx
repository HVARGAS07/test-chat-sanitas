import React from "react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
const { useSanitas } = require("keralty-sanitas-chatbot");

const SanitasChat = forwardRef<SanitasChatRef, SanitasChatInterface>(
  (props, ref) => {
    const { hide, show } = useSanitas();
    const [ isSHow, setIsShow ] = useState(false);
    const [ dataChat, setDataChat ] = useState<configSanitas>(props.dataConfig)
    const [ isSetted, setIsSetted ] = useState(false)

    const changeConfig = (data: configSanitas) => {
      setDataChat(data);
      !isSetted && setIsSetted(true);
      setIsShow(false)
    }

    const changeVisbility = (visibilityState: 'visible' | 'hidden') => {
      const nodeSanitasChatFrame = document.getElementById("iframe-id");

      if (nodeSanitasChatFrame && nodeSanitasChatFrame['style']) {
        nodeSanitasChatFrame['style'].visibility = visibilityState;
      }
      if(visibilityState === 'hidden'){
        setIsShow(false);
      }else{
        setIsShow(true);
      }
    }

    useImperativeHandle(ref, () => ({
      onHideChat() {
       changeVisbility('hidden')      
      },
      onShowChat() {
        changeVisbility('visible')
      },
      showState: isSHow,
      setChatData(data: configSanitas) {
        changeConfig(data);
      }
    }));

    useEffect(() => {
      console.log(isSHow)
      console.log(isSetted)
      console.log(dataChat)
      if (isSHow && isSetted) {
        setTimeout(() => {
          show(dataChat);
        })
      }
    }, [isSHow, dataChat]);

    return <div></div>;
  }
);

export default SanitasChat;

export interface SanitasChatRef {
  onHideChat: () => void;
  onShowChat: () => void;
  showState: boolean;
  setChatData: (data: configSanitas) => void;
}

export interface SanitasChatInterface {
  dataConfig: configSanitas;
}

export interface configSanitas {
  languageOverride: string | "en";
  actionColor?: string | undefined;
  backgroundColor?: string | undefined;
  name: string | null;
  email: string | null;
  customAttributes: {
    cType?: "support" | "educator" | "provider";
  };
}
