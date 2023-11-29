<script setup>
  import {reactive, ref} from "vue";

  const noOfRequests = ref(2)

  const requestInputs = reactive([
    {
      location: 0
    },
    {
      location: 0
    }
  ])

  const startingPosition = ref(0)
  // const trackSize = ref(0)
  const seekRate = ref(0)

  const totalHeadMovement = ref(0)
  const seekTime = ref(0)

  const updateRequestForm = () => {
    if (noOfRequests.value < 1) {
      alert("Minimum no. of requests is 1")
      noOfRequests.value = 1
      return
    }

    if (noOfRequests.value > 10) {
      alert("Maximum no. of requests is 10")
      noOfRequests.value = 10
      return
    }

    requestInputs.length = 0

    for (let i = 0; i < noOfRequests.value; i++) {
      requestInputs.push({
        location: 0
      })
    }
  }

  const calculateSSTF = () => {
    let headMovements = 0
    let currentPosition = startingPosition.value

    const requests = []
    for (let i = 0; i < noOfRequests.value; i++) {
      requests.push(requestInputs[i].location)
    }

    while (requests.length > 0) {
      let shortestDistance = Number.MAX_SAFE_INTEGER
      let nextIndex = -1

      for (let i = 0; i < requests.length; i++) {
        const distance = Math.abs(currentPosition - requests[i])

        if (distance < shortestDistance) {
          shortestDistance = distance
          nextIndex = i
        }
      }

      headMovements += shortestDistance
      currentPosition = requests[nextIndex]
      requests.splice(nextIndex, 1)
    }

    // Put out results
    totalHeadMovement.value = headMovements
    seekTime.value = (totalHeadMovement.value / seekRate.value)
  }

</script>

<template>
  <div class="d-block d-md-flex gap-4">

    <div class="card p-2 mb-3 shadow w-100">
      <div class="card-body">

        <h5 class="card-title mb-4">
          Shortest Seek Time First
        </h5>

        <div class="mb-3">
          <label class="form-label">Current Position</label>
          <input type="number" class="form-control" v-model="startingPosition" >
        </div>

<!--        <div class="mb-3">-->
<!--          <label class="form-label">Track Size</label>-->
<!--          <input type="number" class="form-control" v-model="trackSize" >-->
<!--        </div>-->

        <div class="mb-3">
          <label class="form-label">Seek Rate</label>
          <input type="number" class="form-control" v-model="seekRate" >
        </div>

      </div>
    </div>

    <div class="card p-2 mb-3 shadow w-100">
      <div class="card-body">

        <h5 class="card-title mb-4">
          Locations
        </h5>

        <!-- No. of requests -->
        <label class="form-label">No. of Requests</label>
        <div class="row g-3">
          <div class="col-auto">
            <input type="number" class="form-control" placeholder="Number" v-model="noOfRequests">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-secondary mb-3" @click="updateRequestForm">
              Change
            </button>
          </div>
        </div>
        <!-- END No. of requests -->

        <!-- Locations -->
        <div class="col">
          <div v-for="(input, index) in requestInputs">
            <div class="mb-3">
              <label class="form-label">Location {{ index+1 }}</label>
              <input type="number" class="form-control" placeholder="Number" v-model="input.location">
            </div>
          </div>
        </div>
        <!-- END Locations -->

      </div>
    </div>

    <div class="card p-2 mb-3 shadow w-100">
      <div class="card-body">
        <h5 class="card-title mb-4">
          Results
        </h5>

        <p>
          Total Head Movement: <span class="fw-bold">{{ totalHeadMovement }}</span>
        </p>
        <p>
          Seek Time: <span class="fw-bold">{{ seekTime }}</span>
        </p>

        <button class="btn btn-primary mt-3" @click="calculateSSTF">
          Calculate
        </button>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>