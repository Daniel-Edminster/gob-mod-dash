export function parseMacros(str, obj) {
  const mapObj = {
    "%num": obj.number,
    "%theme": obj.theme,
    "%begin": formatDate(obj.dates.begin),
    "%end": formatDate(obj.dates.end)
  }
  var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
  str = str.replace(re, function (matched) {
    return mapObj[matched];
  });
  return str;
}

function formatDate(dateString) {
  const array = dateString.split('/');
  const year = array.shift();
  const month = array.shift();
  const day = array.shift();
  const date = new Date(year, month - 1, day);
  return date.toUTCString();
}