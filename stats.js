const STORAGE_KEY = "newcomerRecords_v1";

function getRecords() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function countBy(records, key) {
  return records.reduce((acc, r) => {
    const value = r[key] || "未填寫";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function renderStats(targetId, data, total) {
  const el = document.getElementById(targetId);
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    el.innerHTML = `<div class="record">目前沒有資料</div>`;
    return;
  }

  el.innerHTML = entries.map(([label, count]) => {
    const percent = total ? Math.round((count / total) * 100) : 0;
    return `
      <div class="stat-row">
        <div class="stat-label">
          <span>${label}</span>
          <span>${count} 人｜${percent}%</span>
        </div>
        <div class="bar"><div class="bar-fill" style="width:${percent}%"></div></div>
      </div>
    `;
  }).join("");
}

function render() {
  const records = getRecords();
  const total = records.length;

  document.getElementById("totalCount").textContent = total;
  document.getElementById("returnCount").textContent = records.filter(r => r.willingReturn).length;
  document.getElementById("actualReturnCount").textContent = records.filter(r => r.actuallyReturned).length;
  document.getElementById("bibleStudyCount").textContent = records.filter(r => r.willingBibleStudy).length;

  renderStats("areaStats", countBy(records, "churchArea"), total);
  renderStats("ageStats", countBy(records, "ageGroup"), total);
  renderStats("reasonStats", countBy(records, "reason"), total);
  renderStats("needStats", countBy(records, "need"), total);
}

render();
