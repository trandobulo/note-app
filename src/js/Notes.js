class Notes {
  constructor(notelist = []) {
    this.noteList = notelist;
  }

  addNote(category, content) {
    const date = new Date();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const noteObj = {
      category: category,
      created: `${
        monthNames[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`,
      content: content,
      id: `${date.getTime()}`,
      active: true,
    };
    this.noteList.push(noteObj);
  }

  findNoteIndex(id) {
    return this.noteList.findIndex((note) => note.id === id); // can return -1
  }

  findNote(id) {
    return this.noteList.find((note) => note.id === id);
  }

  deleteNote(id) {
    this.noteList.splice(this.findNoteIndex(id), 1);
  }

  editNote(id, noteObj) {
    this.noteList[this.findNoteIndex(id)] = { ...noteObj };
  }

  archiveUnarchiveNote(id) {
    this.noteList[this.findNoteIndex(id)].active =
      !this.noteList[this.findNoteIndex(id)].active;
  }

  totalNotes(category) {
    return this.noteList.reduce(
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

    for (let note of this.noteList) {
      if (!categories.includes(note.category)) {
        categories.push(note.category);
      }
    }

    return categories;
  }
}

const firstState = [
  {
    category: "random thought",
    created: "May 20, 2022",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    id: "0",
    active: true,
  },
  {
    category: "random thought",
    created: "May 20, 2022",
    content:
      "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    id: "1",
    active: true,
  },
  {
    category: "idea",
    created: "May 20, 2022",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    id: "2",
    active: true,
  },
  {
    category: "random thought",
    created: "May 20, 2022",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    id: "3",
    active: false,
  },
  {
    category: "task",
    created: "May 20, 2022",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit 5/1/2022 , sed do eiusmod 04/12/21 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    id: "4",
    active: true,
  },
];

const notes = new Notes(firstState);
