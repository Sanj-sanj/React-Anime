function characterSlidesToDisplay(slides, innerWidth) {
  let ammount;
  if (innerWidth < 567) {
    slides.length >= 3 ? (ammount = 3) : (ammount = slides.length);
    return ammount;
  }
  if (innerWidth < 768) {
    slides.length >= 4 ? (ammount = 4) : (ammount = slides.length);
    return ammount;
  }
  if (innerWidth < 992) {
    slides.length >= 5 ? (ammount = 5) : (ammount = slides.length);
    return ammount;
  }
  slides.length >= 6 ? (ammount = 6) : (ammount = slides.length);
  return ammount;
}
function slidesToDisplayCalendar(slides, innerWidth) {
  let ammount;
  if (innerWidth < 768) {
    slides.length >= 1 ? (ammount = 1) : (ammount = slides.length);
    return ammount;
  }
  if (innerWidth < 992) {
    slides.length >= 2 ? (ammount = 2) : (ammount = slides.length);
    return ammount;
  }
  if (innerWidth < 1200) {
    slides.length >= 3 ? (ammount = 3) : (ammount = slides.length);
    return ammount;
  }
  slides.length >= 4 ? (ammount = 4) : (ammount = slides.length);
  return ammount;
}
// function slidesToDisplay(len, innerWidth) {
//   let ammount;
//   if (innerWidth < 768) {
//     len >= 1 ? (ammount = 1) : (ammount = len);
//     return ammount;
//   }
//   if (innerWidth < 992) {
//     len >= 2 ? (ammount = 2) : (ammount = len);
//     return ammount;
//   }
//   if (innerWidth < 1200) {
//     len >= 3 ? (ammount = 3) : (ammount = len);
//     return ammount;
//   }
//   len >= 4 ? (ammount = 4) : (ammount = len);
//   return ammount;
// }
export { characterSlidesToDisplay, slidesToDisplayCalendar };
