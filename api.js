var hash;

const getHash = () => {
  return hash
}

const updateHash = () => {
  hash = Math.random().toString(36).substring(7)
  console.log('generated hash: ' + hash);
}

module.exports = {
  getHash,
  updateHash
}
