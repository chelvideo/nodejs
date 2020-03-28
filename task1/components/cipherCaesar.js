const cipherCaesar = (str, action, shift) => {
  if (action === 'decode') shift = 0 - shift;
  const res = str
    .split('')
    .map(item => {
      const ch = item.charCodeAt(0);
      let chRes;
      switch (true) {
        case ch >= 65 && ch <= 90:
          chRes = String.fromCharCode(65 + ((ch - 65 + 26 + shift) % 26));
          break;
        case ch >= 97 && ch <= 122:
          chRes = String.fromCharCode(97 + ((ch - 97 + 26 + shift) % 26));
          break;
        default:
          chRes = item;
      }
      return chRes;
    })
    .join('');
  return res;
};

module.exports = cipherCaesar;
