// takes a time in UTC format and converts it to EST
export function formatTime(time) {
    time = time.split(" ")[1];
    time = time.split(":");
    time[0] = (parseInt(time[0])+20)%24;
    if (time[0] < 10) {
        time[0] = "0" + time[0];
    }
    return time.join(":");
}
