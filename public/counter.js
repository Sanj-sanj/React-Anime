// const timer = countingFunc();
let showCountdown;
export default function countdown(nextEp) {
  // const arr = []
  showCountdown = setInterval(() => {
    const now = new Date().getTime();
    const then = new Date();
    then.setSeconds(nextEp);
    const timeApart = then - now;
    if (timeApart < 0) {
      // arr.push('Released')
      return "Released!";
    }
    const days = Math.floor(timeApart / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeApart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeApart % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeApart % (1000 * 60)) / 1000);
    //   console.log({ days, hours, minutes, seconds });
    const formatted = `${days}d ${hours}h ${
      minutes < 10 ? "0" : ""
    }${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
    return formatted;
    // arr.push(formatted)
  }, 1000);
}
// function displayTime(arr) {
//   return arr;
//     const timerArea = document.querySelectorAll(".countdown");
//     timerArea.forEach(function (v, i, a) {
//       v.children[0].textContent = `${arr[i]}`;
//     });
// }
// function display(string) {
//   //   console.log(string);
//   //   console.log(this);
//   return string;
// }

// function countingFunc() {
//   let called = 0;
//   let stringCounter;
//   let arr = [];
//   let cdArr = [];
//   const total = document.querySelector(".card");

//   function countdown(nextEp) {
//     showCountdown = setInterval(() => {
//       timesCalled();
//       console.log(total);
//       const now = new Date().getTime();
//       const then = new Date();
//       then.setSeconds(nextEp);
//       const timeApart = then - now;
//       if (timeApart < 0) {
//         arr.push("Released!");
//         if (called == total) {
//           called = 0;
//           displayTime(arr);
//         }
//         return "Released!";
//       }
//       const days = Math.floor(timeApart / (1000 * 60 * 60 * 24));
//       const hours = Math.floor(
//         (timeApart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor((timeApart % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((timeApart % (1000 * 60)) / 1000);
//       //   console.log({ days, hours, minutes, seconds });
//       arr.push(
//         `${days}d ${hours}h ${minutes < 10 ? "0" : ""}${minutes}m ${
//           seconds < 10 ? "0" : ""
//         }${seconds}s`
//       );
//       if (called == total) {
//         called = 0;
//         displayTime(arr);
//       }
//     }, 1000);
//   }
//   function timesCalled() {
//     called++;
//   }
//   function resetTimer() {
//     //reset the countdown for different pages YOU HAVE TO STORE EACH TIMER IN AN ARRAY TO REFRENCE IT WOOO BOY
//     cdArr.forEach((timer) => clearTimeout(timer));
//     called = 0;
//     cdArr = [];
//     arr = [];
//     return;
//   }
//   function show() {
//     console.log({ called, arr, cdArr });
//   }
//   return { countdown, timesCalled, resetTimer, show };
// }

// function displayTime(arr) {
//   //   return arr;
//   console.log(arr);
//   const timerArea = document.querySelectorAll(".countdown");
//   timerArea.forEach(function (v, i, a) {
//     v.children[0].textContent = `${arr[i]}`;
//   });
// }
// function createCountdowns(cd) {
//   const nextEp = new Date();

//   nextEp.setSeconds(cd);
//   // timer.timesCalled()
//   timer.countdown(nextEp);
// }
// export default timer;
