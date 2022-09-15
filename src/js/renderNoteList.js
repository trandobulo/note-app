import { renderEditNote } from "./editNote.js";
import {
  handleArchiveNote,
  handleDeleteNote,
  handleUnarchiveNote,
} from "./handlers.js";

function parseDates(noteObj) {
  const dates = noteObj.content.match(
    /\b\d{1,2}[\/\.-]\d{1,2}[\\\/.-]\d{4}\b/g
  );

  if (dates !== null) {
    return dates.length > 2
      ? `${dates[0]}, ${dates[1]}, ...`
      : dates.join(", ");
  }
  return [];
}

const rowTemplate = (noteObj) => {
  return `<div class="col_icon">
          <div class="row__category-icon">
            <img class="action-icon" src="../src/svg/${noteObj.category
              .split(" ")
              .join("-")}.svg" />
          </div>
        </div>
        ${[
          noteObj.created,
          noteObj.category,
          noteObj.content,
          parseDates(noteObj),
        ]
          .map((el) => `<p class="col_content">${el}</p>`)
          .join("")}
        <div class="row__actions-container ">
          ${(noteObj.active
            ? [
                { src: "../src/svg/pencil.svg", id: "edit-note-button" },
                {
                  src: "../src/svg/archive-box.svg",
                  id: "archive-note-button",
                },
                { src: "../src/svg/trash.svg", id: "delete-note-button" },
              ]
            : [
                { src: "../src/svg/recovery.svg", id: "recovery-note-button" },
                { src: "../src/svg/trash.svg", id: "delete-note-button" },
              ]
          )
            .map(
              (el) =>
                `<button class="action-icon" data-id=${el.id}><img data-id=${el.id} src=${el.src} /></button>`
            )
            .join("")}
        </div>`;
};

function renderNote(noteObj, isNewNote, noteList) {
  const row = document.createElement("div");
  row.className = "row";
  row.id = noteObj.id;

  row.innerHTML = rowTemplate(noteObj);

  if (noteObj.active) {
    const notes = document.querySelector(".note-list");

    isNewNote
      ? notes.insertBefore(row, notes.firstChild)
      : document.getElementById(noteObj.id).replaceWith(row);
  } else {
    switch (noteObj.category) {
      case "random thought":
        document.querySelector("#random-thought-archive").append(row);
        break;
      case "idea":
        document.querySelector("#idea-archive").append(row);
        break;
      case "task":
        document.querySelector("#task-archive").append(row);
        break;
      default:
    }
  }

  row.onclick = (e) => {
    switch (e.target.dataset.id) {
      case "delete-note-button":
        handleDeleteNote(noteObj.id, noteList);
        break;
      case "edit-note-button":
        renderEditNote(noteObj, noteList);
        break;
      case "archive-note-button":
        handleArchiveNote(noteObj, noteList);
        break;
      case "recovery-note-button":
        handleUnarchiveNote(noteObj, noteList);
        break;
      default:
        row.className === "row"
          ? (row.className = "row row_active")
          : (row.className = "row");
    }
  };
}

function renderNoteList(noteList) {
  for (let noteObj of noteList.notes) {
    renderNote(noteObj, true, noteList);
  }
}

export { renderNote, renderNoteList };
