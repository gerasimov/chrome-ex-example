import { IncludeChannel, ChannelHandler } from "chrome-ex";

const chan = new IncludeChannel();
chan.connect();

ChannelHandler.addHandlers(
  new ChannelHandler({
    name: "makeSomething",
    handler: () => Promise.resolve("Hi from include")
  })
);

window.getSomeData = async () => {
  console.log(
    await Promise.all([
      chan.sendToContent({
        handler: "makeSomething"
      }),

      chan.sendToBackground({
        handler: "makeSomething"
      })
    ])
  );
};
