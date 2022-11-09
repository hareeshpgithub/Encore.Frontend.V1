/* eslint-disable no-unused-vars */

export function isMobile() {
  const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
  console.log("isMobileDevice:" + isMobileDevice);
  return isMobileDevice;
  // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  //     return true
  // } else {
  //     return false
  // }
}

export function formatDate() {
  const d = new Date();
  var newDate = new Date(d);

  var sMonth = padValue(newDate.getMonth() + 1);
  var sDay = padValue(newDate.getDate());
  var sYear = newDate.getFullYear();
  var sHour = newDate.getHours();
  var sMinute = padValue(newDate.getMinutes());
  var sSeconds = padValue(newDate.getSeconds());
  var sAMPM = "AM";

  var iHourCheck = parseInt(sHour);

  if (iHourCheck > 12) {
    sAMPM = "PM";
    sHour = iHourCheck - 12;
  } else if (iHourCheck === 0) {
    sHour = "12";
  }

  sHour = padValue(sHour);

  return (
    sDay +
    "-" +
    sMonth +
    "-" +
    sYear +
    " " +
    sHour +
    ":" +
    sMinute +
    ":" +
    sSeconds +
    " " +
    sAMPM
  );
}

function padValue(value) {
  return value < 10 ? "0" + value : value;
}

export function unixTimeStamp() {
  const d = new Date();
  return Math.floor(d.getTime() / 1000);
}
