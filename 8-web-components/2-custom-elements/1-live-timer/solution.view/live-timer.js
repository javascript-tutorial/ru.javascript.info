class LiveTimer extends HTMLElement {

  render() {
    this.innerHTML = `
    <time-formatted hour="numeric" minute="numeric" second="numeric">
    </time-formatted>
    `;

    this.timerElem = this.firstElementChild;
  }

  connectedCallback() { // (2)
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
    this.timer = setInterval(() => this.update(), 1000);
  }

  update() {
    this.date = new Date();
    this.timerElem.setAttribute('datetime', this.date);
    this.dispatchEvent(new CustomEvent('tick', { detail: this.date }));
  }

  disconnectedCallback() {
    clearInterval(this.timer); // важно, чтобы элемент мог быть собранным сборщиком мусора
  }

}

customElements.define("live-timer", LiveTimer);
