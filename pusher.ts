import Pusher from "pusher";
import ClientPusher from "pusher-js";

const serverPusher = new Pusher({
  appId: "1519752",
  key: "d3c88715793366a82810",
  secret: "cb1c8550ea2866cdddb5",
  cluster: "ap2",
  useTLS: true,
});

const clientPusher = new ClientPusher("d3c88715793366a82810", {
  cluster: "ap2",
  forceTLS: true,
});

export { serverPusher, clientPusher };
