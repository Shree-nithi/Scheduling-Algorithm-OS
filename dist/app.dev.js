"use strict";

$(document).ready(function () {
  $(".form-group-time-quantum").hide(); // Show hide RR time quantum

  $('#algorithmSelector').on('change', function () {
    if (this.value === 'optRR' || this.value === 'optCFS') {
      $(".form-group-time-quantum").show(1000);
    } else {
      $(".form-group-time-quantum").hide(1000);
    }
  });
  var processList = [];
  $('#btnAddProcess').on('click', function () {
    var processID = $('#processID');
    var arrivalTime = $('#arrivalTime');
    var burstTime = $('#burstTime');

    if (processID.val() === '' || arrivalTime.val() === '' || burstTime.val() === '') {
      processID.addClass('is-invalid');
      arrivalTime.addClass('is-invalid');
      burstTime.addClass('is-invalid');
      return;
    }

    var process = {
      processID: parseInt(processID.val(), 10),
      arrivalTime: parseInt(arrivalTime.val(), 10),
      burstTime: parseInt(burstTime.val(), 10)
    };
    processList.push(process);
    $('#tblProcessList > tbody:last-child').append("<tr>\n                    <td id=\"tdProcessID\">".concat(processID.val(), "</td>\n                    <td id=\"tdArrivalTime\">").concat(arrivalTime.val(), "</td>\n                    <td id=\"tdBurstTime\">").concat(burstTime.val(), "</td>\n\n                </tr>"));
    processID.val('');
    arrivalTime.val('');
    burstTime.val('');
  });
  $('#btnCalculate').on('click', function () {
    if (processList.length == 0) {
      alert('Please insert some processes');
      return;
    }

    var selectedAlgo = $('#algorithmSelector').children('option:selected').val();

    if (selectedAlgo === 'optCFS') {
      cfs();
    }

    if (selectedAlgo === 'optSJF') {
      shortestJobFirst();
    }

    if (selectedAlgo === 'optSRTF') {
      shortestRemainingTimeFirst();
    }

    if (selectedAlgo === 'optRR') {
      roundRobin();
    }
  });

  function shortestJobFirst() {
    var completedList = [];
    var time = 0;
    var queue = [];

    while (processList.length > 0 || queue.length > 0) {
      addToQueue();

      while (queue.length == 0) {
        time++;
        addToQueue();
      }

      processToRun = selectProcess();

      for (var i = 0; i < processToRun.burstTime; i++) {
        time++;
        addToQueue();
      }

      processToRun.processID = processToRun.processID;
      processToRun.arrivalTime = processToRun.arrivalTime;
      processToRun.burstTime = processToRun.burstTime;
      processToRun.completedTime = time;
      processToRun.turnAroundTime = processToRun.completedTime - processToRun.arrivalTime;
      processToRun.waitingTime = processToRun.turnAroundTime - processToRun.burstTime;
      completedList.push(processToRun);
    }

    function addToQueue() {
      for (var i = 0; i < processList.length; i++) {
        if (processList[i].arrivalTime === time) {
          var process = {
            processID: processList[i].processID,
            arrivalTime: processList[i].arrivalTime,
            burstTime: processList[i].burstTime
          };
          processList.splice(i, 1);
          queue.push(process);
        }
      }
    }

    function selectProcess() {
      if (queue.length != 0) {
        queue.sort(function (a, b) {
          if (a.burstTime > b.burstTime) {
            return 1;
          } else {
            return -1;
          }
        });
      }

      var process = queue.shift();
      return process;
    } // Bind table data


    $.each(completedList, function (key, process) {
      $('#tblResults > tbody:last-child').append("<tr>\n                        <td id=\"tdProcessID\">".concat(process.processID, "</td>\n                        <td id=\"tdArrivalTime\">").concat(process.arrivalTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.burstTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.completedTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.waitingTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.turnAroundTime, "</td>\n                    </tr>"));
    }); // Get average

    var avgTurnaroundTime = 0;
    var avgWaitingTime = 0;
    var maxCompletedTime = 0;
    var throughput = 0;
    $.each(completedList, function (key, process) {
      if (process.completedTime > maxCompletedTime) {
        maxCompletedTime = process.completedTime;
      }

      avgTurnaroundTime = avgTurnaroundTime + process.turnAroundTime;
      avgWaitingTime = avgWaitingTime + process.waitingTime;
    });
    $('#avgTurnaroundTime').val(avgTurnaroundTime / completedList.length);
    $('#avgWaitingTime').val(avgWaitingTime / completedList.length);
    $('#throughput').val(completedList.length / maxCompletedTime);
  }

  function shortestRemainingTimeFirst() {
    var completedList = [];
    var time = 0;
    var queue = [];

    while (processList.length > 0 || queue.length > 0) {
      addToQueue();

      while (queue.length == 0) {
        time++;
        addToQueue();
      }

      selectProcessForSRTF();
      runSRTF();
    }

    function addToQueue() {
      for (var i = 0; i < processList.length; i++) {
        if (processList[i].arrivalTime === time) {
          var process = {
            processID: processList[i].processID,
            arrivalTime: processList[i].arrivalTime,
            burstTime: processList[i].burstTime
          };
          processList.splice(i, 1);
          queue.push(process);
        }
      }
    }

    function selectProcessForSRTF() {
      if (queue.length != 0) {
        queue.sort(function (a, b) {
          if (a.burstTime > b.burstTime) {
            return 1;
          } else {
            return -1;
          }
        });

        if (queue[0].burstTime == 1) {
          process = queue.shift();
          process.completedTime = time + 1;
          completedList.push(process);
        } else if (queue[0].burstTime > 1) {
          process = queue[0];
          queue[0].burstTime = process.burstTime - 1;
        }
      }
    }

    function runSRTF() {
      time++;
      addToQueue();
    } // Fetch table data


    var TableData = [];
    $('#tblProcessList tr').each(function (row, tr) {
      TableData[row] = {
        "processID": parseInt($(tr).find('td:eq(0)').text()),
        "arrivalTime": parseInt($(tr).find('td:eq(1)').text()),
        "burstTime": parseInt($(tr).find('td:eq(2)').text())
      };
    }); // Remove header row

    TableData.splice(0, 1); // Reset burst time

    TableData.forEach(function (pInTable) {
      completedList.forEach(function (pInCompleted) {
        if (pInTable.processID == pInCompleted.processID) {
          pInCompleted.burstTime = pInTable.burstTime;
          pInCompleted.turnAroundTime = pInCompleted.completedTime - pInCompleted.arrivalTime;
          pInCompleted.waitingTime = pInCompleted.turnAroundTime - pInCompleted.burstTime;
        }
      });
    }); // Bind table data

    $.each(completedList, function (key, process) {
      $('#tblResults > tbody:last-child').append("<tr>\n                        <td id=\"tdProcessID\">".concat(process.processID, "</td>\n                        <td id=\"tdArrivalTime\">").concat(process.arrivalTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.burstTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.completedTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.waitingTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.turnAroundTime, "</td>\n                    </tr>"));
    }); // Get average

    var avgTurnaroundTime = 0;
    var avgWaitingTime = 0;
    var maxCompletedTime = 0;
    var throughput = 0;
    $.each(completedList, function (key, process) {
      if (process.completedTime > maxCompletedTime) {
        maxCompletedTime = process.completedTime;
      }

      avgTurnaroundTime = avgTurnaroundTime + process.turnAroundTime;
      avgWaitingTime = avgWaitingTime + process.waitingTime;
    });
    $('#avgTurnaroundTime').val(avgTurnaroundTime / completedList.length);
    $('#avgWaitingTime').val(avgWaitingTime / completedList.length);
    $('#throughput').val(completedList.length / maxCompletedTime);
  } /////////////////////////////////////////////////////////////


  function cfs() {
    // Fetch time quantum and total available CPU time
    var timeQuantum = $('#timeQuantum');
    var timeQuantumVal = parseInt(timeQuantum.val(), 10);

    if (timeQuantum.val() == '') {
      alert('Please enter time quantum');
      timeQuantum.addClass('is-invalid');
      return;
    }

    var totalCpuTime = 0;
    $('#tblProcessList tr').each(function (row, tr) {
      if (row > 0) {
        totalCpuTime += parseInt($(tr).find('td:eq(2)').text());
      }
    }); // Initialize variables

    var completedList = [];
    var time = 0;
    var queue = [];
    var minVruntime = Infinity;

    while (processList.length > 0 || queue.length > 0) {
      addToQueue();
      queue.sort(function (a, b) {
        if (a.arrivalTime > b.arrivalTime) {
          return 1;
        } else {
          return -1;
        }
      });
      selectProcessForCFS();
    }

    function addToQueue() {
      for (var i = 0; i < processList.length; i++) {
        if (processList[i].arrivalTime <= time) {
          var process = {
            processID: processList[i].processID,
            arrivalTime: processList[i].arrivalTime,
            burstTime: processList[i].burstTime,
            vruntime: processList[i].vruntime || 0,
            weight: processList[i].weight || 1
          };
          processList.splice(i, 1);
          queue.push(process);
        }
      }
    }

    function selectProcessForCFS() {
      if (queue.length > 0) {
        var process = queue[0];
        queue.splice(0, 1);
        var remainingBurstTime = process.burstTime - timeQuantumVal;
        process.completedTime = time + Math.min(process.burstTime, timeQuantumVal); // Update vruntime and weight

        var delta = process.weight * (time - process.arrivalTime) / process.burstTime;
        process.vruntime += delta;
        process.weight *= 2; // Add to completed list if process has finished

        if (process.burstTime <= timeQuantumVal) {
          process.burstTime = 0;
          completedList.push(process);
        } else if (remainingBurstTime > 0) {
          process.burstTime = remainingBurstTime;
          queue.push(process);
        } // Update time


        time += Math.min(process.burstTime, timeQuantumVal); // Add new processes to queue

        addToQueue();
      } else {
        time++;
        addToQueue();
      } // Check if the total available CPU time has been exceeded


      if (time >= totalCpuTime) {
        return;
      }
    } // Calculate turnaround time, waiting time, and vruntime for each process


    completedList.forEach(function (process) {
      process.turnAroundTime = process.completedTime - process.arrivalTime;
      process.waitingTime = process.turnAroundTime - process.burstTime;
      process.vruntime = Math.round(process.vruntime);
    }); // Bind table data

    $.each(completedList, function (key, process) {
      $('#tblResults > tbody:last-child').append("<tr>\n                        <td id=\"tdProcessID\">".concat(process.processID, "</td>\n                        <td id=\"tdArrivalTime\">").concat(process.arrivalTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.burstTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.completedTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.waitingTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.turnAroundTime, "</td>\n                    </tr>"));
    }); // Calculate and display averages

    var totalTurnaroundTime = 0;
    var totalWaitingTime = 0;
    $.each(completedList, function (key, process) {
      totalTurnaroundTime += process.turnAroundTime;
      totalWaitingTime += process.waitingTime;
    });
    $('#avgTurnaroundTime').val(totalTurnaroundTime / completedList.length);
    $('#avgWaitingTime').val(totalWaitingTime / completedList.length);
    $('#throughput').val(completedList.length / totalCpuTime);
  } ///////////////////////////////////////////////////////////////////////////////////////////////////


  function roundRobin() {
    var timeQuantum = $('#timeQuantum');
    var timeQuantumVal = parseInt(timeQuantum.val(), 10);

    if (timeQuantum.val() == '') {
      alert('Please enter time quantum');
      timeQuantum.addClass('is-invalid');
      return;
    }

    var completedList = [];
    var time = 0;
    var queue = [];

    while (processList.length > 0 || queue.length > 0) {
      addToQueue();

      while (queue.length == 0) {
        time++;
        addToQueue();
      }

      selectProcessForRR();
    }

    function addToQueue() {
      for (var i = 0; i < processList.length; i++) {
        if (processList[i].arrivalTime === time) {
          var process = {
            processID: processList[i].processID,
            arrivalTime: processList[i].arrivalTime,
            burstTime: processList[i].burstTime
          };
          processList.splice(i, 1);
          queue.push(process);
        }
      }
    }

    function selectProcessForRR() {
      if (queue.length != 0) {
        queue.sort(function (a, b) {
          if (a.burstTime > b.burstTime) {
            return 1;
          } else {
            return -1;
          }
        });

        if (queue[0].burstTime < timeQuantumVal) {
          process = queue.shift();
          process.completedTime = time + process.burstTime;

          for (var index = 0; index < process.burstTime; index++) {
            time++;
            addToQueue();
          }

          completedList.push(process);
        } else if (queue[0].burstTime == timeQuantumVal) {
          process = queue.shift();
          process.completedTime = time + timeQuantumVal;
          completedList.push(process);

          for (var index = 0; index < timeQuantumVal; index++) {
            time++;
            addToQueue();
          }
        } else if (queue[0].burstTime > timeQuantumVal) {
          process = queue[0];
          queue[0].burstTime = process.burstTime - timeQuantumVal;

          for (var index = 0; index < timeQuantumVal; index++) {
            time++;
            addToQueue();
          }
        }
      }
    } // Fetch initial table data


    var TableData = [];
    $('#tblProcessList tr').each(function (row, tr) {
      TableData[row] = {
        "processID": parseInt($(tr).find('td:eq(0)').text()),
        "arrivalTime": parseInt($(tr).find('td:eq(1)').text()),
        "burstTime": parseInt($(tr).find('td:eq(2)').text())
      };
    }); // Remove table header row

    TableData.splice(0, 1); // Reset burst time from original input table.

    TableData.forEach(function (pInTable) {
      completedList.forEach(function (pInCompleted) {
        if (pInTable.processID == pInCompleted.processID) {
          pInCompleted.burstTime = pInTable.burstTime;
          pInCompleted.turnAroundTime = pInCompleted.completedTime - pInCompleted.arrivalTime;
          pInCompleted.waitingTime = pInCompleted.turnAroundTime - pInCompleted.burstTime;
        }
      });
    }); // Bind table data

    $.each(completedList, function (key, process) {
      $('#tblResults > tbody:last-child').append("<tr>\n                        <td id=\"tdProcessID\">".concat(process.processID, "</td>\n                        <td id=\"tdArrivalTime\">").concat(process.arrivalTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.burstTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.completedTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.waitingTime, "</td>\n                        <td id=\"tdBurstTime\">").concat(process.turnAroundTime, "</td>\n                    </tr>"));
    }); // Get average

    var totalTurnaroundTime = 0;
    var totalWaitingTime = 0;
    var maxCompletedTime = 0;
    $.each(completedList, function (key, process) {
      if (process.completedTime > maxCompletedTime) {
        maxCompletedTime = process.completedTime;
      }

      totalTurnaroundTime = totalTurnaroundTime + process.turnAroundTime;
      totalWaitingTime = totalWaitingTime + process.waitingTime;
    });
    $('#avgTurnaroundTime').val(totalTurnaroundTime / completedList.length);
    $('#avgWaitingTime').val(totalWaitingTime / completedList.length);
    $('#throughput').val(completedList.length / maxCompletedTime);
  }
});
//# sourceMappingURL=app.dev.js.map
