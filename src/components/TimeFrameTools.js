export const comparison = (time, ref) => {
  const units = {
    Seconds: 1,
    Minutes: 2,
    Hours: 3,
    Days: 4,
    Months: 5,
    Years: 6,
  };

  const timeUnit = time.split(' ');
  const unitRef = ref.split(' ');

  if (units[timeUnit[1]] === units[unitRef[1]]) {
    // Here we can check if it's ecual to eachother or not. i'm not setting it now
    if (timeUnit[0] < unitRef[0]) {
      return true;
    } else {
      return false;
    }
  } else if (units[timeUnit[1]] > units[unitRef[1]]) {
    return false;
  } else {
    return true;
  }
};

export const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' Years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' Months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' Days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' Hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' Minutes';
  }
  return Math.floor(seconds) + ' Seconds';
};
