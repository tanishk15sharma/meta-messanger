"use client";

import { type } from "os";
import React, { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "../pusher";
import { Message } from "../typings";
import { fetcher } from "../utils/fetchMessages";
import { MessageComponent } from "./MessageComponent";

type Props = {
  initialMessages: Message[];
};

const MessageList = ({ initialMessages }: Props) => {
  const {
    data: messagesData,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  useEffect(() => {
    // connection to socket
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: Message) => {
      // for user who send message,it will be already their
      if (messagesData?.find((message) => message.id === data.id)) return;

      // adding data from socket for clients
      if (messagesData) {
        mutate(fetcher, {
          optimisticData: [data, ...messagesData!],
          rollbackOnError: true,
        });
      } else {
        mutate(fetcher);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messagesData, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messagesData || initialMessages)?.map((message) => (
        <MessageComponent message={message} key={message.id} />
      ))}
    </div>
  );
};

export { MessageList };
