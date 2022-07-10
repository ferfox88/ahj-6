import createElement from './createElement';
import createContent from './createContent';
import { updateStorage } from './localStorage';

export default class Task {
  init() {
    createElement();
    this.addContent();
    this.container = document.querySelector('.container');
    this.container.addEventListener('click', this.addTask.bind(this));
    this.container.addEventListener('click', this.closeTask.bind(this));
    this.container.addEventListener('click', this.deleteTask.bind(this));
    this.container.addEventListener('mousedown', (e) => this.dragDown(e));
    this.container.addEventListener('mousemove', (e) => this.dragMove(e));
    this.container.addEventListener('mouseleave', (e) => this.dragLeave(e));
    this.container.addEventListener('mouseup', (e) => this.dragUp(e));
  }

  addContent() {
    this.btn = document.querySelectorAll('.button-add');
    this.btn.forEach((el) => {
      el.addEventListener('click', () => {
        el.parentElement.insertAdjacentHTML('beforeend', createContent());
      });
    });
  }

  addTask(e) {
    e.preventDefault();
    if (e.target.classList.contains('content-button-add')) {
      this.column = e.target.parentElement.closest('.column');
      const ul = this.column.querySelector('ul');
      const inputText = this.column.querySelector('.form-text');

      const elementLi = `
<li class='items-item task'>
<span class='task-content'>${inputText.value}</span>
<button class="task-del">✖</button>
</li`;

      ul.insertAdjacentHTML('beforeend', elementLi);
      updateStorage();
    }
  }

  closeTask(e) {
    e.preventDefault();
    if (e.target.classList.contains('content-button-close')) {
      this.content = e.target.parentElement.closest('.content');
      this.content.remove();
    }
  }

  deleteTask(e) {
    e.preventDefault();
    if (e.target.classList.contains('task-del')) {
      this.items = e.target.parentElement.closest('.items-item');
      this.items.remove();
      updateStorage();
    }
  }

  dragDown(e) {
    if (e.target.classList.contains('task-del')) {
      return;
    }
    const dragElement = e.target.closest('.task');
    if (!dragElement) {
      return;
    }
    e.preventDefault();
    document.body.style.cursor = 'grabbing';
    this.dropEl = dragElement.cloneNode(true);
    const {
      width, height, left, top,
    } = dragElement.getBoundingClientRect();
    this.coordX = e.clientX - left;
    this.coordY = e.clientY - top;
    this.dropEl.classList.add('dragged');
    this.dropEl.style.width = `${width}px`;
    this.dropEl.style.height = `${height}px`;
    document.body.appendChild(this.dropEl);
    this.dropEl.style.top = `${top}px`;
    this.dropEl.style.left = `${left}px`;
    this.dragEl = dragElement;
  }

  dragMove(e) {
    e.preventDefault();
    if (!this.dropEl) {
      return;
    }
    document.body.style.cursor = 'grabbing';
    this.dropEl.style.left = `${e.pageX - this.coordX}px`;
    this.dropEl.style.top = `${e.pageY - this.coordY}px`;
  }

  dragLeave() {
    if (!this.dropEl) {
      return;
    }
    this.dropEl.remove();
    this.dropEl = null;
    this.dragEl = null;
  }

  dragUp(e) {
    if (!this.dragEl) {
      return;
    }
    e.preventDefault();
    document.body.style.cursor = 'auto';
    const closest = document.elementFromPoint(e.clientX, e.clientY).closest('.task');
    const columnAct = e.target.closest('.column');
    const itemsAct = columnAct.querySelector('.items');
    if (!itemsAct) {
      this.dropEl.remove();
      return;
    }
    itemsAct.appendChild(this.dragEl, closest);
    updateStorage();
    this.dropEl.remove();
    this.dropEl = null;
  }
}
