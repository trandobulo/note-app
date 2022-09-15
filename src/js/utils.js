function changeSummaryCount(noteObj, action) {
  const activeCount = document.querySelector(
    `#${noteObj.category.split(" ").join("-")}-active-total`
  );

  const archiveCount = document.querySelector(
    `#${noteObj.category.split(" ").join("-")}-archive-total` ///// utils
  );

  switch (action) {
    case "archive":
      activeCount.innerHTML--;
      archiveCount.innerHTML++;
      break;
    case "unarchive":
      activeCount.innerHTML++;
      archiveCount.innerHTML--;
      break;
    case "delete":
      noteObj.active ? activeCount.innerHTML-- : archiveCount.innerHTML--;
    default:
  }
}

export { changeSummaryCount };
