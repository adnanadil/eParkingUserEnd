// This JS files helps in getting time from the built in JS library

export const getTime = () => {
  var unixTimestamp = Date.now();
  var localDate = new Date(unixTimestamp).toLocaleString("en-GB", {
    localeMatcher: "best fit",
    timeZoneName: "short",
    timeStyle: "short",
  });
  const currentHours = localDate.slice(0, 2);
  var currentHoursInt = parseInt(currentHours);

  var valueToPush = currentHoursInt;

  var theTimeButtonsToShow = [];
  for (let i = 0; i < 22; i++) {
    if (valueToPush === 24) {
      valueToPush = 1;
      theTimeButtonsToShow.push(valueToPush);
      valueToPush++;
    } else {
      theTimeButtonsToShow.push(valueToPush++);
    }
  }

  theTimeButtonsToShow.forEach((time) => {
    let timeInStraing = time.toString();
    let timeDots = ":00";
    let finalTimeToDisplay = timeInStraing.concat(timeDots);
    console.log(`Time Slots: ${finalTimeToDisplay}`);
  });

};
