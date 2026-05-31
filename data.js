const STORAGE_KEY = "newcomerRecords_v3";

const $ = id => document.getElementById(id);

function getRecords() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function escapeHtml(text) {
  return String(text || "").replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

function showTab(tabName) {
  const isRecords = tabName === "records";
  $("recordsPanel").classList.toggle("hidden", !isRecords);
  $("statsPanel").classList.toggle("hidden", isRecords);
  $("recordsTab").classList.toggle("active", isRecords);
  $("statsTab").classList.toggle("active", !isRecords);

  if (isRecords) {
    renderRecords();
  } else {
    renderStatsAll();
  }
}

$("recordsTab").addEventListener("click", () => showTab("records"));
$("statsTab").addEventListener("click", () => showTab("stats"));
$("searchInput").addEventListener("input", renderRecords);

function renderRecords() {
  const keyword = $("searchInput").value.trim().toLowerCase();
  const list = $("recordList");
  const records = getRecords().filter(r => {
    const text = `${r.name} ${r.city} ${r.district} ${r.churchArea} ${r.inviter} ${r.receptionist} ${r.reason} ${r.need} ${r.visitTimes} ${r.note}`.toLowerCase();
    return text.includes(keyword);
  });

  if (records.length === 0) {
    list.innerHTML = `<div class="record">目前沒有資料</div>`;
    return;
  }

  list.innerHTML = records.map(r => `
    <article class="record">
      <div class="record-title">
        <span>${escapeHtml(r.name)}</span>
        <span>${escapeHtml(r.visitDate)}</span>
      </div>
      <div class="record-meta">
        <div>性別：${escapeHtml(r.gender || "-")}｜年齡：${escapeHtml(r.ageGroup || "-")}</div>
        <div>居住地：${escapeHtml(r.city || "-")} ${escapeHtml(r.district || "-")}</div>
        <div>所屬區域：${escapeHtml(r.churchArea || "-")}</div>
        <div>來由：${escapeHtml(r.reason || "-")}｜需求：${escapeHtml(r.need || "-")}</div>
        <div>來過次數：${escapeHtml(r.visitTimes || "-")}</div>
        <div>再來：${r.willingReturn ? "願意" : "-"}｜實際再來：${r.actuallyReturned ? "是" : "-"}</div>
        <div>陪讀：${r.willingBibleStudy ? "願意" : "-"}｜實際陪讀：${r.actualBibleStudy ? "是" : "-"}</div>
        <div>邀約人：${escapeHtml(r.inviter || "-")}｜接待人：${escapeHtml(r.receptionist || "-")}</div>
        <div>備註：${escapeHtml(r.note || "-")}</div>
      </div>
      <div class="record-actions">
        <button onclick="editRecord('${r.id}')">修改</button>
        <button class="delete" onclick="deleteRecord('${r.id}')">刪除</button>
      </div>
    </article>
  `).join("");
}

function deleteRecord(id) {
  if (!confirm("確定刪除此筆資料？")) return;
  const records = getRecords().filter(r => r.id !== id);
  saveRecords(records);
  renderRecords();
}

function editRecord(id) {
  const records = getRecords();
  const record = records.find(r => r.id === id);
  if (!record) return;

  const newNote = prompt("修改備註內容：", record.note || "");
  if (newNote === null) return;

  record.note = newNote.trim();
  saveRecords(records);
  renderRecords();
  renderStatsAll();
}

$("clearAll").addEventListener("click", () => {
  if (!confirm("確定清空全部留名紀錄？此動作無法復原。")) return;
  localStorage.removeItem(STORAGE_KEY);
  renderRecords();
  renderStatsAll();
});

$("exportCsv").addEventListener("click", () => {
  const records = getRecords();
  if (records.length === 0) {
    alert("目前沒有資料可匯出");
    return;
  }

  const headers = ["日期","姓名","性別","年齡區間","縣市","行政區","所屬區域","來教會原因","新人需求","來過次數","願意再來","實際有再來","願意陪讀","實際陪讀","邀約人","接待人","備註"];
  const rows = records.map(r => [
    r.visitDate, r.name, r.gender, r.ageGroup, r.city, r.district, r.churchArea, r.reason, r.need, r.visitTimes,
    r.willingReturn ? "是" : "否",
    r.actuallyReturned ? "是" : "否",
    r.willingBibleStudy ? "是" : "否",
    r.actualBibleStudy ? "是" : "否",
    r.inviter, r.receptionist, r.note
  ]);

  const csv = [headers, ...rows].map(row =>
    row.map(value => `"${String(value || "").replaceAll('"', '""')}"`).join(",")
  ).join("\n");

  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `新人留名紀錄_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
});

function countBy(records, key) {
  return records.reduce((acc, r) => {
    const value = r[key] || "未填寫";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function renderStats(targetId, data, total, preferredOrder = []) {
  const el = $(targetId);
  let entries = Object.entries(data);

  if (preferredOrder.length) {
    const ordered = [];
    preferredOrder.forEach(label => {
      if (data[label]) ordered.push([label, data[label]]);
    });
    entries.forEach(item => {
      if (!preferredOrder.includes(item[0])) ordered.push(item);
    });
    entries = ordered;
  } else {
    entries.sort((a, b) => b[1] - a[1]);
  }

  if (entries.length === 0) {
    el.innerHTML = `<div class="record">目前沒有資料</div>`;
    return;
  }

  el.innerHTML = entries.map(([label, count]) => {
    const percent = total ? Math.round((count / total) * 100) : 0;
    return `
      <div class="stat-row">
        <div class="stat-label">
          <span>${escapeHtml(label)}</span>
          <span>${count} 人｜${percent}%</span>
        </div>
        <div class="bar"><div class="bar-fill" style="width:${percent}%"></div></div>
      </div>
    `;
  }).join("");
}

function isThisMonth(dateString) {
  if (!dateString) return false;
  const now = new Date();
  const d = new Date(dateString + "T00:00:00");
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

function isThisWeek(dateString) {
  if (!dateString) return false;
  const now = new Date();
  const d = new Date(dateString + "T00:00:00");

  const day = now.getDay() || 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - day + 1);
  monday.setHours(0,0,0,0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23,59,59,999);

  return d >= monday && d <= sunday;
}

function renderStatsAll() {
  const records = getRecords();
  const total = records.length;

  $("totalCount").textContent = total;
  $("monthCount").textContent = records.filter(r => isThisMonth(r.visitDate)).length;
  $("weekCount").textContent = records.filter(r => isThisWeek(r.visitDate)).length;
  $("returnCount").textContent = records.filter(r => r.willingReturn).length;
  $("actualReturnCount").textContent = records.filter(r => r.actuallyReturned).length;
  $("bibleStudyCount").textContent = records.filter(r => r.willingBibleStudy).length;
  $("actualBibleStudyCount").textContent = records.filter(r => r.actualBibleStudy).length;

  renderStats("churchAreaStats", countBy(records, "churchArea"), total, ["北部1區","北部2區","北部3區","北部4區","管制區","其他","未填寫"]);
  renderStats("ageStats", countBy(records, "ageGroup"), total, ["18歲以下","18~25歲","26~35歲","36~45歲","46~55歲","56~65歲","66~75歲","76~85歲","86歲以上","未填寫"]);
  renderStats("cityStats", countBy(records, "city"), total);
  renderStats("districtStats", countBy(records, "district"), total);
  renderStats("reasonStats", countBy(records, "reason"), total);
  renderStats("needStats", countBy(records, "need"), total);
  renderStats("visitTimesStats", countBy(records, "visitTimes"), total, ["第1次","第2次","第3次","第4次以上","未填寫"]);
}

showTab("records");
