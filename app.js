const STORAGE_KEY = "newcomerRecords_v1";

const $ = id => document.getElementById(id);

function getRecords() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

$("visitDate").value = today();

$("newcomerForm").addEventListener("submit", e => {
  e.preventDefault();

  const record = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    visitDate: $("visitDate").value,
    name: $("name").value.trim(),
    gender: $("gender").value,
    ageGroup: $("ageGroup").value,
    addressArea: $("addressArea").value.trim(),
    churchArea: $("churchArea").value,
    inviter: $("inviter").value.trim(),
    reason: $("reason").value,
    need: $("need").value,
    willingReturn: $("willingReturn").checked,
    actuallyReturned: $("actuallyReturned").checked,
    willingBibleStudy: $("willingBibleStudy").checked,
    actualBibleStudy: $("actualBibleStudy").checked,
    note: $("note").value.trim(),
    createdAt: new Date().toISOString()
  };

  if (!record.name) {
    alert("請輸入姓名");
    return;
  }

  const records = getRecords();
  records.unshift(record);
  saveRecords(records);

  e.target.reset();
  $("visitDate").value = today();
  renderRecords();
  alert("已新增留名紀錄");
});

$("searchInput").addEventListener("input", renderRecords);

function renderRecords() {
  const keyword = $("searchInput").value.trim().toLowerCase();
  const list = $("recordList");
  const records = getRecords().filter(r => {
    const text = `${r.name} ${r.addressArea} ${r.churchArea} ${r.inviter} ${r.reason} ${r.need} ${r.note}`.toLowerCase();
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
        <span>${escapeHtml(r.visitDate || "")}</span>
      </div>
      <div class="record-meta">
        <div>性別：${escapeHtml(r.gender || "-")}｜年齡：${escapeHtml(r.ageGroup || "-")}</div>
        <div>居住地：${escapeHtml(r.addressArea || "-")}</div>
        <div>區域：${escapeHtml(r.churchArea || "-")}</div>
        <div>邀約人：${escapeHtml(r.inviter || "-")}</div>
        <div>來由：${escapeHtml(r.reason || "-")}｜需求：${escapeHtml(r.need || "-")}</div>
        <div>再來：${r.willingReturn ? "願意" : "-"}｜實際再來：${r.actuallyReturned ? "是" : "-"}</div>
        <div>陪讀：${r.willingBibleStudy ? "願意" : "-"}｜實際陪讀：${r.actualBibleStudy ? "是" : "-"}</div>
        <div>備註：${escapeHtml(r.note || "-")}</div>
      </div>
      <button onclick="deleteRecord('${r.id}')">刪除此筆</button>
    </article>
  `).join("");
}

function deleteRecord(id) {
  if (!confirm("確定刪除此筆資料？")) return;
  const records = getRecords().filter(r => r.id !== id);
  saveRecords(records);
  renderRecords();
}

$("clearAll").addEventListener("click", () => {
  if (!confirm("確定清空全部留名紀錄？此動作無法復原。")) return;
  localStorage.removeItem(STORAGE_KEY);
  renderRecords();
});

$("exportCsv").addEventListener("click", () => {
  const records = getRecords();
  if (records.length === 0) {
    alert("目前沒有資料可匯出");
    return;
  }

  const headers = ["日期","姓名","性別","年齡層","居住地","所屬區域","邀約人","來教會原因","新人需求","願意再來","實際有再來","願意陪讀","實際陪讀","備註"];
  const rows = records.map(r => [
    r.visitDate, r.name, r.gender, r.ageGroup, r.addressArea, r.churchArea, r.inviter, r.reason, r.need,
    r.willingReturn ? "是" : "否",
    r.actuallyReturned ? "是" : "否",
    r.willingBibleStudy ? "是" : "否",
    r.actualBibleStudy ? "是" : "否",
    r.note
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

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

renderRecords();
