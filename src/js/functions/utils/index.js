export function parseMacros(str, obj) {
  const mapObj = {
    "%num": obj.number,
    "%theme": obj.theme,
    "%date": new Date(),
  }
  var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
  str = str.replace(re, function (matched) {
    return mapObj[matched];
  });
  return str;
}