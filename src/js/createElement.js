export default function createElement() {
  document.body.innerHTML = `<div class="container">
      <div class='column'>
        <h3 class='title'>Todo</h3>
        <button class='button-add'>+ Add another card</button>
        <ul class='items todo'></ul>
      </div>
      <div class='column'>
        <h3 class='title'>In progress</h3>
        <button class='button-add'>+ Add another card</button>
        <ul class='items in-progress'></ul>
      </div>
      <div class='column'>
        <h3 class='title'>Done</h3>
        <button class='button-add'>+ Add another card</button>
        <ul class='items done'></ul>
      </div>
    </div>`;
}
