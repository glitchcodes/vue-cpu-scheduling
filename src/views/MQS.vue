<script setup>
  import { ref, reactive } from "vue";

  const numberOfQueue = ref(3)
  const quantumInput = ref(0)
  const prioritiesInput = ref("")

  const arrivalTimeInput = ref("0 3 5 9 12 10 2")
  const burstTimeInput = ref("3 10 8 12 20 29 1")
  const queueInput = ref("0 1 2 1 0 2 0")

  const levels = reactive([
    {
      value: 0
    },
    {
      value: 1
    },
    {
      value: 2
    }
  ])

  const processes = reactive([])

  class Process {
    constructor(pid, at, bt, level) {
      this.pid = pid
      this.arrivalTime = at
      this.burstTime = bt
      this.level = level

      this.waitingTime = 0
      this.turnaroundTime = 0
    }
  }

  class Scheduler {
    constructor() {
      this.queues = []
      this.quantum = quantumInput.value

      for (let i = 1; i <= numberOfQueue.value; i++) {
        this.queues.push([]) // Push empty arrays
      }
    }

    addProcess(process) {
      this.queues[process.level].push(process)
    }

    runScheduler() {
      let currentTime = 0
      let totalWaitingTime = 0
      let totalTurnaroundTime = 0

      for (const process in processes) {
        this.addProcess(process)
      }
    }
  }

  const updateForms = () => {
    if (numberOfQueue.value < 1) {
      alert("Minimum no. of queue is 1")
      numberOfQueue.value = 1
      return
    }

    if (numberOfQueue.value > 3) {
      alert("Maximum no. of queue is 3")
      numberOfQueue.value = 3
      return
    }

    levels.length = 0

    for (let i = 0; i < numberOfQueue.value; i++) {
      levels.push({
        value: 0
      })
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

    const arrivalTimes = arrivalTimeInput.value.split(/(\s+)/).filter( (e) => { return e.trim().length > 0 } );
    const burstTimes = burstTimeInput.value.split(/(\s+)/).filter( (e) => { return e.trim().length > 0 } );
    const queues = queueInput.value.split(/(\s+)/).filter( (e) => { return e.trim().length > 0 } );


    // Validate both fields have the same length
    if (arrivalTimes.length !== burstTimes.length) {
      alert("Arrival time and burst time doesn't have the same length!")
      return;
    }

    const scheduler = new Scheduler()
    let currentQueue = scheduler.queues[0]
    let currentTime = 0
    let totalWaitingTime = 0
    let turnaroundTime = 0

    for (let i = 0; i < arrivalTimes.length; i++) {
      const process = new Process(i + 1, arrivalTimes[i], burstTimes[i], queues[i])
      scheduler.addProcess(process)
    }

    // Run first queue
    if (levels[0].value === 0) {
      const processes = currentQueue.sort((a,b) => a.arrivalTime - b.arrivalTime)

      for (const process of processes) {
        // process.waitingTime = currentTime - process.
      }
    }
  }

</script>

<template>
  <section class="d-block d-md-flex gap-4">
    <div class="card p-2 mb-3 shadow w-100">
      <div class="card-body">
        <h5 class="card-title mb-4">
          Multilevel Queue Scheduling
        </h5>

        <!-- Queue -->
        <label class="form-label">No. of Queue</label>
        <div class="row g-3">
          <div class="col-auto">
            <input type="number" class="form-control" placeholder="Number" v-model="numberOfQueue">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3" @click="updateForms">Change</button>
          </div>
        </div>
        <!-- END Queue -->

        <hr class="my-4">

        <div v-for="(queue, index) in levels">
          <template v-if="parseInt(queue.value) === 2">
            <form class="row g-3 mb-3">
              <div class="col">
                <label class="form-label">Queue {{ index+1 }}</label>
                <select class="form-select" v-model="queue.value">
                  <option value="0">First Come First Serve</option>
                  <option value="1">Shortest Job First</option>
                  <option value="2">Priority</option>
                  <option value="3">Round Robin</option>
                </select>
              </div>
              <div class="col">
                <label class="form-label">Priority</label>
                <input v-model="prioritiesInput" type="text" class="form-control" placeholder="0 1 2 4 5">
              </div>
            </form>
          </template>
          <template v-else-if="parseInt(queue.value) === 3">
            <form class="row g-3 mb-3">
              <div class="col">
                <label class="form-label">Queue {{ index+1 }}</label>
                <select class="form-select" v-model="queue.value">
                  <option value="0">First Come First Serve</option>
                  <option value="1">Shortest Job First</option>
                  <option value="2">Priority</option>
                  <option value="3">Round Robin</option>
                </select>
              </div>
              <div class="col">
                <label class="form-label">Quantum</label>
                <input v-model="quantumInput" type="number" class="form-control" placeholder="1">
              </div>
            </form>
          </template>
          <template v-else>
            <div class="mb-3">
              <label class="form-label">Queue {{ index+1 }}</label>
              <select class="form-select" v-model="queue.value">
                <option value="0">First Come First Serve</option>
                <option value="1">Shortest Job First</option>
                <option value="2">Priority</option>
                <option value="3">Round Robin</option>
              </select>
            </div>
          </template>
        </div>

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
      </div>
    </div>
  </section>
</template>

<style>

</style>
