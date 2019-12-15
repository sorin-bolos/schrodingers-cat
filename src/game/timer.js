var deadline = 0;
var tickCount = 0;

export function setDeadLine(_deadline) {
    deadline = _deadline;
}

export function getDeadLine(_deadline) {
    return deadline;
}

export function updateTickCount(){
    tickCount++;
}

export function getTickCount(){
    return tickCount;
}

export function resetTickCount(){
    tickCount = 0;
}

export function endTime() {
    tickCount = deadline - 1;
};