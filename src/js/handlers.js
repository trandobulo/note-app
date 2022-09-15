import { renderNote } from "./renderNoteList.js";
import { changeSummaryCount } from "./utils.js";

function handleSaveNote(noteList, isNewNote, noteObj) {
  const category = document.querySelector("#select-category").value;
  const content = document.querySelector("#note-input").value;

  try {
    if (content.length < 3) {
      throw new Error("Note must be at least 3 characters");
    }

    if (isNewNote) {
      noteList.addNote(category, content);
      renderNote(
        noteList.notes[noteList.notes.length - 1],
        isNewNote,
        noteList
      );
    } else {
      const editedNoteObj = {
        ...noteObj,
        category: category,
        content: content,
      };

      noteList.editNote(noteObj.id, editedNoteObj, noteList);
      renderNote(editedNoteObj, isNewNote, noteList);
    }
    document.querySelector(".create-note-pop-up-overlayer").remove();
  } catch (e) {
    alert(e);
  }
}

function handleCancel() {
  document.querySelector(".create-note-pop-up-overlayer").remove();
}

function handleDeleteNote(id, noteList) {
  const noteObj = noteList.getNote(id);

  changeSummaryCount(noteObj, "delete");

  noteList.deleteNote(id);

  document.getElementById(id).remove();
}

function handleArchiveNote(noteObj, noteList) {
  noteList.archiveUnarchiveNote(noteObj.id); // is it okey to use immutability for deleting and not to remove elem apparently

  document.getElementById(noteObj.id).remove();

  renderNote(noteList.getNote(noteObj.id), false, noteList);

  changeSummaryCount(noteObj, "archive");
}

function handleUnarchiveNote(noteObj, noteList) {
  noteList.archiveUnarchiveNote(noteObj.id);

  document.getElementById(noteObj.id).remove();

  renderNote(noteList.getNote(noteObj.id), true, noteList);

  changeSummaryCount(noteObj, "unarchive");
}

export {
  handleSaveNote,
  handleCancel,
  handleDeleteNote,
  handleArchiveNote,
  handleUnarchiveNote,
};
