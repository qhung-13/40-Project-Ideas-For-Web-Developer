const notesContainer = document.querySelector(
  ".notes-container",
) as HTMLElement;
const createButton = document.querySelector(".btn") as HTMLElement;

let notes: NodeListOf<HTMLElement>;

const showNotes = () => {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
};
showNotes();

const updateStorage = () => {
  localStorage.setItem("notes", notesContainer.innerHTML);
};

createButton.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");

  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";

  notesContainer.appendChild(inputBox).appendChild(img);
});

notesContainer.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (target.tagName === "IMG") {
    target.parentElement?.remove();
    updateStorage();
  } else if (target.tagName === "P") {
    notes = document.querySelectorAll(".input-box") as NodeListOf<HTMLElement>;
    notes.forEach((item) => {
      item.onkeyup = function () {
        updateStorage();
      };
    });
  }
});
