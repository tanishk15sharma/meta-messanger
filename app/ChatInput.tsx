"use client";
import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "../utils/fetchMessages";
import { unstable_getServerSession } from "next-auth/next";

const ChatInput = ({ session }: any) => {
  const [input, setInput] = useState("");

  const {
    data: messagesData,
    error,
    mutate,
  } = useSWR("/api/getMessages", fetcher);
  // mutate is used to optimise and fill up the new data

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;
    const id = uuid();

    const message: Message = {
      id,
      message: input,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image,
      email: session?.user?.email,
    };

    const uploadMessageToUpstash = async () => {
      try {
        const { data } = await axios.post("/api/addMessage", { message });
        return [data.message, ...messagesData!];
      } catch (err) {
        console.log(err);
      }
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messagesData!],
      rollbackOnError: true,
    });

    setInput("");
  };
  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 px-10 space-x-2 border-t w-full py-5  flex bg-white"
    >
      <input
        type="text"
        value={input}
        disabled={!session}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded  disabled:opacity-50 px-5 py-3 "
        placeholder="Enter message"
      />
      <button
        disabled={!input}
        type="submit"
        className="bg-blue-500 
       hover:bg-blue-700
       text-white
       font-bold
       py-2 px-4 rounded
       disabled:opacity-50
       "
      >
        Send
      </button>
    </form>
  );
};

export { ChatInput };
