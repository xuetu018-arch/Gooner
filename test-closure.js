let m = [];
const getM = () => m;
async function scan() {
  m = [1, 2, 3];
}
scan().then(() => console.log(getM()));
