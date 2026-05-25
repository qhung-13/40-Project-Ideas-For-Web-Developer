const notesContainer = document.querySelector(".notes-container");
const createButton = document.querySelector(".btn");
let notes;
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
notesContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "IMG") {
        target.parentElement?.remove();
        updateStorage();
    }
    else if (target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach((item) => {
            item.onkeyup = function () {
                updateStorage();
            };
        });
    }
});
export {};
//# sourceMappingURL=index.js.map