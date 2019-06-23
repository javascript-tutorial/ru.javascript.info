
form.onclick = function(event) {
  event.target.style.backgroundColor = 'yellow';

  // браузеру нужно некоторое время, чтобы зарисовать всё жёлтым
  setTimeout(() => {
    alert("target = " + event.target.tagName + ", this=" + this.tagName);
    event.target.style.backgroundColor = ''
  }, 0);
};
