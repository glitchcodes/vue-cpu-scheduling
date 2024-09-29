# CPU / Disk Scheduler Simulator

This document will serve as our documentation for our alternative assessment at ICS26012 Operating System course.
This repository contains the assigned algorithms to us:

- Priority (Non-preemptive)
- Multilevel Queue System
- Shortest Seek Time First

## Authors
Maria Maal Marquez\
Dane Ocampo\
Rod Lawrence Policarpio\
Vincent Paul Tampos - [Github](https://github.com/glitchcodes/)

## The Algorithms

This section of the document explains the algorithms that we have implemented
in the project. One preemptive, one non-preemptive, and one disk scheduler

### Priority (Non-preemptive)

In this algorithm, the process executing at the moment is not interrupted if a new process arrives with a higher priority than the one currently running. Instead, the newly arrived process is positioned in front of the ready queue based on its queue priority. Additionally, the newly arrived process will receive the CPU after the currently running process has finished.

The systems that wish to guarantee that higher priority processes receive the CPU for a predetermined period before lower priority processes are considered and where processes with fixed priority levels frequently employ non-preemptive priority scheduling. While it is easier to implement than preemptive scheduling algorithms, it might not be appropriate for real-time computing or systems needing more responsiveness.

### Multilevel Queue System

The multilevel queue algorithm organizes processes into multiple queues based on their priority or other attributes. The processes are divided into queues based on their priority level and executed based on their queue position. Multilevel queue scheduling has multiple features: multiple queues, priorities assigned, preemption, scheduling algorithm, feedback mechanism, efficient allocation of CPU time, fairness, and customization.

Like any other algorithm, multilevel queue scheduling has advantages and disadvantages. The advantages are low scheduling overhead, efficient allocation of CPU time, fairness, customization, prioritization, and preemption. The disadvantages are that some processes may starve for CPU if some higher priority queues are never becoming empty, it is also inflexible, and there may be added complexity in implementing and maintaining queues and scheduling algorithms.

A multilevel queuing system algorithm's goal is to schedule effectively and rank processes so that they can be distinguished according to requirements or importance. It enables handling high- and low-priority activities equally while guaranteeing that every process is eventually carried out.


### Shortest Seek Time First

The  SSTF or Shortest Seek Time First chooses the request closest to the head position before moving the head away to handle other requests. The request with the shortest seek time from the present head position is chosen to achieve this. 

The advantages of SSTF or Shortest Job Time First is that throughput is better than FCFS (Firist Come Firse Serve) Disk Scheduling Algorithm, and its average response time is minimized due to fewer head movements. As for its disadvantages, starvation of a request occurs if it has a higher seek time than the other requests in the queue, even if it may have arrived first. 

Overall, the SSTF algorithm is a widely used disk scheduling method that minimizes disk head movement, selects requests with the least search time, and lowers overall latency to balance efficiency and responsiveness.

## User Manual

For convenience’s sake, this repository is hosted online on netlify
without needing to install dependencies and hosting locally.
You can easily access the website by going into this link: https://cpu-disk-scheduler.netlify.app/

### Manual Install
To run the project locally on the device, you must have the following requirements:
- Git
- NodeJS
- NPM

To start, run the following commands in your terminal (without the $)
```bash
$ git clone https://github.com/glitchcodes/cpu-disk-scheduling.git
$ cd cpu-disk-scheduling
$ npm install
$ npm run dev
```
After running `npm run dev`, the terminal should display a link that will
allow you to visit the website.

## Summary and Conclusion

In operating systems, various scheduling algorithms are employed to manage the execution of processes efficiently. 

The non-preemptive priority scheduling algorithm assigns a priority number to each process, allowing the system to execute the one with the highest priority first. Unlike preemptive systems, the currently running process is not interrupted when a higher-priority process arrives; instead, the new process is placed in the ready queue and given CPU time after the current process completes. While this algorithm is more straightforward to implement, it may need to be better suited for real-time systems or those requiring high responsiveness.

Another scheduling approach is the multilevel queue system, which categorizes processes into different queues based on priority or attributes. This system offers flexibility through multiple queues, priority assignment, preemption, and a feedback mechanism. However, it comes with challenges such as potential starvation and increased complexity in managing and implementing queues and scheduling algorithms.

The Shortest Seek Time First (SSTF) algorithm is designed explicitly for disk scheduling, aiming to minimize seek time and enhance disk access efficiency. It selects the request closest to the current head position, reducing overall search time and improving throughput. Despite its advantages in minimizing latency and head movements, the SSTF algorithm can lead to the starvation of specific requests with higher seek times.

In conclusion, each scheduling algorithm serves a specific purpose, and the choice depends on the system's requirements. Non-preemptive priority scheduling is straightforward but may need more responsiveness. Multilevel queue systems offer flexibility but may require careful management. SSTF enhances disk access efficiency but may lead to specific requests being starved. The selection of an algorithm should align with the characteristics and demands of the system at hand.