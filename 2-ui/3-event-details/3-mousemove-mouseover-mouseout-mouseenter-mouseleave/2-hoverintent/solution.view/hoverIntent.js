'use strict';

class HoverIntent {

  constructor({
    sensitivity = 0.1, // скорость ниже 0.1px/ms значит "курсор на элементе"
    interval = 100,    // измеряем скорость каждые 100ms
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // убедитесь, что "this" сохраняет своё значение для обработчиков.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // и в функции, измеряющей время (вызываемой из setInterval)
    this.trackSpeed = this.trackSpeed.bind(this);

    elem.addEventListener("mouseover", this.onMouseOver);

    elem.addEventListener("mouseout", this.onMouseOut);

  }

  onMouseOver(event) {

    if (this.isOverElement) {
      // Игнорируем событие над элементом,
      // так как мы уже измеряем скорость
      return;
    }

    this.isOverElement = true;

    // после каждого движения измеряем дистанцию
    // между предыдущими и текущими координатами курсора
    // если скорость меньше sensivity, то она считается медленной

    this.prevX = event.pageX;
    this.prevY = event.pageY;
    this.prevTime = Date.now();

    elem.addEventListener('mousemove', this.onMouseMove);
    this.checkSpeedInterval = setInterval(this.trackSpeed, this.interval);
  }

  onMouseOut(event) {
    // если ушли с элемента
    if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
      this.isOverElement = false;
      this.elem.removeEventListener('mousemove', this.onMouseMove);
      clearInterval(this.checkSpeedInterval);
      if (this.isHover) {
        // если была остановка движения на элементе
        this.out.call(this.elem, event);
        this.isHover = false;
      }
    }
  }

  onMouseMove(event) {
    this.lastX = event.pageX;
    this.lastY = event.pageY;
    this.lastTime = Date.now();
  }

  trackSpeed() {

    let speed;

    if (!this.lastTime || this.lastTime == this.prevTime) {
      // курсор не двигался
      speed = 0;
    } else {
      speed = Math.sqrt(
        Math.pow(this.prevX - this.lastX, 2) +
        Math.pow(this.prevY - this.lastY, 2)
      ) / (this.lastTime - this.prevTime);
    }

    if (speed < this.sensitivity) {
      clearInterval(this.checkSpeedInterval);
      this.isHover = true;
      this.over.call(this.elem, event);
    } else {
      // скорость высокая, запоминаем новые координаты
      this.prevX = this.lastX;
      this.prevY = this.lastY;
      this.prevTime = this.lastTime;
    }
  }

  destroy() {
    elem.removeEventListener('mousemove', this.onMouseMove);
    elem.removeEventListener('mouseover', this.onMouseOver);
    elem.removeEventListener('mouseout', this.onMouseOut);
  }

}
