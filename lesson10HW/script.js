window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  class Options {
    constructor(height, width, bg, fontSize, textAlign) {
      this.height = height;
      this.width = width;
      this.bg = bg;
      this.fontSize = fontSize;
      this.textAlign = textAlign;
    }
    createNewBox() {
      let box = document.createElement('div'),
          text = prompt('Введите любой текст', '');
      document.body.appendChild(box);
      box.textContent = text;
      box.style.cssText = `height: ${this.height}; width: ${this.width}; background-color: ${this.bg}; font-size: ${this.fontSize}; text-align: ${this.textAlign}`;
    }
  }

  let obj = new Options(`200px`, `500px`, `coral`, `25px`, `center`);

  obj.createNewBox();
  console.log(obj);
});