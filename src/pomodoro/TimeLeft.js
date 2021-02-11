import React, { useState } from "react";
import { secondsToDuration } from "../utils/duration";
import { useEffect } from "react";

const TimeLeft = ({ focusLength, breakLength, timeLeft, intervalId, currentSessionType, isTimerRunning, isDisabled }) => {

  //change timeLeft whenever focusLength changes

  let focusLengthInMinutes = secondsToDuration(focusLength);
  let breakLengthInMinutes = secondsToDuration(breakLength);
  let timeLeftInMinutesAndSeconds = secondsToDuration(timeLeft);

  //if break, use breakLength for total time, focusLength for focus
  let time = currentSessionType === 'Break' ? breakLength : focusLength

  //percentage total time - time left for progress bar
  let percentage = ((time - timeLeft )/ time) * 100


  return (
    <div>
      {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
      <h2 data-testid="session-title">
        {currentSessionType === "Focus" ? "Focusing" : "On Break"} for{" "}
        {currentSessionType === "Focus"
          ? focusLengthInMinutes
          : breakLengthInMinutes}{" "}
        minutes
      </h2>
      {/* TODO: Update message below to include time remaining in the current session */}
      <p className="lead" data-testid="session-sub-title">
        {timeLeftInMinutesAndSeconds} remaining
      </p>
      <br/>
      <br/>
      <h3>{!isDisabled ? '' : isTimerRunning ? '' : 'PAUSED'}</h3>
      <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={percentage} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${percentage}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
    </div>
  );
};

export default TimeLeft;
