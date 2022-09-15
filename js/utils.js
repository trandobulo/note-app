function changeSummaryCount(noteObj, action) {
  const activeCount = document.querySelector(
    `#${noteObj.category.replace(/\s/g, "-")}-active-total`
  );

  const archiveCount = document.querySelector(
    `#${noteObj.category.replace(/\s/g, "-")}-archive-total`
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
      break;
    case "add":
      activeCount.innerHTML++;
      break;
    default:
  }
}

export { changeSummaryCount };
