const myStream = fs.createWriteStream("./10");
myStream.write("some data");
myStream.write("some more data");
myStream.end("done writing data");

myStream.on("finish", () => {
  console.log("All writes are now complete.");
});
