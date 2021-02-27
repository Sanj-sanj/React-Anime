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
  if (innerWidth < 991) {
    slides.length >= 5 ? (ammount = 5) : (ammount = slides.length);
    return ammount;
  }
  slides.length >= 6 ? (ammount = 6) : (ammount = slides.length);
  return ammount;
}
function slidesToDisplayCalendar(slides, innerWidth) {
  let ammount;
  if (innerWidth < 526) {
    slides.length >= 1 ? (ammount = 1) : (ammount = slides.length);
    return ammount;
  }
  if (innerWidth < 753) {
    slides.length >= 2 ? (ammount = 2) : (ammount = slides.length);
    return ammount;
  }
  if (innerWidth < 997) {
    slides.length >= 3 ? (ammount = 3) : (ammount = slides.length);
    return ammount;
  }
  if (innerWidth < 1230) {
    slides.length >= 4 ? (ammount = 4) : (ammount = slides.length);
    return ammount;
  }
  slides.length >= 5 ? (ammount = 5) : (ammount = slides.length);
  return ammount;
}
export { characterSlidesToDisplay, slidesToDisplayCalendar };
