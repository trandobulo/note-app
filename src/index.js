import NoteList from "./js/NoteList.js";
import firstState from "./js/firstState.js";
import { renderSummaryList } from "./js/renderSummaryList.js";
import { renderNoteList } from "./js/renderNoteList.js";
import { renderEditNote } from "./js/editNote.js";

document.addEventListener("DOMContentLoaded", function (e) {
  document.querySelector("#create-note-button").onclick = () => {
    renderEditNote(null, noteList);
  };

  const noteList = new NoteList(firstState);

  renderSummaryList(noteList);
  renderNoteList(noteList);
});
