const ageGroups = ["未滿15歲", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75歲以上"];
const residenceAreas = {
  "基隆市": ["仁愛區", "信義區", "中正區", "中山區", "安樂區", "暖暖區", "七堵區"],
  "台北市": ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
  "新北市": ["板橋區", "三重區", "中和區", "永和區", "新莊區", "新店區", "樹林區", "鶯歌區", "三峽區", "淡水區", "汐止區", "瑞芳區", "土城區", "蘆洲區", "五股區", "泰山區", "林口區", "深坑區", "石碇區", "坪林區", "三芝區", "石門區", "八里區", "平溪區", "雙溪區", "貢寮區", "金山區", "萬里區", "烏來區"],
  "桃園市": ["桃園區", "中壢區", "平鎮區", "八德區", "楊梅區", "蘆竹區", "大溪區", "龍潭區", "龜山區", "大園區", "觀音區", "新屋區", "復興區"],
  "新竹市": ["東區", "北區", "香山區"],
  "新竹縣": ["竹北市", "竹東鎮", "新埔鎮", "關西鎮", "湖口鄉", "新豐鄉", "芎林鄉", "橫山鄉", "北埔鄉", "寶山鄉", "峨眉鄉", "尖石鄉", "五峰鄉"],
  "苗栗縣": ["苗栗市", "頭份市", "竹南鎮", "後龍鎮", "通霄鎮", "苑裡鎮", "卓蘭鎮", "造橋鄉", "西湖鄉", "頭屋鄉", "公館鄉", "銅鑼鄉", "三義鄉", "大湖鄉", "獅潭鄉", "三灣鄉", "南庄鄉", "泰安鄉"],
  "台中市": ["中區", "東區", "南區", "西區", "北區", "西屯區", "南屯區", "北屯區", "豐原區", "東勢區", "大甲區", "清水區", "沙鹿區", "梧棲區", "后里區", "神岡區", "潭子區", "大雅區", "新社區", "石岡區", "外埔區", "大安區", "烏日區", "大肚區", "龍井區", "霧峰區", "太平區", "大里區", "和平區"],
  "彰化縣": ["彰化市", "鹿港鎮", "和美鎮", "線西鄉", "伸港鄉", "福興鄉", "秀水鄉", "花壇鄉", "芬園鄉", "員林市", "溪湖鎮", "田中鎮", "大村鄉", "埔鹽鄉", "埔心鄉", "永靖鄉", "社頭鄉", "二水鄉", "北斗鎮", "二林鎮", "田尾鄉", "埤頭鄉", "芳苑鄉", "大城鄉", "竹塘鄉", "溪州鄉"],
  "南投縣": ["南投市", "埔里鎮", "草屯鎮", "竹山鎮", "集集鎮", "名間鄉", "鹿谷鄉", "中寮鄉", "魚池鄉", "國姓鄉", "水里鄉", "信義鄉", "仁愛鄉"],
  "雲林縣": ["斗六市", "斗南鎮", "虎尾鎮", "西螺鎮", "土庫鎮", "北港鎮", "古坑鄉", "大埤鄉", "莿桐鄉", "林內鄉", "二崙鄉", "崙背鄉", "麥寮鄉", "東勢鄉", "褒忠鄉", "台西鄉", "元長鄉", "四湖鄉", "口湖鄉", "水林鄉"],
  "嘉義市": ["東區", "西區"],
  "嘉義縣": ["太保市", "朴子市", "布袋鎮", "大林鎮", "民雄鄉", "溪口鄉", "新港鄉", "六腳鄉", "東石鄉", "義竹鄉", "鹿草鄉", "水上鄉", "中埔鄉", "竹崎鄉", "梅山鄉", "番路鄉", "大埔鄉", "阿里山鄉"],
  "台南市": ["中西區", "東區", "南區", "北區", "安平區", "安南區", "永康區", "歸仁區", "新化區", "左鎮區", "玉井區", "楠西區", "南化區", "仁德區", "關廟區", "龍崎區", "官田區", "麻豆區", "佳里區", "西港區", "七股區", "將軍區", "學甲區", "北門區", "新營區", "後壁區", "白河區", "東山區", "六甲區", "下營區", "柳營區", "鹽水區", "善化區", "大內區", "山上區", "新市區", "安定區"],
  "高雄市": ["楠梓區", "左營區", "鼓山區", "三民區", "鹽埕區", "前金區", "新興區", "苓雅區", "前鎮區", "旗津區", "小港區", "鳳山區", "林園區", "大寮區", "大樹區", "大社區", "仁武區", "鳥松區", "岡山區", "橋頭區", "燕巢區", "田寮區", "阿蓮區", "路竹區", "湖內區", "茄萣區", "永安區", "彌陀區", "梓官區", "旗山區", "美濃區", "六龜區", "甲仙區", "杉林區", "內門區", "茂林區", "桃源區", "那瑪夏區"],
  "屏東縣": ["屏東市", "潮州鎮", "東港鎮", "恆春鎮", "萬丹鄉", "長治鄉", "麟洛鄉", "九如鄉", "里港鄉", "鹽埔鄉", "高樹鄉", "萬巒鄉", "內埔鄉", "竹田鄉", "新埤鄉", "枋寮鄉", "新園鄉", "崁頂鄉", "林邊鄉", "南州鄉", "佳冬鄉", "琉球鄉", "車城鄉", "滿州鄉", "枋山鄉", "三地門鄉", "霧台鄉", "瑪家鄉", "泰武鄉", "來義鄉", "春日鄉", "獅子鄉", "牡丹鄉"],
  "宜蘭縣": ["宜蘭市", "羅東鎮", "蘇澳鎮", "頭城鎮", "礁溪鄉", "壯圍鄉", "員山鄉", "冬山鄉", "五結鄉", "三星鄉", "大同鄉", "南澳鄉"],
  "花蓮縣": ["花蓮市", "鳳林鎮", "玉里鎮", "新城鄉", "吉安鄉", "壽豐鄉", "光復鄉", "豐濱鄉", "瑞穗鄉", "富里鄉", "秀林鄉", "萬榮鄉", "卓溪鄉"],
  "台東縣": ["台東市", "成功鎮", "關山鎮", "卑南鄉", "鹿野鄉", "池上鄉", "東河鄉", "長濱鄉", "太麻里鄉", "大武鄉", "綠島鄉", "海端鄉", "延平鄉", "金峰鄉", "達仁鄉", "蘭嶼鄉"],
  "澎湖縣": ["馬公市", "湖西鄉", "白沙鄉", "西嶼鄉", "望安鄉", "七美鄉"],
  "金門縣": ["金城鎮", "金湖鎮", "金沙鎮", "金寧鄉", "烈嶼鄉", "烏坵鄉"],
  "連江縣": ["南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"],
  "其他": ["其他"]
};

const emptyData = { services: [], newcomers: [], leaders: [] };
let editTarget = null;
let lastSavedRecord = null;

const $ = (id) => document.getElementById(id);
const sheetsConfig = window.CHURCH_SHEETS_CONFIG || {};

function googleSheetsEnabled() {
  return Boolean(sheetsConfig.webAppUrl && sheetsConfig.webAppUrl.startsWith("https://script.google.com/"));
}

function recordId(prefix) {
  if (window.crypto?.randomUUID) return `${prefix}-${window.crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadData() {
  const saved = localStorage.getItem("churchDashboardData");
  if (!saved) return structuredClone(emptyData);
  try {
    return JSON.parse(saved);
  } catch {
    return structuredClone(emptyData);
  }
}

function saveData(state) {
  localStorage.setItem("churchDashboardData", JSON.stringify(state));
  localStorage.setItem("churchDashboardDataUpdated", String(Date.now()));
  if ("BroadcastChannel" in window) {
    new BroadcastChannel("churchDashboardData").postMessage({ type: "updated" });
  }
}

function sendRecordToGoogleSheet(type, record) {
  if (!googleSheetsEnabled()) return;
  const body = new URLSearchParams({
    type,
    record: JSON.stringify(record)
  });
  fetch(sheetsConfig.webAppUrl, {
    method: "POST",
    mode: "no-cors",
    body
  }).catch((error) => {
    console.warn("Google Sheets sync failed", error);
  });
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formToObject(form) {
  const data = {};
  for (const [key, value] of new FormData(form).entries()) {
    if (data[key]) data[key] = `${data[key]}, ${value}`;
    else data[key] = value;
  }
  return data;
}

function calculateAge(birthDate, atDate = today()) {
  if (!birthDate) return "";
  const birth = new Date(`${birthDate}T00:00:00`);
  const at = new Date(`${atDate}T00:00:00`);
  if (Number.isNaN(birth.getTime()) || birth > at) return "";
  let age = at.getFullYear() - birth.getFullYear();
  const monthDelta = at.getMonth() - birth.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && at.getDate() < birth.getDate())) age -= 1;
  return String(age);
}

function syncNewcomerAge() {
  if (!$("newBirthDate") || !$("newAge")) return;
  $("newAge").value = calculateAge($("newBirthDate").value, $("newDate")?.value || today());
}

function requireChecked(form, name, message) {
  if (form.querySelectorAll(`input[name="${name}"]:checked`).length) return true;
  alert(message);
  form.querySelector(`input[name="${name}"]`)?.focus();
  return false;
}

function validateNewcomerForm(form) {
  if (!requireChecked(form, "languages", "語言程度請至少勾選一項。")) return false;
  if (!requireChecked(form, "contactDays", "方便聯絡日請至少勾選一項。")) return false;
  if (!requireChecked(form, "contactTimes", "方便聯絡時間請至少勾選一項。")) return false;
  const missingOptionalAnswers = [];
  if (!$("newWillingStudy")?.value) missingOptionalAnswers.push("是否願意接受陪讀");
  if (!$("newBeginnerClass")?.value) missingOptionalAnswers.push("是否願意報名初訓班");
  if (missingOptionalAnswers.length) {
    const ok = confirm(`${missingOptionalAnswers.join("、")} 尚未填寫。\n\n若新人暫時不想回答，可以按「確定」繼續送出；若要補填，請按「取消」。`);
    if (!ok) {
      $(missingOptionalAnswers[0] === "是否願意接受陪讀" ? "newWillingStudy" : "newBeginnerClass")?.focus();
      return false;
    }
  }
  syncNewcomerAge();
  return true;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

function clearForm(form) {
  const date = form.querySelector('input[type="date"]')?.value || today();
  form.reset();
  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) dateInput.value = date;
}

function rebuildServiceAttendance(state) {
  const counts = new Map();
  state.newcomers.forEach((row) => {
    if (!row.date) return;
    counts.set(row.date, (counts.get(row.date) || 0) + 1);
  });
  state.services = [...counts.entries()]
    .map(([date, attendance]) => ({ date, attendance }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function renderResidenceDistricts() {
  if (!$("newResidenceCity") || !$("newResidenceDistrict")) return;
  const city = $("newResidenceCity").value;
  $("newResidenceDistrict").innerHTML = (residenceAreas[city] || []).map((area) => `<option>${area}</option>`).join("");
}

function syncLeaderMeetingTypeByDate() {
  const dateValue = $("leaderDate")?.value;
  const meetingSelect = $("leaderMeetingType");
  if (!dateValue || !meetingSelect) return;
  const expected = expectedMeetingTypeForDate(dateValue);
  if (expected) meetingSelect.value = expected;
}

function expectedMeetingTypeForDate(dateValue) {
  if (!dateValue) return "";
  const day = new Date(`${dateValue}T00:00:00`).getDay();
  if (day === 0) return "主日聚會";
  if (day === 3) return "小組聚會";
  if (day === 5) return "幹部訓練";
  return "";
}

function validateLeaderMeetingDate(record) {
  const expected = expectedMeetingTypeForDate(record.date);
  if (!expected) {
    alert("幹部簽到日期只能選星期三、星期五或星期日。");
    return false;
  }
  if (record.meetingType !== expected) {
    alert(`日期與聚會類型不一致，${record.date} 應該選「${expected}」。`);
    return false;
  }
  return true;
}

function setActiveTab(target) {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.target === target);
  });
  document.querySelectorAll(".checkin-form").forEach((form) => {
    form.classList.toggle("active", form.id === target);
  });
}

function showHome(target = "newcomerCheckin") {
  $("confirmSection").classList.add("view-hidden");
  document.querySelector(".public-checkin").classList.remove("view-hidden");
  setActiveTab(target);
  $("confirmMessage").textContent = "";
}

function showSavedRecord(type, record, index) {
  lastSavedRecord = { type, record, index };
  document.querySelector(".public-checkin").classList.add("view-hidden");
  $("confirmSection").classList.remove("view-hidden");
  $("confirmMessage").textContent = "";
  $("confirmSummary").innerHTML = type === "newcomer" ? newcomerSummary(record) : leaderSummary(record);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function summaryRow(label, value) {
  return `<div class="summary-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function newcomerSummary(record) {
  return `
    ${summaryRow("類型", "新人")}
    ${summaryRow("日期", record.date)}
    ${summaryRow("姓名", record.name)}
    ${summaryRow("性別", record.gender)}
    ${summaryRow("出生日期", record.birthDate)}
    ${summaryRow("年齡區間", record.age)}
    ${summaryRow("族群", record.ethnicity)}
    ${summaryRow("語言程度", record.languages)}
    ${summaryRow("教育程度", record.education)}
    ${summaryRow("職業", record.occupation)}
    ${summaryRow("宗教信仰", record.religion)}
    ${summaryRow("電話", record.phone)}
    ${summaryRow("Email", record.email)}
    ${summaryRow("居住地", record.residence)}
    ${summaryRow("地址", record.address)}
    ${summaryRow("方便聯絡日", record.contactDays)}
    ${summaryRow("方便聯絡時間", record.contactTimes)}
    ${summaryRow("來過幾次", record.visits)}
    ${summaryRow("來教會原因", record.reason)}
    ${summaryRow("邀請人", record.inviter)}
    ${summaryRow("邀請人電話", record.inviterPhone)}
    ${summaryRow("陪談人", record.counselor)}
    ${summaryRow("陪談人電話", record.counselorPhone)}
    ${summaryRow("跟進人", record.followupPerson)}
    ${summaryRow("跟進人電話", record.followupPhone)}
    ${summaryRow("北部教區", record.district)}
    ${summaryRow("需求", record.needs)}
    ${summaryRow("願意再來", record.willingReturn)}
    ${summaryRow("實際有來", record.actualReturn)}
    ${summaryRow("接受陪讀", record.willingStudy)}
    ${summaryRow("實際陪讀", record.actualStudy)}
  `;
}

function leaderSummary(record) {
  return `
    ${summaryRow("類型", "幹部")}
    ${summaryRow("日期", record.date)}
    ${summaryRow("姓名", record.name)}
    ${summaryRow("級職", record.role)}
    ${summaryRow("聚會類型", record.meetingType)}
    ${summaryRow("北部教區", record.district)}
    ${summaryRow("出席狀態", record.status)}
  `;
}

function fillForm(form, data) {
  Object.entries(data).forEach(([key, value]) => {
    const field = form.elements[key];
    if (!field) return;
    if (field instanceof RadioNodeList) {
      const values = String(value ?? "").split(", ");
      Array.from(field).forEach((item) => {
        if (item.type === "checkbox") item.checked = values.includes(item.value);
        else item.checked = item.value === value;
      });
      return;
    }
    field.value = value;
  });
}

function editLastRecord() {
  if (!lastSavedRecord) return;
  editTarget = { type: lastSavedRecord.type, index: lastSavedRecord.index };
  if (editTarget.type === "newcomer") {
    const form = $("newcomerCheckin");
    if (!form) return;
    const record = lastSavedRecord.record;
    fillForm(form, record);
    $("newResidenceCity").value = record.residenceCity || "新北市";
    renderResidenceDistricts();
    $("newResidenceDistrict").value = record.residenceDistrict || "板橋區";
    form.querySelector('button[type="submit"]').textContent = "存檔送出";
    showHome("newcomerCheckin");
  } else {
    const form = $("leaderCheckin");
    if (!form) return;
    fillForm(form, lastSavedRecord.record);
    form.querySelector('button[type="submit"]').textContent = "存檔送出";
    showHome("leaderCheckin");
  }
}

function resetSubmitLabel(type) {
  if (type === "newcomer" && $("newcomerCheckin")) $("newcomerCheckin").querySelector('button[type="submit"]').textContent = "送出新人留名";
  if (type === "leader" && $("leaderCheckin")) $("leaderCheckin").querySelector('button[type="submit"]').textContent = "送出幹部簽到";
}

function setupTabs() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      editTarget = null;
      resetSubmitLabel("newcomer");
      resetSubmitLabel("leader");
      setActiveTab(button.dataset.target);
    });
  });
}

function setupCheckins() {
  const newcomerForm = $("newcomerCheckin");
  const leaderForm = $("leaderCheckin");

  if (newcomerForm) {
    $("newDate").value = today();
    if ($("newAge").tagName === "SELECT") $("newAge").innerHTML = ageGroups.map((group) => `<option>${group}</option>`).join("");
    $("newResidenceCity").innerHTML = Object.keys(residenceAreas).map((city) => `<option>${city}</option>`).join("");
    $("newResidenceCity").value = "新北市";
    renderResidenceDistricts();
    $("newResidenceDistrict").value = "板橋區";
    $("newResidenceCity").addEventListener("change", renderResidenceDistricts);
    $("newBirthDate")?.addEventListener("change", syncNewcomerAge);
    $("newDate")?.addEventListener("change", syncNewcomerAge);

    newcomerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateNewcomerForm(event.currentTarget)) return;
      const state = loadData();
      const data = formToObject(event.currentTarget);
      const previous = editTarget?.type === "newcomer" ? state.newcomers[editTarget.index] : null;
      const record = {
        ...data,
        id: previous?.id || recordId("newcomer"),
        createdAt: previous?.createdAt || new Date().toISOString(),
        residence: `${data.residenceCity}-${data.residenceDistrict}`,
        visits: Number(data.visits || 1),
      };
      let index;
      if (editTarget?.type === "newcomer") {
        index = editTarget.index;
        state.newcomers[index] = record;
      } else {
        state.newcomers.push(record);
        index = state.newcomers.length - 1;
      }
      rebuildServiceAttendance(state);
      saveData(state);
      sendRecordToGoogleSheet("newcomer", record);
      editTarget = null;
      resetSubmitLabel("newcomer");
      clearForm(event.currentTarget);
      showSavedRecord("newcomer", record, index);
    });
  }

  if (leaderForm) {
    $("leaderDate").value = today();
    syncLeaderMeetingTypeByDate();
    $("leaderDate").addEventListener("change", syncLeaderMeetingTypeByDate);

    leaderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const state = loadData();
      const previous = editTarget?.type === "leader" ? state.leaders[editTarget.index] : null;
      const record = {
        ...formToObject(event.currentTarget),
        id: previous?.id || recordId("leader"),
        createdAt: previous?.createdAt || new Date().toISOString(),
      };
      if (!validateLeaderMeetingDate(record)) return;
      let index;
      if (editTarget?.type === "leader") {
        index = editTarget.index;
        state.leaders[index] = record;
      } else {
        state.leaders.push(record);
        index = state.leaders.length - 1;
      }
      saveData(state);
      sendRecordToGoogleSheet("leader", record);
      editTarget = null;
      resetSubmitLabel("leader");
      clearForm(event.currentTarget);
      showSavedRecord("leader", record, index);
    });
  }

  $("editRecordButton")?.addEventListener("click", editLastRecord);
  $("backHomeButton")?.addEventListener("click", () => {
    resetSubmitLabel("newcomer");
    resetSubmitLabel("leader");
    editTarget = null;
    const target = lastSavedRecord?.type === "leader" || !newcomerForm ? "leaderCheckin" : "newcomerCheckin";
    showHome(target);
  });

  $("scrollTopButton")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupCheckins();
});
