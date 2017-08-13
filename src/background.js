import { BackgroundChannel, ChannelHandler } from "chrome-ex";

const chan = new BackgroundChannel();
chan.connect();

ChannelHandler.addHandlers(
  new ChannelHandler({
    name: "makeSomething",
    handler: () => Promise.resolve("Hi from background")
  })
);

window.getSomeData = async () => {
  console.log(
    await Promise.all([
      chan.sendToContent({
        handler: "makeSomething"
      }),

      chan.sendToInclude({
        handler: "makeSomething"
      })
    ])
  );
};
