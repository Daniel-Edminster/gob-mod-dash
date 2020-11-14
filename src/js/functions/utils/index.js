export function parseMacros(str, obj) {
  const mapObj = {
    "%num": obj.number,
    "%theme": obj.theme ? obj.theme : "No theme",
    "%begin": formatDate(obj.dates.begin),
    "%bwts": worldTimeServerLink(obj.dates.begin),
    "%end": formatDate(obj.dates.end),
    "%ewts": worldTimeServerLink(obj.dates.end)
  }
  var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
  str = str.replace(re, function (matched) {
    return mapObj[matched];
  });
  return str;
}

function formatDate(dateString) {
  if (!dateString) return "No date"
  const array = dateString.split('/');
  const year = array.shift();
  const month = array.shift();
  const day = array.shift();
  const date = new Date(year, month - 1, day);
  return date.toUTCString();
}

function worldTimeServerLink(dateString) {
  if (!dateString) return "No date"
  const array = dateString.split('/');
  const year = array.shift();
  const month = array.shift();
  const day = array.shift();
  return `http://www.worldtimeserver.com/convert_time_in_UTC.aspx?y=${year}&mo=${month}&d=${day}&h=5&mn=0`
}