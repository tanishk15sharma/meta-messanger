import axios from "axios";
import { Message } from "../typings";

const fetcher = async () => {
  const res = await axios.get("/api/getMessages");

  const messages: Message[] = res.data.messages;

  return messages;
};

export { fetcher };
