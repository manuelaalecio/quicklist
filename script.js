const addItemButton = document.querySelector("#add-item-button");
const itemList = document.querySelector("#item-list");
const newItemInput = document.querySelector("#new-item");
const alertElement = document.querySelector("#alert");
const alertCloseButton = document.querySelector("#alert-close");

function saveList() {
  const items = [];
  document.querySelectorAll(".list-item").forEach((item) => {
    const text = item.querySelector(".item-text").textContent;
    const isChecked = item.querySelector(".checkbox").checked;
    items.push({ text, isChecked });
  });
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

function loadList() {
  const storedItems = JSON.parse(localStorage.getItem("shoppingList"));
  if (storedItems) {
    storedItems.forEach((item) => {
      const newItem = createListItem(item.text, item.isChecked);
      itemList.appendChild(newItem);
    });
  }
}

function createListItem(text, isChecked = false) {
  const newItem = document.createElement("div");
  newItem.classList.add("list-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = isChecked;

  const itemTextElement = document.createElement("span");
  itemTextElement.classList.add("item-text");
  itemTextElement.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = '<img src="./assets/trash.svg" alt="lixo" />';

  deleteButton.addEventListener("click", () => {
    newItem.remove();
    showAlert();
    saveList();
  });

  checkbox.addEventListener("change", () => {
    itemTextElement.style.textDecoration = checkbox.checked
      ? "line-through"
      : "none";
    saveList();
  });

  newItem.appendChild(checkbox);
  newItem.appendChild(itemTextElement);
  newItem.appendChild(deleteButton);

  return newItem;
}

addItemButton.addEventListener("click", () => {
  const itemText = newItemInput.value.trim();
  if (itemText) {
    const newItem = createListItem(itemText);
    itemList.appendChild(newItem);
    newItemInput.value = "";
    saveList();
  }
});

newItemInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const itemText = newItemInput.value.trim();
    if (itemText) {
      const newItem = createListItem(itemText);
      itemList.appendChild(newItem);
      newItemInput.value = "";
      saveList();
    }
  }
});

alertCloseButton.addEventListener("click", () => {
  alertElement.style.display = "none";
});

function showAlert() {
  alertElement.style.display = "flex";
  setTimeout(() => {
    alertElement.style.display = "none";
  }, 3000);
}

loadList();
