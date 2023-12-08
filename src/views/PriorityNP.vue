<script setup>
  import {reactive, ref} from "vue";

  const result = reactive({
    processes: [],
    averageWaitingTime: 0,
    averageTurnaroundTime: 0
  })

  class Process {
    constructor(pid, at, bt, priority) {
      this.pid = pid
      this.arrivalTime = at
      this.burstTime = bt
      this.priority = priority

      this.completionTime = 0
      this.waitingTime = 0
    }
  }

  const scheduleProcesses = (processes) => {
    // Sort processes by their priority
    processes.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.arrivalTime - b.arrivalTime
      }
      return a.priority - b.priority
    });

    let totalWaitingTime = 0
    let totalTurnaroundTime = 0

    // Get the completion time, turnaround time and waiting time for the 1st process
    // For some reason, tracking current time gives different results
    processes[0].completionTime = processes[0].burstTime
    processes[0].waitingTime = 0

    totalWaitingTime += processes[0].waitingTime
    totalTurnaroundTime += processes[0].completionTime

    // Calculate every process starting with 2nd process
    for (let i = 1; i < processes.length; i++) {
      const process = processes[i]

      process.waitingTime += processes[i - 1].completionTime
      process.completionTime += processes[i - 1].completionTime + process.burstTime

      totalWaitingTime += process.waitingTime;
      totalTurnaroundTime += process.completionTime;
    }

    const averageWaitingTime = totalWaitingTime / processes.length
    const averageTurnaroundTime = totalTurnaroundTime / processes.length

    // Put results in array
    processes.forEach(p => result.processes.push(p))

    result.averageWaitingTime = averageWaitingTime
    result.averageTurnaroundTime = averageTurnaroundTime
  }

  const numberOfProcesses = ref(2)

  const arrivalTimes = reactive([
    {
      time: 0
    },
    {
      time: 1
    }
  ])

  const burstTimes = reactive([
    {
      time: 3
    },
    {
      time: 6
    }
  ])

  const priorities = reactive([
    {
      value: 3
    },
    {
      value: 4
    }
  ])

  const updateForms = () => {
    if (numberOfProcesses.value < 2) {
      alert("Minimum no. of processes is 2")
      numberOfProcesses.value = 2
      return
    }

    if (numberOfProcesses.value > 9) {
      alert("Maximum no. of processes is 9")
      numberOfProcesses.value = 9
      return
    }

    arrivalTimes.length = 0
    burstTimes.length = 0
    priorities.length = 0

    for (var j = 0; j < numberOfProcesses.value; j++) {
      arrivalTimes.push({
        time: 0
      })
      burstTimes.push({
        time: 0
      })
      priorities.push({
        value: 0
      })
    }
  }

  const calculatePriority = () => {
    // Reset results
    result.processes = []
    result.averageTurnaroundTime = 0
    result.averageWaitingTime = 0

    // Add the values to an array
    let processes = []

    for (let i = 0; i < numberOfProcesses.value; i++) {
      processes.push(new Process(i+1, arrivalTimes[i].time, burstTimes[i].time, priorities[i].value))
    }

    // Execute the processes
    scheduleProcesses(processes)
  }
</script>

<template>
  <section class="d-block d-md-flex gap-4">
    <div class="card p-2 mb-3 shadow w-100">
      <div class="card-body">
        <h5 class="card-title mb-4">
          Priority (Non-preemptive)
        </h5>

        <!-- Processes -->
        <label class="form-label">No. of processes</label>
        <div class="row g-3">
          <div class="col-auto">
            <input type="number" class="form-control" placeholder="Number" v-model="numberOfProcesses">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3" @click="updateForms">Change</button>
          </div>
        </div>
        <!-- END Processes -->

        <div class="row">

          <!-- Process Label -->
          <div class="col-1">
            <div v-for="(process, index) in priorities" class="process-label">
              <p>P{{ index+1 }}</p>
            </div>
          </div>

          <!-- Arrival Time -->
          <div class="col">
            <p class="fw-bold">Arrival times</p>

            <div v-for="(arrivalTime, index) in arrivalTimes">
              <div class="mb-3">
                <label class="form-label">AT{{ index+1 }}</label>
                <input type="number" class="form-control" placeholder="Number" v-model="arrivalTime.time">
              </div>
            </div>
          </div>
          <!-- END Arrival Time -->

          <!-- Burst Time -->
          <div class="col">
            <p class="fw-bold">Burst times</p>

            <div v-for="(burstTime, index) in burstTimes">
              <div class="mb-3">
                <label class="form-label">BT{{ index+1 }}</label>
                <input type="number" class="form-control" placeholder="Number" v-model="burstTime.time">
              </div>
            </div>

          </div>
          <!-- END Burst Time -->

          <!-- Priority -->
          <div class="col">
            <p class="fw-bold">Priority</p>

            <div v-for="(priority, index) in priorities">
              <div class="mb-3">
                <label class="form-label">P{{ index+1 }}</label>
                <input type="number" class="form-control" placeholder="Number" v-model="priority.value">
              </div>
            </div>

          </div>
          <!-- END Priority -->

        </div>

        <button class="btn btn-primary mt-3" @click="calculatePriority">
          Calculate
        </button>

      </div>
    </div>
    <div class="card p-2 mb-3 shadow w-100">
      <div class="card-body">
        <h5 class="card-title mb-4">
          Results
        </h5>

        <div v-if="result.processes.length > 0">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">PID</th>
              <th scope="col">Waiting Time</th>
              <th scope="col">Turnaround Time</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="process in result.processes">
              <th scope="row">{{ process.pid }}</th>
              <td>{{ process.waitingTime }}</td>
              <td>{{ process.completionTime }}</td>
            </tr>
            </tbody>
          </table>

          <p>Average Waiting Time: {{ result.averageWaitingTime }}</p>
          <p>Average Turnaround Time: {{ result.averageTurnaroundTime }}</p>
        </div>

        <div v-else>No results yet.</div>

      </div>
    </div>
  </section>
</template>

<style scoped>
  .process-label:first-child {
    margin-top: 5rem;
  }
  .process-label {
    margin-top: 3.9rem;
    margin-bottom: 0;
  }
</style>
