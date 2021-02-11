import React, { useState, useEffect } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Focus from "./Focus";
import Break from "./Break";
import TimeLeft from "./TimeLeft";
import { minutesToDuration } from "../utils/duration";

function Pomodoro() {
  //beginning of focus length
  const [focusLength, setFocusLength] = useState(60 * 25);
  // const [focusLength, setFocusLength] = useState(3);
  const [breakLength, setBreakLength] = useState(60 * 5);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(focusLength);
  const [intervalId, setIntervalId] = useState(null); //null when stopped
  const [currentSessionType, setCurrentSessionType] = useState("Focus"); //focus or break
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setTimeLeft(focusLength);
  }, [focusLength]);

  useEffect(() => {
    if (timeLeft < 0) {
      new Audio(`${process.env.PUBLIC_URL}/alarm/bell.mp3`).play();
      //when timer ends and session type is focus, go to break
      if (currentSessionType === 'Focus') {
        setTimeLeft(breakLength);
        setCurrentSessionType('Break');
      } else {
        setTimeLeft(focusLength);
        setCurrentSessionType('Focus');
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      //cleanup for interval, when it unmounts, clear it
      clearInterval(intervalId);
    }
  }, [])

  const decrementFocusLength = () => {
    let newFocusLength = focusLength - 60 * 5;
    if (newFocusLength < 300) { 
      setFocusLength(5 * 60);
    } else {
      setFocusLength(newFocusLength);
    }
  };

  const incrementFocusLength = () => {
    let newFocusLength = focusLength + 60 * 5;
    if (newFocusLength > 60 * 60) {
      setFocusLength(60 * 60);
    } else {
      setFocusLength(newFocusLength);
    }
  };

  //beginning of break length
  const decrementBreakLength = () => {
    let newBreakLength = breakLength - 60;
    if (newBreakLength < 60) {
      setBreakLength(60);
    } else {
      setBreakLength(newBreakLength);
    }
  };

  const incrementBreakLength = () => {
    setBreakLength(breakLength + 60);
  };

  // Timer starts out paused
  const playPause = () => {
    setIsDisabled(true);
    setIsTimerRunning((prevState) => !prevState);

    if (isTimerRunning) {
     // console.log(isStarted);
      clearInterval(intervalId); //clear the interval that is stored in intervalID when timer starts
      setIntervalId(null); //puts it back to null once you hit pause
    } else {
      //if we are in paused mode
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          return prevTimeLeft - 1;
        });
      }, 1000);
        
      setIntervalId(newIntervalId);
    }
      //setinterval makes a new id, returns the id of that timer and saving that as interval id (lets you clear the timer later)
      //line 75 clears it
  }

  const stopSession = () => {
    setIsDisabled(false);
    setTimeLeft(focusLength);
    setCurrentSessionType('Focus');
    setIsTimerRunning(false);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <Focus
            focusLength={focusLength}
            decrementFocusLength={decrementFocusLength}
            incrementFocusLength={incrementFocusLength}
            isDisabled={isDisabled}
          />
        </div>
        <div className="col">
          <Break
            breakLength={breakLength}
            decrementBreakLength={decrementBreakLength}
            incrementBreakLength={incrementBreakLength}
            isDisabled={isDisabled}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
               <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopSession}
              disabled={isTimerRunning}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
        
            <TimeLeft focusLength={focusLength} breakLength={breakLength} timeLeft={timeLeft} currentSessionType={currentSessionType} isTimerRunning={isTimerRunning} isDisabled={isDisabled} />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Pomodoro;
