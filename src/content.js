import { ContentChannel, ChannelHandler } from "chrome-ex";

const chan = new ContentChannel();
chan.connect();

ChannelHandler.addHandlers(
  new ChannelHandler({
    name: "makeSomething",
    handler: () => Promise.resolve("Hi from content")
  })
);

const script = document.createElement("script");
script.src = chrome.extension.getURL("include.js");
document.head.appendChild(script);

window.getSomeData = async () => {
  console.log(
    await Promise.all([
      chan.sendToInclude({
        handler: "makeSomething"
      }),

      chan.sendToBackground({
        handler: "makeSomething"
      })
    ])
  );
};
