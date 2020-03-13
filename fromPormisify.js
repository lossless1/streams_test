const a = (ddd, cb) => {
  console.log(ddd);
  cb(null, 555);
};
const b = promisify(a);
// a(222, () => console.log(333));
b(222)
  .then(a => console.log("a", a))
  .catch(console.log);
// console.log(b);
