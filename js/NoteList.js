class NoteList {
  constructor() {
    this.notes = [];
  }

  addNote(category, content) {
    const date = new Date();

    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    const noteObj = {
      category: category,
      created: `${
        monthNames[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`,
      content: content,
      id: `${this.notes.length}`,
      active: true,
    };
    this.notes.push(noteObj);
  }

  getNoteIndex(id) {
    return this.notes.findIndex((note) => note.id === id);
  }

  getNote(id) {
    return this.notes.find((note) => note.id === id);
  }

  deleteNote(id) {
    this.notes.splice(this.getNoteIndex(id), 1);
  }

  editNote(id, noteObj) {
    this.notes[this.getNoteIndex(id)] = { ...noteObj };
  }

  archiveUnarchiveNote(id) {
    this.notes[this.getNoteIndex(id)].active =
      !this.notes[this.getNoteIndex(id)].active;
  }

  getTotalActiveArchiveNotes(category) {
    return this.notes.reduce(
      function (total, note) {
        if (note.category === category) {
          if (note.active) {
            total.active++;
            return total;
          } else {
            total.archived++;
            return total;
          }
        }
        return total;
      },
      { active: 0, archived: 0 }
    );
  }

  getCategories() {
    let categories = [];

    for (let note of this.notes) {
      if (!categories.includes(note.category)) {
        categories.push(note.category);
      }
    }
    return categories;
  }
}

export default NoteList;
