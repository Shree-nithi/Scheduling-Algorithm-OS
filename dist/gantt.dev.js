"use strict";

// Define an array of processes with their respective arrival times and burst times
var processes = [{
  id: "P1",
  arrivalTime: 0,
  burstTime: 4
}, {
  id: "P2",
  arrivalTime: 1,
  burstTime: 3
}, {
  id: "P3",
  arrivalTime: 2,
  burstTime: 2
}, {
  id: "P4",
  arrivalTime: 3,
  burstTime: 1
}]; // Sort the processes by their arrival times

processes.sort(function (a, b) {
  return a.arrivalTime - b.arrivalTime;
}); // Initialize an empty Gantt chart array

var ganttChart = []; // Initialize a variable to keep track of the current time

var currentTime = 0; // Iterate over the processes and calculate their completion times

for (var i = 0; i < processes.length; i++) {
  var process = processes[i];
  var completionTime = currentTime + process.burstTime; // Add the process and its completion time to the Gantt chart array

  ganttChart.push({
    id: process.id,
    startTime: currentTime,
    endTime: completionTime
  }); // Update the current time to the completion time of the current process

  currentTime = completionTime;
} // Print the Gantt chart to the console


console.log("|------------------------------------------------------------|");
console.log("|   Process   |   Burst Time   |  Arrival Time | Completion Time |");
console.log("|-------------|---------------|---------------|----------------|");

for (var _i = 0; _i < ganttChart.length; _i++) {
  var _process = ganttChart[_i];
  console.log("|      ".concat(_process.id, "     |        ").concat(_process.endTime - _process.startTime, "      |       ").concat(_process.startTime, "       |        ").concat(_process.endTime, "      |"));
}

console.log("|------------------------------------------------------------|");
//# sourceMappingURL=gantt.dev.js.map
