import { useEffect, useState, useRef } from "react";
import Clock from "components/Clock";
import Alarms from "components/Alarms";
import "styles/App.scss";

function App() {
    const [count, setCount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [timeRunning, setTimeRunning] = useState(true);
    const timeInterval = useRef(null);
    const timeHue = date.getSeconds() * (360 / 60);
    const [alarms, setAlarms] = useState([]);
    const [alarmRinging, setAlarmRinging] = useState(false);

    //console.log(alarms);
    //console.log("alarmRunning", alarmRinging);

    alarms.forEach((alarm) => {
        if (
            !alarmRinging &&
            alarm.date.getHours() === date.getHours() &&
            alarm.date.getMinutes() === date.getMinutes() &&
            alarm.date.getSeconds() === date.getSeconds()
        ) {
            setAlarmRinging(true);
        }
    });

    useEffect(() => {
        console.log("effect running");

        if (timeRunning) {
            timeInterval.current = setInterval(() => {
                setDate(new Date());
            }, 1000);
        }

        return () => {
            clearInterval(timeInterval.current);
        };
    }, [timeRunning]);

    return (
        <>
            <Clock
                date={date}
                timeHue={timeHue}
                alarmRinging={alarmRinging}
                setAlarmRinging={setAlarmRinging}
            />
            <h2 style={{ color: `hsl(${timeHue}, 30%, 60%)` }}>
                Time: {date.toLocaleTimeString()}
            </h2>
            <button
                style={{ marginTop: "10px" }}
                onClick={() => {
                    console.log("stop time");
                    console.log(timeInterval.current);
                    setTimeRunning(false);
                }}
            >
                Stop Time
            </button>
            <button
                style={{ marginLeft: "15px" }}
                onClick={() => {
                    setTimeRunning(true);
                }}
            >
                Resume Time
            </button>
            <Alarms alarms={alarms} setAlarms={setAlarms} />
        </>
    );
}

export default App;
