import Task from './Task';
import { loadStorage } from './localStorage';

const task = new Task();
task.init();

window.addEventListener('load', loadStorage);
