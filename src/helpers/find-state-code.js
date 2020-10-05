module.exports = function findStateCode (state, codex) {
  for(const obj of codex){
    if(obj.name === state){
      // Returns state code
      return obj.label
    }
  }
}