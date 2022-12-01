import "./App.css";
import React, { useCallback } from "react";
import MainLayout from "./components/layout/main/main.layout";
import config from "./components/organism/sanitasChat/configChat";
import MessagesEs from "./components/organism/sanitasChat/Message.es.json";
import MessagesEn from "./components/organism/sanitasChat/Message.en.json";
import ChatOptions from "./components/molecules/chatoptions/chatoptions";
const { SanitasProvider } = require("keralty-sanitas-chatbot");
const App = () => {
  const onHide = useCallback(() => {}, []);

  const onShow = useCallback(() => {}, []);

  return (
    <SanitasProvider
      appId={"chat_key"}
      onHide={onHide}
      onShow={onShow}
      config={config}
      Messages={MessagesEn}
    >
      <div className="main_app">
        <MainLayout>
          <ChatOptions />
        </MainLayout>
      </div>
    </SanitasProvider>
  );
};

export default App;
