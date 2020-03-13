const lowResolutionLoop = async () => {
  let s = 100000;
  let c = 3;
  let d = 4;
  console.time("enc");
  while (s) {
    // console.log(s);
    // console.log(c, d);
    [c, d] = [d, c];
    await new Promise(res => {
      const readStream2 = fs.createReadStream(`./${c}.jpg`);
      const writeStream = fs.createWriteStream(`./${d}.jpg`);
      readStream2.pipe(writeStream);
      readStream2.on("end", () => {
        // console.log(s);
        res(true);
      });
    });

    // console.log(s);

    s--;
  }
  console.timeEnd("enc");
};
