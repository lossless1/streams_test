const merge = (...streams) => {
  let pass = new PassThrough();
  let waiting = streams.length;
  for (let stream of streams) {
    pass = stream.pipe(pass, { end: false });
    stream.once("end", () => --waiting === 0 && pass.emit("end"));
  }
  return pass;
};

module.exports = { merge };
