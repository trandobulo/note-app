document.querySelector("#create-note-button").onclick = () => {
  handleEditNote(null, notes);
};

function chooseIcon(category) {
  switch (category) {
    case "idea":
      return "../src/svg/idea.svg";
    case "task":
      return "../src/svg/task.svg";
    case "random thougth":
    default:
      return "../src/svg/random-thought.svg";
  }
}

function parseDates(noteObj) {
  const dates = noteObj.content.match(
    /\b(\d\d\D\d\d\D\d\d\d\d)\b|\b(\d\d\D\d\d\D\d\d)\b|\b(\d\D\d\D\d\d)\b|\b(\d\D\d\D\d\d\d\d)\b/g
  );

  if (dates !== null) {
    return dates.length > 2
      ? `${dates[0]}, ${dates[1]}, ...`
      : dates.join(", ");
  }
  return [];
}

function renderNote(noteObj, isNewNote, notes) {
  const row = document.createElement("div");
  row.className = "row";
  row.id = noteObj.id;

  row.innerHTML = `
  <div class="category-icon-container">
    <div class="row__category-icon">
      <img class="action-icon" src=${chooseIcon(noteObj.category)} />
    </div>
  </div>
  ${[noteObj.created, noteObj.category, noteObj.content]
    .map((el) => `<label class="col_content">${el}</label>`)
    .join("")}
    <label class="col_content">${parseDates(noteObj)}</label>
  <div class="actions-container">
    ${(noteObj.active
      ? [
          { src: "../src/svg/pencil.svg", id: "edit-note-button" },
          { src: "../src/svg/archive-box.svg", id: "archive-note-button" },
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

  if (noteObj.active) {
    const noteList = document.querySelector(".note-list");

    isNewNote
      ? noteList.insertBefore(row, noteList.firstChild)
      : document.getElementById(noteObj.id).replaceWith(row);
  } else {
    const thougthArchive = document.querySelector("#random-thought-archive");
    const ideaArchive = document.querySelector("#idea-archive");
    const taskArchive = document.querySelector("#task-archive");

    switch (noteObj.category) {
      case "random thought":
        thougthArchive.append(row);
        break;
      case "idea":
        ideaArchive.append(row);
        break;
      case "task":
        taskArchive.append(row);
        break;
      default:
    }
  }

  row.onclick = function (e) {
    switch (e.target.dataset.id) {
      case "delete-note-button":
        handleDeleteNote(noteObj.id, notes);
        break;
      case "edit-note-button":
        handleEditNote(noteObj, notes);
        break;
      case "archive-note-button":
        handleArchiveNote(noteObj, notes);
        break;
      case "recovery-note-button":
        handleUnarchiveNote(noteObj, notes);
      default:
    }
  };
}

function renderSummary(category, notes) {
  const summaryItem = document.createElement("div");
  const summaryItemName = category.split(" ").join("-");
  summaryItem.id = `${summaryItemName}-archive`;
  summaryItem.innerHTML = `<div class="row_category">
                            <div class="category-icon-container">
                              <div class="row__category-icon">
                                <img class="action-icon" src="../src/svg/${summaryItemName}.svg" />
                              </div>
                            </div>
                            <label class="col_content">${category}</label>
                            <label class="col_content">${
                              notes.totalNotes(category).active
                            }</label>
                            <label class="col_content">${
                              notes.totalNotes(category).archived
                            }</label>
                           </div>`;
  return summaryItem;
}

function renderNoteList(notes) {
  for (let noteObj of notes.noteList) {
    renderNote(noteObj, (isNewNote = true), notes);
  }
}

function renderSummaryList(notes) {
  notes
    .getCategories()
    .forEach((el) =>
      document.querySelector("#summary-list").append(renderSummary(el, notes))
    );
}

function handleEditNote(noteObj, notes) {
  const popUpOverlayer = document.createElement("div");
  popUpOverlayer.className = "create-note-pop-up-overlayer";

  popUpOverlayer.innerHTML = `<div class="create-note-pop-up">
  <label class="create-note-pop-up__selector-label" for="select-category">choose a category:</label>
  <select class="create-note-pop-up__selector" id="select-category" name="select-category" >
    <option class="selector__option" value="random thought">random thought</option>
    <option class="selector__option" value="idea">idea</option>
    <option class="selector__option" value="task">task</option>
  </select>
    <textarea class="create-note-pop-up__note-input" id="note-input"></textarea>
    <div class="create-note-pop-up__buttons-container">
    <button class="button" id="save-note-button">edit note</button>
    <button class="button" id="cancel-note-button">cancel</button>
    </div>
  </div>
  `;

  document.querySelector("html").append(popUpOverlayer);

  if (noteObj !== null) {
    document.querySelector("#select-category").value = noteObj.category;
    document.querySelector("#note-input").value = noteObj.content;
    document
      .querySelector("#save-note-button")
      .addEventListener("click", () => {
        handleSaveNote(notes, false, noteObj);
      });
  } else {
    document
      .querySelector("#save-note-button")
      .addEventListener("click", () => {
        handleSaveNote(notes, true, {});
      });
  }

  document
    .querySelector("#cancel-note-button")
    .addEventListener("click", handleCancel);
}

function handleSaveNote(notes, isNewNote, noteObj) {
  const category = document.querySelector("#select-category").value;
  const content = document.querySelector("#note-input").value;

  if (isNewNote) {
    notes.addNote(category, content);
    renderNote(notes.noteList[notes.noteList.length - 1], isNewNote, notes);
  } else {
    const editedNoteObj = { ...noteObj, category: category, content: content };

    notes.editNote(noteObj.id, editedNoteObj, notes);
    renderNote(editedNoteObj, isNewNote, notes);
  }

  document.querySelector(".create-note-pop-up-overlayer").remove();
}

function handleCancel() {
  document.querySelector(".create-note-pop-up-overlayer").remove();
}

function handleDeleteNote(id, notes) {
  notes.deleteNote(id);

  document.getElementById(id).remove();
}

function handleArchiveNote(noteObj, notes) {
  notes.archiveUnarchiveNote(noteObj.id); // is it okey to use immutability for deleting and not to remove elem apparently

  document.getElementById(noteObj.id).remove();

  renderNote(notes.findNote(noteObj.id), false, notes);
}

function handleUnarchiveNote(noteObj, notes) {
  notes.archiveUnarchiveNote(noteObj.id);

  document.getElementById(noteObj.id).remove();

  renderNote(notes.findNote(noteObj.id), true, notes);
}

renderSummaryList(notes);
renderNoteList(notes);
