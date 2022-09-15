import { handleSaveNote, handleCancel } from "./handlers.js";

const editNoteTemplate = (noteObj) => {
  return `<div class="create-note-pop-up">
  <label class="create-note-pop-up__selector-label" for="select-category">choose category:</label>
  <select class="create-note-pop-up__selector" id="select-category" name="select-category" >
    <option class="create-note-pop-up__selector__options" value="random thought">random thought</option>
    <option class="create-note-pop-up__selector__options" value="idea">idea</option>
    <option class="create-note-pop-up__selector__options" value="task">task</option>
  </select>
    <textarea class="create-note-pop-up__note-input" id="note-input"></textarea>
    <div class="create-note-pop-up__buttons-container">
    <button class="button" id="save-note-button">${
      noteObj === null ? "save note" : "edit note"
    }</button>
    <button class="button" id="cancel-note-button">cancel</button>
    </div>
  </div>
  `;
};

function renderEditNote(noteObj, noteList) {
  const popUpOverlayer = document.createElement("div");

  popUpOverlayer.className = "create-note-pop-up-overlayer";

  popUpOverlayer.innerHTML = editNoteTemplate(noteObj);

  document.querySelector("body").append(popUpOverlayer);

  if (noteObj !== null) {
    document.querySelector("#select-category").value = noteObj.category;
    document.querySelector("#note-input").value = noteObj.content;
    document
      .querySelector("#save-note-button")
      .addEventListener("click", () => {
        handleSaveNote(noteList, false, noteObj);
      });
  } else {
    document
      .querySelector("#save-note-button")
      .addEventListener("click", () => {
        handleSaveNote(noteList, true, {});
      });
  }

  document
    .querySelector("#cancel-note-button")
    .addEventListener("click", handleCancel);

  document.querySelector("#note-input").focus();
}

export { renderEditNote };
