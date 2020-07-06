module.exports = (message) => {
  if(!message.startsWith('!')){
    return;
  }
  const msg = message.toLowerCase().split(" ")[0];
  return msg;
}