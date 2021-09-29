export function parseMacros(str, obj) {
  const mapObj = {
    "%num": obj.number,
    "%theme": obj.theme ? obj.theme.title : "No theme",
    "%begin": formatDate(obj.dates.begin),
    "%bwts": worldTimeServerLink(obj.dates.begin),
    "%end": formatDate(obj.dates.end),
    "%ewts": worldTimeServerLink(obj.dates.end),
    "%vcut": formatDate(obj.dates.endVote),
    "%vwts": worldTimeServerLink(obj.dates.endVote)
  }
  var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
  str = str.replace(re, function (matched) {
    return mapObj[matched];
  });
  return str;
}

function formatDate(dateString) {
  if (!dateString) return "No date";
  const date = new Date(dateString);
  return date.toDateString();
}

export function formatDateToISOString(string) {
   let date = null;
   if (string) date = new Date(string);
   if (isDate(date)) return date.toDateString();
   return false;
}

function isDate(obj) {
   // why there isn't a simple Date typeof check is beyond me :(
   if (Object.prototype.toString.call(obj) === '[object Date]') return true;
   return false;
}

function worldTimeServerLink(dateString) {
  if (!dateString) return "No date"
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // months are zero-indexed, thanks javascript.
  const day = date.getDay() + 1; // days too.
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `http://www.worldtimeserver.com/convert_time_in_UTC.aspx?y=${year}&mo=${month}&d=${day}&h=${hour}&mn=${minute}`
}

export function addDays (date, days) {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}