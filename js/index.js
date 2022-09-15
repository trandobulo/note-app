import NoteList from "./NoteList.js";
import firstState from "./firstState.js";
import { renderSummaryList } from "./renderSummaryList.js";
import { renderNoteList } from "./renderNoteList.js";
import { renderEditNote } from "./renderEditNote.js";

document.addEventListener("DOMContentLoaded", function (e) {
  document.querySelector("#create-note-button").onclick = () => {
    renderEditNote(null, noteList);
  };

  const noteList = new NoteList();

  firstState.forEach((el) => noteList.addNote(el.category, el.content));

  renderSummaryList(noteList);
  renderNoteList(noteList);
});
