export default function randomID() {
  const stamp = new Date().getTime();
  return (((1 + Math.random()) * stamp) | 0).toString(16);
}
