'use strict';

const itemArray = [];

// get DOM elements as variables for further usage
const input = document.querySelector('.new-name');
const buttonAdd = document.querySelector('.add');
const buttonSortByName = document.querySelector('.sort-name');
const buttonSortByValue = document.querySelector('.sort-value');
const buttonDelete = document.querySelector('.delete');
const buttonShowXML = document.querySelector('.show-xml');
const itemList = document.querySelector('.name-list');
const selectionHandler = document.querySelector('ul');

// alpha-numeric check from here:
// https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
// note, that only Latin alphabet is supported
function isAlphaNumeric(string) {
  let code, i, len;

  for (i = 0, len = string.length; i < len; i++) {
    code = string.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

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

// adopted from here:
// https://stackoverflow.com/questions/33246967/select-item-from-unordered-list-in-html
selectionHandler.addEventListener('click', (event) => {
  let selected;

  if(event.target.tagName === 'LI') {
    selected = document.querySelector('li.selected');

    if (selected) {
      selected.className = '';
    }

    event.target.className = 'selected';
  }
});

buttonAdd.addEventListener('click', (event) => {
  // get user input
  const info = input.value;

  const nameValue = parseInput(info);
  if (nameValue.length === 0) { // incorrect input case
    alert('Please, enter a valid value');
  } else {
    // store name/value pair
    itemArray.push(nameValue);

    // add new input to itemList
    itemList.insertAdjacentHTML('beforeend', `
      <li>${info}</li>
    `
    );

    // clear input
    input.value = '';
  }
});

buttonSortByName.addEventListener('click', (event) => {
  const sortedArray = itemArray.sort((prevItem, currentItem) => 
    prevItem[0].localeCompare(currentItem[0]));

  // clear itemList
  itemList.innerHTML = "";

  for (const item of sortedArray) {
    // add new item to itemList
    itemList.insertAdjacentHTML('beforeend', `
      <li>${item[0]}=${item[1]}</li>
    `
    );
  }

  console.log(sortedArray);
});

buttonSortByValue.addEventListener('click', (event) => {
  const sortedArray = itemArray.sort((prevItem, currentItem) => 
    prevItem[1].localeCompare(currentItem[1]));

  // clear itemList
  itemList.innerHTML = "";

  for (const item of sortedArray) {
    // add new item to itemList
    itemList.insertAdjacentHTML('beforeend', `
      <li>${item[0]}=${item[1]}</li>
    `
    );
  }
});

buttonDelete.addEventListener('click', (event) => {
  // get selected item to be deleted
  const selectedItem = document.querySelector('li.selected');

  // extract name and value from selected item
  const nameValueToDelete = selectedItem.textContent.split('=');

  // find index of item in itemArray
  const itemToDelete = itemArray.findIndex(element => 
    (element[0] === nameValueToDelete[0] && element[1] === nameValueToDelete[1]));

  // delete selected item from itemArray
  itemArray.splice(itemToDelete, 1);

  // delete selected item from DOM ul
  selectedItem.innerHTML = "";
});

buttonShowXML.addEventListener('click', (event) => {
  // use XMLSerializer for DOM elements representation in XML format
  alert((new XMLSerializer()).serializeToString(itemList));
});
