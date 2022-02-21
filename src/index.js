const itemArray = [];

// get DOM elements as variables for further usage
const input = document.querySelector('.new-name');
const buttonAdd = document.querySelector('.add');
const buttonSortByName = document.querySelector('.sort-name');
const buttonSortByValue = document.querySelector('.sort-value');
const buttonDelete = document.querySelector('.delete');
const buttonShowXML = document.querySelector('.show-xml');
const itemList = document.querySelector('.name-list');
const itemSelectionHandler = document.querySelector('ul');

// perform alpha-numeric check
// note, that only Latin alphabet is supported
function isAlphaNumeric(string) {
  for (let i = 0, len = string.length; i < len; i += 1) {
    const code = string.charCodeAt(i);
    if (!(code > 47 && code < 58) // numeric (0-9)
        && !(code > 64 && code < 91) // upper alpha (A-Z)
        && !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

// split input string with '=' separator and validate name/value parts
function parseInput(string) {
  const array = string.split('=');

  if (array.length === 2) {
    const name = array[0].trim(); // get name and remove spaces
    const value = array[1].trim(); // get value and remove spaces

    if (name.length > 0 && value.length > 0 && isAlphaNumeric(name) && isAlphaNumeric(value)) {
      return [name, value]; // correct input case
    }
  }

  return []; // wrong input case
}

// select item
itemSelectionHandler.addEventListener('click', (event) => {
  let selected;

  if (event.target.tagName === 'LI') {
    selected = document.querySelector('li.selected');

    if (selected) {
      selected.className = '';
    }

    event.target.classList.add('selected');
  }
});

buttonAdd.addEventListener('click', () => {
  // get user input
  const info = input.value;

  const nameValue = parseInput(info);
  if (nameValue.length === 0) { // incorrect input case
    // eslint-disable-next-line no-alert
    alert('Please, enter a valid value');
  } else {
    // store name/value pair
    itemArray.push(nameValue);

    // add new input to itemList
    itemList.insertAdjacentHTML('beforeend', `
      <li>${info}</li>
    `);

    // clear input
    input.value = '';
  }
});

function updateItemList(array, doSortByName) {
  // choose Name index or Value index
  const index = doSortByName ? 0 : 1;

  // sort array by Name or by Value
  const sortedArray = array.sort((prevItem, currentItem) => (
    prevItem[index].localeCompare(currentItem[index])
  ));

  // clear itemList
  itemList.innerHTML = '';

  sortedArray.forEach((item) => (
    // add new item to itemList
    itemList.insertAdjacentHTML('beforeend', `
      <li>${item[0]}=${item[1]}</li>
    `)
  ));
}

buttonSortByName.addEventListener('click', () => {
  const doSortByName = true;
  updateItemList(itemArray, doSortByName);
});

buttonSortByValue.addEventListener('click', () => {
  const doSortByName = false;
  updateItemList(itemArray, doSortByName);
});

buttonDelete.addEventListener('click', () => {
  // get selected item to be deleted
  const selectedItem = document.querySelector('li.selected');

  // extract name and value from selected item
  const nameValueToDelete = selectedItem.textContent.split('=');

  // find index of item in itemArray
  const itemToDelete = itemArray.findIndex((element) => (
    element[0] === nameValueToDelete[0] && element[1] === nameValueToDelete[1]
  ));

  // delete selected item from itemArray
  itemArray.splice(itemToDelete, 1);

  // delete selected item from DOM ul
  selectedItem.innerHTML = '';
});

buttonShowXML.addEventListener('click', () => {
  // use XMLSerializer for DOM elements representation in XML format
  // eslint-disable-next-line no-alert
  alert((new XMLSerializer()).serializeToString(itemList));
});
