<script setup>
  import { ref, reactive } from "vue";

  const numberOfQueue = ref(3)
  const quantum = ref(0)

  const arrivalTimes = ref("")
  const burstTimes = ref("")

  const queueInputs = reactive([
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
    constructor(pid, at, bt, level, priority) {
      this.pid = pid
      this.arrivalTime = at
      this.burstTime = bt
      this.level = level
      this.priority = priority

      this.waitingTime = 0
      this.turnaroundTime = 0
    }
  }

  class Scheduler {
    constructor() {
      this.queues = []
      this.quantum = quantum.value

      for (let i = 1; i <= numberOfQueue.value; i++) {
        this.queues.push([]) // Push empty arrays
      }
    }

    addProcess(process) {
      this.queues[process.priority].push(process)
    }

    runScheduler() {
      let currentTime = 0
      let totalWaitingTime = 0
      let totalTurnaroundTime = 0
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

    queueInputs.length = 0

    for (let i = 0; i < numberOfQueue.value; i++) {
      queueInputs.push({
        value: 0
      })
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

        <!-- Quantum -->
        <label class="form-label">Quantum</label>
        <div class="mb-3">
          <input type="number" class="form-control" placeholder="Number" v-model="quantum">
        </div>
        <!-- END Quantum -->

        <hr class="my-4">

        <div v-for="(queue, index) in queueInputs">
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
                <input type="text" class="form-control" placeholder="0 1 2 4 5">
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
        <label class="form-label">Arrival Time</label>
        <div class="mb-3">
          <input type="number" class="form-control" placeholder="0 2 3 4 7" v-model="arrivalTimes">
        </div>
        <!-- END Arrival Time -->

        <!-- Burst Time -->
        <label class="form-label">Burst Time</label>
        <div class="mb-3">
          <input type="number" class="form-control" placeholder="0 5 7 9 17" v-model="burstTimes">
        </div>
        <!-- END Burst Time -->

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
