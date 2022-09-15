function renderSummary(category, noteList) {
  const summaryItem = document.createElement("div");
  const summaryItemName = category.split(" ").join("-");
  const summaryContainerId = `${summaryItemName}-summary`;

  summaryItem.innerHTML = `
  <div class="row_category" id=${summaryContainerId}>
  <div class="col_icon">
    <div class="row__category-icon">
      <img class="action-icon" src="../src/svg/${summaryItemName}.svg" />
    </div>
  </div>
  <label class="col_content">${category}</label>
  <label class="col_content" id="${summaryItemName}-active-total">${
    noteList.getTotalActiveArchiveNotes(category).active
  }</label>
  <label class="col_content" id="${summaryItemName}-archive-total">${
    noteList.getTotalActiveArchiveNotes(category).archived
  }</label>
  </div>
  <div id=${summaryItemName}-archive></div>`;

  return summaryItem;
}

function renderSummaryList(noteList) {
  noteList
    .getCategories()
    .forEach((el) =>
      document
        .querySelector("#summary-list")
        .append(renderSummary(el, noteList))
    );
}

export { renderSummary, renderSummaryList };
