import { useContext, useState } from "react";

import { CaretUpFilled } from "@ant-design/icons";

import { MessageObject, MessageFormProps } from "react-chat-engine-advanced";

import { nowTimeStamp } from "../hooks/dates";
import { Context } from "../hooks/context";

const MessageForm = (props: MessageFormProps) => {
  const [text, setText] = useState<string>("");
  const { user } = useContext(Context);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text.trim().length === 0) {
      return;
    }
    if (!user || user.email === null) {
      return;
    }

    setText("");

    const message: MessageObject = {
      text: text,
      sender_username: user.email,
      created: nowTimeStamp(),
      custom_json: {},
      attachments: [],
    };

    props.onSubmit && props.onSubmit(message);
  };

  return (
    <form onSubmit={onSubmit} className="ce-custom-message-form">
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Type something..."
        className="ce-custom-message-input"
      />

      <button type="submit" className="ce-custom-send-button">
        <CaretUpFilled />
      </button>
    </form>
  );
};

export default MessageForm;
