import {
  ChatHeaderProps,
  ChatObject,
  PersonObject,
  Avatar,
} from "react-chat-engine-advanced";

import {
  PhoneFilled,
  DeleteFilled,
  PaperClipOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import axios from "axios";

import { nowTimeStamp } from "../hooks/dates";
import { getOtherUser } from "../hooks/getOtherUser";
import { useIsMobile } from "../hooks/isMobile";

import { privateKey, projectId } from "../hooks/constants";
import { useState } from "react";

interface CustomChatHeaderProps extends ChatHeaderProps {
  chat?: ChatObject;
  username: string;
  secret: string;
}

const ChatHeader = (props: CustomChatHeaderProps) => {
  // State
  const [isFilePickerLoading, setFilePickerLoading] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  // Hooks
  const isMobile: boolean = useIsMobile();

  // TODO: Show how TS recommends props.chat &&
  const otherMember: PersonObject | undefined =
    props.chat && getOtherUser(props.chat, props.username);

  const onFilesSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!props.chat) return;
    setFilePickerLoading(true);

    const headers = {
      "Project-ID": projectId,
      "User-Name": props.username,
      "User-Secret": props.secret,
    };

    const formdata = new FormData();
    const filesArr = Array.from(e.target.files !== null ? e.target.files : []);
    filesArr.forEach((file) => formdata.append("attachments", file, file.name));
    formdata.append("created", nowTimeStamp());
    formdata.append("sender_username", props.username);
    formdata.append("custom_json", JSON.stringify({}));

    axios
      .post(
        `https://api.chatengine.io/chats/${props.chat.id}/messages/`,
        formdata,
        { headers }
      )
      .then((r) => setFilePickerLoading(false))
      .catch((e) => setFilePickerLoading(false));
  };

  const onDelete = () => {
    if (!props.chat) return;
    setDeleteLoading(true);

    const headers = { "Private-Key": privateKey };
    axios
      .delete(`https://api.chatengine.io/chats/${props.chat.id}/`, {
        headers,
      })
      .then(() => setDeleteLoading(false))
      .catch(() => setDeleteLoading(false));
  };

  return (
    <div className="ce-custom-chat-header">
      {otherMember && (
        <div>
          <Avatar
            className="ce-custom-header-avatar"
            avatarUrl={otherMember?.avatar}
            username={otherMember?.username}
            isOnline={otherMember?.is_online}
          />

          <div className="ce-custom-header-text">
            <div className="ce-custom-header-title">
              {otherMember.first_name} {otherMember.last_name}
            </div>
            <div className="ce-custom-header-subtitle">
              {otherMember.is_online ? "Online" : "Offline"}
            </div>
          </div>

          <div className="ce-custom-header-icon-wrapper">
            <form style={{ display: "inline-block" }}>
              <label htmlFor="ce-files-picker">
                {isFilePickerLoading ? (
                  <LoadingOutlined className="ce-custom-header-icon" />
                ) : (
                  <PaperClipOutlined className="ce-custom-header-icon" />
                )}
              </label>
              <input
                multiple
                id="ce-files-picker"
                style={{ visibility: "hidden", height: "0px", width: "0px" }}
                type="file"
                onChange={onFilesSelect}
              />
            </form>

            <PhoneFilled className="ce-custom-header-icon" />

            {isDeleteLoading ? (
              <LoadingOutlined className="ce-custom-header-icon" />
            ) : (
              <DeleteFilled
                onClick={() => onDelete()}
                className="ce-custom-header-icon"
              />
            )}
          </div>
        </div>
      )}

      <style>{`
      .ce-custom-header-avatar { display: inline-block; position: relative; top: 28px; margin-left: ${
        isMobile ? "48px" : "12px"
      }; border: 1px solid ${
        otherMember?.is_online ? "rgb(24, 144, 255)" : "#fa541c"
      }; box-shadow: ${
        otherMember?.is_online
          ? "rgb(24 144 255 / 35%)"
          : "rgb(245 34 45 / 35%)"
      } 0px 2px 7px; width: 38px !important; height: 38px !important; font-size: 14px !important; transition: all 0.66s ease; }
      `}</style>
    </div>
  );
};

export default ChatHeader;
