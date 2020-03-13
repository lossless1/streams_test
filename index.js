// const got = require("got");
const stream = require("stream");
const fs = require("fs");
const { PassThrough } = require("stream");
const http = require("http");
const { URL } = require("url");
const { promisify } = require("util");
const { merge } = require("./merge");

(async () => {
  // http
  //   .createServer((req, res) => {
  const str = "hello, world";
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // const testFile = fs.readFile("./test2");

  // const get = promisify(http.get);
  // const readStream3 = await get(
  //   "http://cdn-media-1.freecodecamp.org/images/1*SGJw31T5Q9Zfsk24l2yirg.gif"
  // );
  const pt = fs.createReadStream("./1.jpg");
  // const readStream2 = fs.createReadStream("./2.jpg");
  const writeStream = fs.createWriteStream("./5.jpg");
  // pt.pipe(writeStream, { end: false });
  // const pt = merge(readStream3._readableState);
  // pt.pipe(writeStream);

  const obj = [];
  pt.on("data", chunk => {
    // console.log("writeStream.writableEnded", writeStream.write(chunk));
    // console.log(chunk.toString());
    obj.push({ chunk });
    console.log("pt.isPaused()", pt.isPaused());
    pt.pause();
    console.log("pt.isPaused()", pt.isPaused());
    console.log(`pt: Received ${chunk.length} bytes of data.`);
  });

  pt.on("close", () => {
    console.log("pt: closed");
  });
  pt.on("readable", () => {
    console.log("pt: read", pt.read());
  });
  pt.on("pause", () => {
    console.log("pt: pause");
  });
  pt.on("resume", () => {
    console.log("pt: resume");
  });
  pt.on("end", a => {
    console.log("readable", pt.readable);
    console.log("pt: end");
    console.log(obj);
    writeStream.end();
  });

  writeStream.on("finish", () => {
    console.log("writable", writeStream.writable);
    console.log("writableEnded", writeStream.writableEnded);
    console.log("writableFinished", writeStream.writableFinished);
    console.log("Writeble: Finish All writes are now complete.");
  });
  writeStream.on("close", () => {
    console.log("Writeble: Close.");
  });
  // })
  // .listen(4040);

  // await got("http://localhost:4040");
})().catch(console.log);
