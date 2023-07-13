import { useEffect, useState, useRef } from "react";
import Clock from "components/Clock";
import Alarms from "components/Alarms";
import "styles/App.scss";

function App() {
    const [date, setDate] = useState(new Date());
    const [timeRunning, setTimeRunning] = useState(true);
    const timeInterval = useRef(null);
    const timeHue = date.getSeconds() * (360 / 60);
    const [alarms, setAlarms] = useState([]);
    const [activeAlarms, setActiveAlarms] = useState([]);

    //console.log(activeAlarms);

    alarms.forEach((alarm) => {
        if (
            !activeAlarms.includes(alarm) &&
            alarm.date.getHours() === date.getHours() &&
            alarm.date.getMinutes() === date.getMinutes() &&
            alarm.date.getSeconds() === date.getSeconds()
        ) {
            setActiveAlarms([...activeAlarms, alarm]);
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
                activeAlarms={activeAlarms}
                setActiveAlarms={setActiveAlarms}
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
