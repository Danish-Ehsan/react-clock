import "styles/Clock.scss";

export default function Clock({ date }) {
    const hoursDeg =
        date.getHours() * (360 / 12) + date.getMinutes() * (360 / (60 * 12));
    const minutesDeg = date.getMinutes() * (360 / 60);
    const secondsDeg = date.getSeconds() * (360 / 60);

    return (
        <div class="clock">
            <div
                class="clock__hours"
                style={{ transform: `translateY(-40%) rotate(${hoursDeg}deg)` }}
            ></div>
            <div
                class="clock__minutes"
                style={{
                    transform: `translateY(-40%) rotate(${minutesDeg}deg)`
                }}
            ></div>
            <div
                class="clock__seconds"
                style={{
                    transform: `translateY(-40%) rotate(${secondsDeg}deg)`
                }}
            ></div>
        </div>
    );
}
