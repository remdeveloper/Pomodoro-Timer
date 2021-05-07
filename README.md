# Pomodoro-Timer

Live demo: https://pomodoro-timer2.vercel.app/

The Pomodoro technique is a time-management method. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. This will be simplified version of Cirillo's original Pomodoro technique. Built with React and JavaScript.

## Features
1. Set the focus duration (default to 25 minutes, no less than 5 or more than 60).
2. Set the break duration (default to 5 minutes, no less than 1 or more than 15).
3. When the user clicks the "play" button, the timer starts.
4. When the focus time expires, an alarm plays and then the break timer starts.
5. When the break time expires, the alarm plays again and then the focus timer starts.

This application uses [Bootstrap 4](https://getbootstrap.com/) for styling and [Open-Iconic icons](https://useiconic.com/open) for icons.

## Initial Screen

The initial screen lets the user set the length of the focus and break and break sessions. 

![image](https://user-images.githubusercontent.com/60833392/117480633-db26aa00-af2f-11eb-9a01-cd2e74f9f8c7.png)

The "stop" button is disabled on the initial screen because the user has not yet started the timer.  

When the user clicks the "play" button, the timer will always start a new focus session.

## Active Session Screen

After the user clicks the "play" button, the buttons to change the focus and break duration are disabled and the session timer appears. 

![image](https://user-images.githubusercontent.com/60833392/117480693-ef6aa700-af2f-11eb-9974-1d4d9e426722.png)

The session timer shows the type of session, either "Focusing" or "On Break", the total duration of the session, the time remaining, and a progress bar showing how much of the session is complete.

## Paused Session Screen

If the user clicks the "pause" button, "paused" appears below the time remaining. 


![image](https://user-images.githubusercontent.com/60833392/117480725-f7c2e200-af2f-11eb-8345-ac2c0b35e931.png)

The session timer shows the type of session, either "Focusing" or "On Break", the total duration of the session, the time remaining, and a progress bar showing how much of the session is complete.

## Stopping a session

Stopping a session returns the application to the initial screen and the user is able to change the focus and break duration. 

Clicking the "play" button will always start a new focus session.

## Setup

Clone a fork of this repository and run

```shell
cd pomodoro-timer
npm install
```
