import { Message } from "../typings";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import { unstable_getServerSession } from "next-auth/next";
import { Providers } from "./providers";

const HomePage = async () => {
  // SSR rendering, from server showing initialMessages for the firstTime
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then(
    (res) => res.json()
  );

  const messages: Message[] = data.messages;

  const session = await unstable_getServerSession();

  return (
    <Providers session={session}>
      <div>
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </div>
    </Providers>
  );
};

export default HomePage;
