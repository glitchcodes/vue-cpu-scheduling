<script setup>
  import { ref, reactive } from "vue";

  const numberOfQueue = ref(3)

  const arrivalTimeInput = ref("0 1 2 3")
  const burstTimeInput = ref("15 10 20 6")
  const queueInput = ref("0 1 0 1")

  const waitingTimes = reactive([])
  const completionTimes = reactive([])
  const averageWaitingTime = ref(0)
  const averageTurnaroundTime = ref(0)

  const processes = reactive([])

  class Process {
    constructor(pid, at, bt, level) {
      this.pid = pid
      this.arrivalTime = at
      this.burstTime = bt
      this.level = level

      this.waitingTime = 0
      this.completionTime = 0
    }
  }

  class Scheduler {
    constructor() {
      this.queues = []
      this.waitingTimes = []
      this.completionTimes = []
    }

    addProcess(process) {
      if (!this.queues[process.level]) {
        this.queues[process.level] = []
      }

      this.queues[process.level].push(process)
    }
  }

  const runFCFS = (queue, scheduler) => {
    const processes = queue.sort((a, b) => a.arrivalTime - b.arrivalTime)

    // For next queue
    let previousCT;

    scheduler.waitingTimes.push(0)

    processes[0].completionTime = processes[0].burstTime
    processes[0].waitingTime = 0

    scheduler.completionTimes.push(processes[0].completionTime)

    // Calculate waiting time and turnaround time for every process
    for (let j = 1; j < processes.length; j++) {
      processes[j].waitingTime += processes[j - 1].completionTime
      processes[j].completionTime += processes[j - 1].completionTime + processes[j].burstTime

      scheduler.waitingTimes.push(processes[j].waitingTime)
      scheduler.completionTimes.push(processes[j].completionTime)

      if (j === processes.length - 1) {
        previousCT = processes[j].completionTime
      }
    }

    return { previousCT }
  }

  const runSJF = (queue, previousCT, scheduler) => {
    const processes = queue.sort((a, b) => a.burstTime - b.burstTime)

    processes[0].waitingTime = previousCT
    processes[0].completionTime = processes[0].waitingTime + processes[0].burstTime

    scheduler.waitingTimes.push(processes[0].waitingTime)
    scheduler.completionTimes.push(processes[0].completionTime)

    // Calculate waiting time and turnaround time for every process
    for (let j = 1; j < processes.length; j++) {
      processes[j].waitingTime += processes[j - 1].completionTime
      processes[j].completionTime += processes[j - 1].completionTime + processes[j].burstTime

      scheduler.waitingTimes.push(processes[j].waitingTime)
      scheduler.completionTimes.push(processes[j].completionTime)

      if (j === processes.length - 1) {
        previousCT = processes[j].completionTime
      }
    }
  }

  // Inputs should include letters
  const validateString = (string) => {
    const regExp = /[a-z]/i

    return !regExp.test(string);
  }

  const runScheduler = () => {
    if (!validateString(arrivalTimeInput.value)) {
      alert("Your arrival time is incorrect")
      return;
    }

    if (!validateString(burstTimeInput.value)) {
      alert("Your burst time is incorrect")
      return;
    }

    const arrivalTimes = arrivalTimeInput.value.split(/(\s+)/).filter((e) => {
      return e.trim().length > 0
    });
    const burstTimes = burstTimeInput.value.split(/(\s+)/).filter((e) => {
      return e.trim().length > 0
    });
    const queues = queueInput.value.split(/(\s+)/).filter((e) => {
      return e.trim().length > 0
    });


    // Validate both fields have the same length
    if (arrivalTimes.length !== burstTimes.length) {
      alert("Arrival time and burst time doesn't have the same length!")
      return;
    }

    const scheduler = new Scheduler()

    let results = []


    for (let i = 0; i < arrivalTimes.length; i++) {
      const process = new Process(i + 1, parseInt(arrivalTimes[i]), parseInt(burstTimes[i]), parseInt(queues[i]))
      scheduler.addProcess(process)
    }

    // Level codes
    // 0 = FCFS
    // 1 = SJF

    let fcfsResults;

    for (let i = 0; i < scheduler.queues.length; i++) {
      const queue = scheduler.queues[i]
      // console.log(queue)

      switch (parseInt(queues[i])) {
        case 0:
          fcfsResults = (runFCFS(queue, scheduler));
          queue.forEach((process) => {
            processes.push(process)
          })
          break;
        case 1:
          runSJF(queue, fcfsResults.previousCT, scheduler)
          queue.forEach((process) => {
            processes.push(process)
          })
          break;
      }

    }

    scheduler.waitingTimes.forEach((wt) => {
      waitingTimes.push(wt)
    })

    scheduler.completionTimes.forEach((ct) => {
      completionTimes.push(ct)
    })

    averageWaitingTime.value = waitingTimes.reduce((a, b) => a + b, 0) / waitingTimes.length
    averageTurnaroundTime.value = completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length

    console.log("waiting times: " + scheduler.waitingTimes)
    console.log("average waiting time: " + scheduler.waitingTimes.reduce((a, b) => a + b, 0) / scheduler.waitingTimes.length)

  }


</script>

<template>
  <section class="d-block d-md-flex gap-4">
    <div class="card p-2 mb-3 shadow w-100">
      <div class="card-body">
        <h5 class="card-title mb-4">
          Multilevel Queue Scheduling
        </h5>

        <hr class="my-4">

        <!-- Arrival Time -->
        <div class="mb-3">
          <label class="form-label">Arrival Time</label>
          <input type="text" class="form-control" placeholder="0 2 3 4 7" v-model="arrivalTimeInput">
        </div>
        <!-- END Arrival Time -->

        <!-- Burst Time -->
        <div class="mb-3">
          <label class="form-label">Burst Time</label>
          <input type="text" class="form-control" placeholder="0 5 7 9 17" v-model="burstTimeInput">
        </div>
        <!-- END Burst Time -->

        <!-- Burst Time -->
        <div class="mb-3">
          <label class="form-label">Queue</label>
          <input type="text" class="form-control" placeholder="1 2 3 4" v-model="queueInput">
          <p class="form-text">0 - FCFS, 1 - SJF</p>
        </div>
        <!-- END Burst Time -->

        <button class="btn btn-success" @click="runScheduler">Run</button>
      </div>
    </div>
    <div class="card p-2 mb-3 shadow w-100">
      <div class="card-body">
        <h5 class="card-title mb-4">
          Results
        </h5>

        <div v-if="processes.length > 0">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">PID</th>
              <th scope="col">Waiting Time</th>
              <th scope="col">Response Time</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="process in processes">
              <th scope="row">{{ process.pid }}</th>
              <td>{{ process.waitingTime }}</td>
              <td>{{ process.completionTime }}</td>
            </tr>
            </tbody>
          </table>

          <p>Average Waiting Time: {{ averageWaitingTime }}</p>
          <p>Average Turnaround Time: {{ averageTurnaroundTime }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>

</style>
