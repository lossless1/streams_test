const {
  Readable,
  Writable,
  Duplex,
  Transform,
  PassThrough,
  pipeline
} = require("stream");
const fs = require("fs");

let counter = 1;
const outStreamWritebla = new Writable({
  write(chunk, encoding, callback) {
    console.log("chunk.length", chunk.length);
    // console.log(chunk.toString());
    console.log(counter);
    if (counter === 3) {
      this.end();
    }
    counter++;
    callback();
  },

  final(asdas) {
    console.log("final", asdas);
  }
});

const outStreamReadable1 = new Readable({
  read(buffer) {
    console.log(buffer);
  }
});

const outStreamReadable2 = new Writable({
  write() {}
});
// outStreamReadable1.push("hello");
// outStreamReadable1.pipe(process.stdout);
// process.stdin.pipe(outStream);

const inStream = new Readable({
  read(size) {
    console.log(this.currentCharCode);
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});

inStream.currentCharCode = 65;

// inStream.pipe(process.stdout);

const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log("chunk.toString()", chunk.toString());
    this.write(chunk.toString());
    this.end();
    callback();
  },
  read(...size) {
    console.log("size", size[0]);
    this.push("3333");
    this.push(null);

    // if (this.currentCharCode > 90) {
    //   this.push(null);
    // }
  }
});
// inoutStream.on("data", object => {
//   inoutStream.push(object);
// });
// inoutStream.currentCharCode = 65;

// fs.createReadStream("./test")
// .pipe(inoutStream)
// .pipe(fs.createWriteStream("./olol"));

const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});
const transformStream = fs.createReadStream("./test").pipe(upperCaseTr);

transformStream.pipe(process.stdout);
transformStream.pipe(fs.createWriteStream("./olol"));

const spawn = require("child_process").spawn;
const a = spawn("echo", ["hi user"]);
const b = new PassThrough();
const c = new PassThrough();
a.stdout.pipe(b);
b.on("data", chunks => {
  console.log("chunks.toString()", chunks.toString());
});
// a.stdout.pipe(process.stdout);

pipeline(fs.createReadStream("./test"));
