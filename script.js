const palette = ["#246bfe", "#178f83", "#c98216", "#cf4f6c", "#2e7d4f", "#7656d6", "#6b7280", "#d05a2b"];
const districts = ["1區", "2區", "3區", "4區", "管制區", "獨立一組", "獨立二組"];
const ageGroups = ["未滿18歲", "19~25", "26~35", "36~45", "46~55", "56~65", "66~75", "76歲以上"];
const meetingTypes = ["小組聚會", "幹部訓練", "主日聚會"];
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

const sampleData = {
  services: [],
  newcomers: [],
  leaders: []
};

let state = loadData();
let selectedCalendarDates = {
  newcomer: null,
  leader: null
};
let selectedLeaderMeetingType = "主日聚會";
let rangeCalendarOpen = false;

const $ = (id) => document.getElementById(id);
const sheetsConfig = window.CHURCH_SHEETS_CONFIG || {};

function compactCharts() {
  return window.matchMedia?.("(max-width: 560px)").matches;
}

function googleSheetsEnabled() {
  return Boolean(sheetsConfig.webAppUrl && sheetsConfig.webAppUrl.startsWith("https://script.google.com/"));
}

function recordId(prefix) {
  if (window.crypto?.randomUUID) return `${prefix}-${window.crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function loadData() {
  const saved = localStorage.getItem("churchDashboardData");
  if (!saved) return structuredClone(sampleData);
  try {
    return JSON.parse(saved);
  } catch {
    return structuredClone(sampleData);
  }
}

function saveData() {
  localStorage.setItem("churchDashboardData", JSON.stringify(state));
  localStorage.setItem("churchDashboardDataUpdated", String(Date.now()));
  if ("BroadcastChannel" in window) {
    new BroadcastChannel("churchDashboardData").postMessage({ type: "updated" });
  }
}

function rebuildServicesFromNewcomers(newcomers) {
  const counts = new Map();
  newcomers.forEach((row) => {
    if (!row.date) return;
    counts.set(row.date, (counts.get(row.date) || 0) + 1);
  });
  return [...counts.entries()]
    .map(([date, attendance]) => ({ date, attendance }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function normalizeRemoteData(payload) {
  const newcomers = Array.isArray(payload?.newcomers) ? payload.newcomers : [];
  const leaders = Array.isArray(payload?.leaders) ? payload.leaders : [];
  return {
    services: rebuildServicesFromNewcomers(newcomers),
    newcomers,
    leaders
  };
}

function fetchGoogleSheetData() {
  if (!googleSheetsEnabled()) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const callbackName = `churchSheetsCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const separator = sheetsConfig.webAppUrl.includes("?") ? "&" : "?";
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Google Sheets read timeout"));
    }, 12000);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (payload) => {
      cleanup();
      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Google Sheets read failed"));
    };
    script.src = `${sheetsConfig.webAppUrl}${separator}action=list&callback=${callbackName}&v=${Date.now()}`;
    document.body.appendChild(script);
  });
}

async function syncGoogleSheetData() {
  try {
    const payload = await fetchGoogleSheetData();
    if (!payload?.ok) return;
    state = normalizeRemoteData(payload);
    saveData();
    renderOptions();
    render();
  } catch (error) {
    console.warn("Google Sheets load failed", error);
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

function ageGroup(age) {
  const value = String(age ?? "").trim();
  if (ageGroups.includes(value)) return value;
  const oldRanges = {
    "未滿15歲": 14,
    "15-19": 17,
    "20-24": 22,
    "25-29": 27,
    "30-34": 32,
    "35-39": 37,
    "40-44": 42,
    "45-49": 47,
    "50-54": 52,
    "55-59": 57,
    "60-64": 62,
    "65-69": 67,
    "70-74": 72,
    "75歲以上": 76
  };
  const ageValue = oldRanges[value] ?? value;
  const numericAge = Number(ageValue);
  if (Number.isNaN(numericAge)) return "未填寫";
  if (numericAge < 18) return "未滿18歲";
  if (numericAge <= 25) return "19~25";
  if (numericAge <= 35) return "26~35";
  if (numericAge <= 45) return "36~45";
  if (numericAge <= 55) return "46~55";
  if (numericAge <= 65) return "56~65";
  if (numericAge <= 75) return "66~75";
  return "76歲以上";
}

function visitGroup(visits) {
  if (visits <= 1) return "第1次";
  if (visits === 2) return "第2次";
  if (visits === 3) return "第3次";
  return "4次以上";
}

function normalizeMeetingType(value) {
  const text = String(value || "").trim();
  if (text === "星期三小組聚會") return "小組聚會";
  if (text === "星期五幹部聚會" || text === "星期五幹部訓練") return "幹部訓練";
  if (text === "星期日主日聚會" || text === "星期日主日舉會" || text === "主日舉會") return "主日聚會";
  return text || "主日聚會";
}

function shortMeetingType(value) {
  return normalizeMeetingType(value);
}

function yes(value) {
  return String(value).trim() === "是";
}

function isPresentStatus(value) {
  return String(value).trim() === "出席";
}

function displayLeaderStatus(value) {
  return isPresentStatus(value) ? "出席" : "請假";
}

function countBy(rows, getter, order = null) {
  const counts = new Map();
  rows.forEach((row) => {
    const raw = getter(row);
    const keys = Array.isArray(raw) ? raw : [raw];
    keys.filter(Boolean).forEach((key) => counts.set(key, (counts.get(key) || 0) + 1));
  });
  const entries = [...counts.entries()].map(([label, value]) => ({ label, value }));
  if (order) {
    entries.sort((a, b) => order.indexOf(a.label) - order.indexOf(b.label));
  } else {
    entries.sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, "zh-Hant"));
  }
  return entries;
}

function statsDates() {
  return [...new Set([
    ...state.services.map((row) => row.date),
    ...state.newcomers.map((row) => row.date),
    ...state.leaders.map((row) => row.date)
  ].filter(Boolean))].sort();
}

function latestStatsDate() {
  return statsDates().at(-1) || today();
}

function currentMonthValue() {
  return today().slice(0, 7);
}

function selectedStatsDateOk(date) {
  if (!date) return false;
  const type = $("rangeTypeSelect")?.value || "month";
  if (type === "day") return date === $("rangeDate")?.value;
  if (type === "month") return date.slice(0, 7) === $("rangeMonth")?.value;
  if (type === "year") return date.slice(0, 4) === $("rangeYear")?.value;
  if (type === "quarter") {
    const value = $("rangeQuarter")?.value || "";
    const [year, quarter] = value.split("-Q").map(Number);
    const [rowYear, rowMonth] = date.split("-").map(Number);
    return rowYear === year && Math.floor((rowMonth - 1) / 3) + 1 === quarter;
  }
  return true;
}

function selectedRows() {
  const district = $("districtSelect").value;
  const query = $("searchInput").value.trim().toLowerCase();
  const matchText = (row) => Object.values(row).join(" ").toLowerCase().includes(query);

  const newcomers = state.newcomers.filter((row) => {
    const periodOk = selectedStatsDateOk(row.date);
    const districtOk = district === "all" || row.district === district;
    return periodOk && districtOk && (!query || matchText(row));
  });
  const services = rebuildServicesFromNewcomers(newcomers);
  const leaders = state.leaders.filter((row) => {
    const periodOk = selectedStatsDateOk(row.date);
    const districtOk = district === "all" || row.district === district;
    return periodOk && districtOk && (!query || matchText(row));
  });
  return { newcomers, services, leaders };
}

function calendarRows() {
  const district = $("districtSelect").value;
  const query = $("searchInput").value.trim().toLowerCase();
  const matchText = (row) => Object.values(row).join(" ").toLowerCase().includes(query);
  return {
    newcomers: state.newcomers.filter((row) => (district === "all" || row.district === district) && (!query || matchText(row))),
    leaders: state.leaders.filter((row) => (district === "all" || row.district === district) && (!query || matchText(row))),
  };
}

function setText(id, text) {
  $(id).textContent = text;
}

function pct(part, total) {
  if (!total) return "0%";
  return `${Math.round((part / total) * 100)}%`;
}

function renderOptions() {
  const dates = statsDates();
  const currentYear = new Date().getFullYear();
  const dataYears = dates.map((date) => Number(date.slice(0, 4))).filter(Boolean);
  const startYear = Math.min(currentYear, ...dataYears);
  const endYear = Math.max(currentYear + 10, ...dataYears);
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => String(endYear - index));

  if ($("rangeQuarter")) {
    const currentQuarter = $("rangeQuarter").value;
    const quarters = years.flatMap((year) => [4, 3, 2, 1].map((quarter) => `${year}-Q${quarter}`));
    $("rangeQuarter").innerHTML = quarters.map((quarter) => {
      const [year, q] = quarter.split("-Q");
      return `<option value="${quarter}">${year}年第${q}季</option>`;
    }).join("");
    if (quarters.includes(currentQuarter)) $("rangeQuarter").value = currentQuarter;
  }
  if ($("rangeYear")) {
    const currentYear = $("rangeYear").value;
    $("rangeYear").innerHTML = years.map((year) => `<option value="${year}">${year}年</option>`).join("");
    if (years.includes(currentYear)) $("rangeYear").value = currentYear;
  }
  $("districtSelect").innerHTML = `<option value="all">全部區域</option>${districts.map((d) => `<option value="${d}">${d}</option>`).join("")}`;
}

function syncServiceAttendance(date) {
  const service = state.services.find((item) => item.date === date);
  if (service) {
    service.attendance += 1;
  } else {
    state.services.push({ date, attendance: 1 });
  }
  state.services.sort((a, b) => a.date.localeCompare(b.date));
}

function renderResidenceDistricts() {
  const city = $("newResidenceCity").value;
  const areas = residenceAreas[city] || [];
  $("newResidenceDistrict").innerHTML = areas.map((area) => `<option>${area}</option>`).join("");
}

function barChart(target, data, options = {}) {
  const el = $(target);
  if (!data.length) {
    el.innerHTML = `<div class="empty-state">沒有符合條件的資料</div>`;
    return;
  }
  if (compactCharts()) {
    const width = 360;
    const rowH = 62;
    const margin = { top: 16, right: 16, bottom: 30, left: 18 };
    const height = Math.max(options.height || 250, margin.top + margin.bottom + data.length * rowH);
    const max = Math.max(...data.map((d) => d.value), 1);
    const valueSpace = 34;
    const plotW = width - margin.left - margin.right - valueSpace;
    const barH = 20;
    const bars = data.map((d, i) => {
      const labelY = margin.top + i * rowH + 14;
      const barY = labelY + 14;
      const w = Math.max(3, (d.value / max) * plotW);
      const valueX = margin.left + w + 8;
      const color = palette[i % palette.length];
      return `
        <text class="bar-label" x="${margin.left}" y="${labelY}">${escapeHtml(d.label)}</text>
        <rect x="${margin.left}" y="${barY}" width="${w}" height="${barH}" rx="4" fill="${color}"></rect>
        <text class="value-label" x="${valueX}" y="${barY + barH * 0.72}">${d.value}</text>
      `;
    }).join("");

    el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${options.title || "長條圖"}">
      <line x1="${margin.left}" y1="${height - margin.bottom + 6}" x2="${width - margin.right}" y2="${height - margin.bottom + 6}" stroke="#d9e1ea"></line>
      ${bars}
    </svg>`;
    return;
  }
  const width = 760;
  const height = options.height || 280;
  const margin = { top: 22, right: 34, bottom: 58, left: options.left || 118 };
  const max = Math.max(...data.map((d) => d.value), 1);
  const plotW = width - margin.left - margin.right;
  const barH = Math.min(34, Math.max(18, (height - margin.top - margin.bottom) / data.length - 8));
  const gap = Math.max(7, ((height - margin.top - margin.bottom) - barH * data.length) / Math.max(data.length - 1, 1));

  const bars = data.map((d, i) => {
    const y = margin.top + i * (barH + gap);
    const w = Math.max(2, (d.value / max) * plotW);
    const color = palette[i % palette.length];
    return `
      <text class="bar-label" x="${margin.left - 10}" y="${y + barH * 0.65}" text-anchor="end">${escapeHtml(d.label)}</text>
      <rect x="${margin.left}" y="${y}" width="${w}" height="${barH}" rx="5" fill="${color}"></rect>
      <text class="value-label" x="${margin.left + w + 8}" y="${y + barH * 0.65}">${d.value}</text>
    `;
  }).join("");

  el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${options.title || "長條圖"}">
    <line x1="${margin.left}" y1="${height - margin.bottom + 12}" x2="${width - margin.right}" y2="${height - margin.bottom + 12}" stroke="#d9e1ea"></line>
    ${bars}
  </svg>`;
}

function columnChart(target, data, options = {}) {
  const el = $(target);
  if (!data.length) {
    el.innerHTML = `<div class="empty-state">沒有符合條件的資料</div>`;
    return;
  }
  if (compactCharts()) {
    const width = 360;
    const height = 300;
    const margin = { top: 38, right: 24, bottom: 58, left: 42 };
    const max = Math.max(...data.map((d) => d.value), 1);
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;
    const slot = plotW / data.length;
    const barW = Math.min(44, slot * 0.5);
    const bars = data.map((d, i) => {
      const h = Math.max(4, (d.value / max) * plotH);
      const x = margin.left + i * slot + (slot - barW) / 2;
      const y = margin.top + plotH - h;
      return `
        <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="5" fill="${palette[i % palette.length]}"></rect>
        <text class="value-label" x="${x + barW / 2}" y="${y - 10}" text-anchor="middle">${d.value}</text>
        <text class="axis" x="${x + barW / 2}" y="${height - margin.bottom + 34}" text-anchor="middle">${escapeHtml(d.label)}</text>
      `;
    }).join("");

    el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${options.title || "柱狀圖"}">
      <line x1="${margin.left}" y1="${margin.top + plotH}" x2="${width - margin.right}" y2="${margin.top + plotH}" stroke="#d9e1ea"></line>
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotH}" stroke="#d9e1ea"></line>
      ${bars}
    </svg>`;
    return;
  }
  const width = 900;
  const height = options.height || 320;
  const margin = { top: 30, right: 28, bottom: 66, left: 54 };
  const max = Math.max(...data.map((d) => d.value), 1);
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const slot = plotW / data.length;
  const barW = Math.min(58, slot * 0.58);
  const bars = data.map((d, i) => {
    const h = (d.value / max) * plotH;
    const x = margin.left + i * slot + (slot - barW) / 2;
    const y = margin.top + plotH - h;
    return `
      <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="6" fill="${palette[i % palette.length]}"></rect>
      <text class="value-label" x="${x + barW / 2}" y="${y - 8}" text-anchor="middle">${d.value}</text>
      <text class="axis" x="${x + barW / 2}" y="${height - margin.bottom + 32}" text-anchor="middle">${escapeHtml(d.label)}</text>
    `;
  }).join("");

  el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${options.title || "柱狀圖"}">
    <line x1="${margin.left}" y1="${margin.top + plotH}" x2="${width - margin.right}" y2="${margin.top + plotH}" stroke="#d9e1ea"></line>
    <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotH}" stroke="#d9e1ea"></line>
    ${bars}
  </svg>`;
}

function donutChart(target, data) {
  const el = $(target);
  if (!data.length) {
    el.innerHTML = `<div class="empty-state">沒有符合條件的資料</div>`;
    return;
  }
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (compactCharts()) {
    const radius = 86;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;
    const slices = data.map((d, i) => {
      const length = (d.value / total) * circumference;
      const dash = `${length} ${circumference - length}`;
      const circle = `<circle cx="122" cy="142" r="${radius}" fill="none" stroke="${palette[i % palette.length]}" stroke-width="30" stroke-dasharray="${dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 122 142)"></circle>`;
      offset += length;
      return circle;
    }).join("");
    const legend = data.map((d, i) => `
      <g transform="translate(246 ${78 + i * 34})">
        <rect width="14" height="14" rx="3" fill="${palette[i % palette.length]}"></rect>
        <text class="legend" x="22" y="13">${escapeHtml(d.label)} ${d.value}</text>
      </g>
    `).join("");

    el.innerHTML = `<svg viewBox="0 0 380 300" role="img" aria-label="圓環圖">
      ${slices}
      <circle cx="122" cy="142" r="56" fill="#ffffff"></circle>
      <text x="122" y="137" text-anchor="middle" class="value-label" style="font-size:34px">${total}</text>
      <text x="122" y="168" text-anchor="middle" class="axis" style="font-size:18px">新人</text>
      ${legend}
    </svg>`;
    return;
  }
  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const slices = data.map((d, i) => {
    const length = (d.value / total) * circumference;
    const dash = `${length} ${circumference - length}`;
    const circle = `<circle cx="132" cy="132" r="${radius}" fill="none" stroke="${palette[i % palette.length]}" stroke-width="28" stroke-dasharray="${dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 132 132)"></circle>`;
    offset += length;
    return circle;
  }).join("");
  const legend = data.map((d, i) => `
    <g transform="translate(286 ${58 + i * 30})">
      <rect width="12" height="12" rx="3" fill="${palette[i % palette.length]}"></rect>
      <text class="legend" x="20" y="11">${escapeHtml(d.label)} ${d.value}</text>
    </g>
  `).join("");

  el.innerHTML = `<svg viewBox="0 0 520 264" role="img" aria-label="圓環圖">
    ${slices}
    <circle cx="132" cy="132" r="58" fill="#ffffff"></circle>
    <text x="132" y="126" text-anchor="middle" class="value-label" style="font-size:28px">${total}</text>
    <text x="132" y="150" text-anchor="middle" class="axis">新人</text>
    ${legend}
  </svg>`;
}

function signupChart(target, label, value) {
  const data = [
    { label, value }
  ];
  barChart(target, data, { left: 170 });
}

function leaderChart(target, rows) {
  const data = districts.map((district) => ({
    district,
    meetings: meetingTypes.map((meetingType) => {
      const mine = rows.filter((x) => x.district === district && normalizeMeetingType(x.meetingType) === meetingType);
      return {
        meeting: shortMeetingType(meetingType),
        present: mine.filter((x) => isPresentStatus(x.status)).length,
        absent: mine.filter((x) => !isPresentStatus(x.status)).length
      };
    })
  })).filter((item) => item.meetings.some((meeting) => meeting.present + meeting.absent > 0));
  const el = $(target);
  if (!data.length) {
    el.style.minHeight = "";
    el.innerHTML = `<div class="empty-state">沒有符合條件的資料</div>`;
    return;
  }
  const groupWidth = 300;
  const groupGap = 48;
  const width = Math.max(900, data.length * groupWidth + (data.length - 1) * groupGap + 120);
  const height = 420;
  const margin = { top: 32, right: 28, bottom: 122, left: 54 };
  const max = Math.max(...data.flatMap((d) => d.meetings.flatMap((meeting) => [meeting.present, meeting.absent])), 1);
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const meetingSlot = groupWidth / meetingTypes.length;
  const barW = 30;
  const barGap = 6;
  const bars = data.map((districtGroup, districtIndex) => {
    const groupStart = margin.left + districtIndex * (groupWidth + groupGap);
    const meetingBars = districtGroup.meetings.map((meeting, meetingIndex) => {
      const x = groupStart + meetingIndex * meetingSlot + (meetingSlot - barW * 2 - barGap) / 2;
      const presentH = (meeting.present / max) * plotH;
      const absentH = (meeting.absent / max) * plotH;
      const presentY = margin.top + plotH - presentH;
      const absentY = margin.top + plotH - absentH;
      const labelX = x + barW + barGap / 2;
      return `
        <rect x="${x}" y="${presentY}" width="${barW}" height="${presentH}" rx="5" fill="#178f83"></rect>
        <rect x="${x + barW + barGap}" y="${absentY}" width="${barW}" height="${absentH}" rx="5" fill="#cf4f6c"></rect>
        <text class="value-label" x="${x + barW / 2}" y="${presentY - 8}" text-anchor="middle">${meeting.present || ""}</text>
        <text class="value-label" x="${x + barW * 1.5 + barGap}" y="${absentY - 8}" text-anchor="middle">${meeting.absent || ""}</text>
        <text class="axis" x="${labelX}" y="${height - margin.bottom + 34}" text-anchor="middle">${escapeHtml(meeting.meeting)}</text>
      `;
    }).join("");
    return `
      ${meetingBars}
      <text class="axis district-axis" x="${groupStart + groupWidth / 2}" y="${height - margin.bottom + 62}" text-anchor="middle">${escapeHtml(districtGroup.district)}</text>
    `;
  }).join("");
  el.style.minHeight = "420px";
  el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="幹部出席">
    <line x1="${margin.left}" y1="${margin.top + plotH}" x2="${width - margin.right}" y2="${margin.top + plotH}" stroke="#d9e1ea"></line>
    <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotH}" stroke="#d9e1ea"></line>
    ${bars}
    <g transform="translate(${margin.left} ${height - 30})">
      <rect width="12" height="12" rx="3" fill="#178f83"></rect><text class="legend" x="18" y="11">出席</text>
      <rect x="72" width="12" height="12" rx="3" fill="#cf4f6c"></rect><text class="legend" x="90" y="11">請假</text>
    </g>
  </svg>`;
}

function renderSignupLists(newcomers) {
  const renderList = (target, rows) => {
    const el = $(target);
    if (!el) return;
    if (!rows.length) {
      el.innerHTML = `<li class="empty-signup">目前沒有名單</li>`;
      return;
    }
    el.innerHTML = rows.map((row) => `
      <li>
        <strong>${escapeHtml(row.name || "未填寫姓名")}</strong>
        <span>${escapeHtml([row.district, row.inviter ? `邀請:${row.inviter}` : ""].filter(Boolean).join(" / "))}</span>
      </li>
    `).join("");
  };

  renderList("studySignupList", newcomers.filter((row) => yes(row.willingStudy)));
  renderList("beginnerSignupList", newcomers.filter((row) => yes(row.beginnerClass)));
}

function renderRecords(newcomers, leaders) {
  const newcomerMonth = $("newcomerCalendarMonth")?.value;
  const leaderMonth = $("leaderCalendarMonth")?.value;
  const monthNewcomers = newcomerMonth ? newcomers.filter((row) => row.date?.startsWith(newcomerMonth)) : newcomers;
  const monthLeaders = leaderMonth ? leaders.filter((row) => row.date?.startsWith(leaderMonth)) : leaders;
  const visibleNewcomers = selectedCalendarDates.newcomer ? monthNewcomers.filter((row) => row.date === selectedCalendarDates.newcomer) : monthNewcomers;
  const meetingLeaders = selectedLeaderMeetingType ? monthLeaders.filter((row) => normalizeMeetingType(row.meetingType) === selectedLeaderMeetingType) : monthLeaders;
  const visibleLeaders = selectedCalendarDates.leader ? meetingLeaders.filter((row) => row.date === selectedCalendarDates.leader) : meetingLeaders;
  const sortedNewcomers = [...visibleNewcomers].sort((a, b) => b.date.localeCompare(a.date) || a.name.localeCompare(b.name, "zh-Hant"));
  const sortedLeaders = [...visibleLeaders].sort((a, b) => b.date.localeCompare(a.date) || a.name.localeCompare(b.name, "zh-Hant"));

  $("newcomerRecordTable").innerHTML = sortedNewcomers.map((row) => `
    <tr>
      <td>${escapeHtml(row.date)}</td>
      <td><strong>${escapeHtml(row.name)}</strong></td>
      <td>${escapeHtml(row.district)}</td>
      <td>${escapeHtml(row.residence)}</td>
      <td>${escapeHtml(row.ethnicity)}</td>
      <td>${escapeHtml(ageGroup(row.age))}</td>
      <td>${escapeHtml(row.visits)}</td>
      <td>${escapeHtml(row.reason)}</td>
      <td>${escapeHtml(row.inviter)}</td>
      <td>${escapeHtml(row.inviterPhone || "")}</td>
      <td>${escapeHtml(`陪讀:${row.willingStudy || "未填寫"} / 初訓:${row.beginnerClass || "未填寫"}${row.needs ? ` / ${row.needs}` : ""}`)}</td>
    </tr>
  `).join("");
  $("leaderRecordTable").innerHTML = sortedLeaders.map((row) => `
    <tr>
      <td>${escapeHtml(row.date)}</td>
      <td><strong>${escapeHtml(row.name)}</strong></td>
      <td>${escapeHtml(row.role)}</td>
      <td>${escapeHtml(normalizeMeetingType(row.meetingType))}</td>
      <td>${escapeHtml(row.district)}</td>
      <td>${pill(displayLeaderStatus(row.status))}</td>
    </tr>
  `).join("");
  setText("newcomerTableCount", `${sortedNewcomers.length} 筆`);
  setText("leaderTableCount", `${sortedLeaders.length} 筆`);
  if ($("newcomerSelectedDateLabel")) {
    $("newcomerSelectedDateLabel").textContent = selectedCalendarDates.newcomer ? `目前顯示 ${selectedCalendarDates.newcomer} 的新人紀錄` : "目前顯示整月新人紀錄";
  }
  if ($("leaderSelectedDateLabel")) {
    const label = leaderMeetingLabel(selectedLeaderMeetingType);
    $("leaderSelectedDateLabel").textContent = selectedCalendarDates.leader
      ? `目前顯示 ${selectedCalendarDates.leader} 的${label}紀錄`
      : `目前顯示整月${label}紀錄`;
  }
}

function getSundays(monthValue) {
  if (!monthValue) return [];
  const [year, month] = monthValue.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  const sundays = [];
  while (date.getMonth() === month - 1) {
    if (date.getDay() === 0) {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      sundays.push(`${yyyy}-${mm}-${dd}`);
    }
    date.setDate(date.getDate() + 1);
  }
  return sundays;
}

function getMonthCalendarCells(monthValue) {
  if (!monthValue) return [];
  const [year, month] = monthValue.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const cells = [];
  for (let i = 0; i < firstDay.getDay(); i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(year, month - 1, day);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    cells.push({
      day,
      date: `${yyyy}-${mm}-${dd}`,
      isSunday: date.getDay() === 0,
    });
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

function renderSundayCalendar(view) {
  const monthValue = $("newcomerCalendarMonth")?.value;
  const calendar = $("newcomerCalendar");
  if (!monthValue) return;
  if (!calendar) return;
  const { newcomers } = calendarRows();
  const sundays = getSundays(monthValue);
  const monthNumber = Number(monthValue.split("-")[1]);
  if ($("newcomerCalendarTitle")) {
    $("newcomerCalendarTitle").textContent = `${monthNumber}月 新人留名紀錄`;
  }
  if ($("newcomerCalendarSummary")) {
    $("newcomerCalendarSummary").textContent = `${sundays.length} 個主日`;
  }
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  calendar.innerHTML = [
    ...weekdays.map((day) => `<div class="calendar-weekday">${day}</div>`),
    ...getMonthCalendarCells(monthValue).map((cell) => {
      if (!cell) return `<div class="calendar-day empty"></div>`;
      const newcomerCount = newcomers.filter((row) => row.date === cell.date).length;
      const clickable = cell.isSunday;
      const active = selectedCalendarDates.newcomer === cell.date ? "active" : "";
      return `
        <div class="calendar-day ${cell.isSunday ? "sunday" : ""} ${clickable ? "clickable" : ""} ${active}">
          <button type="button" data-date="${cell.date}" ${clickable ? "" : "disabled"}>
            <strong class="calendar-date">${cell.day}</strong>
            ${clickable ? `<span>新人 ${newcomerCount} 筆</span>` : ""}
          </button>
        </div>
      `;
    }),
  ].join("");
  calendar.querySelectorAll(".calendar-day.clickable button").forEach((card) => {
    card.addEventListener("click", () => {
      selectedCalendarDates.newcomer = card.dataset.date;
      render();
      $("newcomerRecords")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function leaderMeetingLabel(meetingType) {
  if (normalizeMeetingType(meetingType) === "主日聚會") return "主日";
  if (normalizeMeetingType(meetingType) === "幹部訓練") return "幹訓";
  if (normalizeMeetingType(meetingType) === "小組聚會") return "小組";
  return "幹部";
}

function renderLeaderCalendar() {
  const monthValue = $("leaderCalendarMonth")?.value;
  const calendar = $("leaderCalendar");
  if (!monthValue || !calendar) return;
  const { leaders } = calendarRows();
  const monthNumber = Number(monthValue.split("-")[1]);
  const meetingLabel = leaderMeetingLabel(selectedLeaderMeetingType);
  const meetingRows = leaders.filter((row) => row.date?.startsWith(monthValue) && normalizeMeetingType(row.meetingType) === selectedLeaderMeetingType);
  if ($("leaderCalendarTitle")) {
    $("leaderCalendarTitle").textContent = `${monthNumber}月`;
  }
  if ($("leaderCalendarSummary")) {
    $("leaderCalendarSummary").textContent = `${meetingRows.length} 筆紀錄`;
  }
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  calendar.innerHTML = [
    ...weekdays.map((day) => `<div class="calendar-weekday">${day}</div>`),
    ...getMonthCalendarCells(monthValue).map((cell) => {
      if (!cell) return `<div class="calendar-day empty"></div>`;
      const rows = meetingRows.filter((row) => row.date === cell.date);
      const present = rows.filter((row) => isPresentStatus(row.status)).length;
      const leave = rows.length - present;
      const active = selectedCalendarDates.leader === cell.date ? "active" : "";
      return `
        <div class="calendar-day ${cell.isSunday ? "sunday" : ""} ${rows.length ? "clickable" : ""} ${active}">
          <button type="button" data-date="${cell.date}" ${rows.length ? "" : "disabled"}>
            <strong class="calendar-date">${cell.day}</strong>
            ${rows.length ? `<span>幹部${rows.length}筆</span><small>出席${present}/請假${leave}</small>` : ""}
          </button>
        </div>
      `;
    }),
  ].join("");
  calendar.querySelectorAll(".calendar-day.clickable button").forEach((card) => {
    card.addEventListener("click", () => {
      selectedCalendarDates.leader = card.dataset.date;
      render();
      $("leaderRecords")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  renderLeaderDistrictSummary(meetingRows);
}

function renderLeaderDistrictSummary(meetingRows) {
  const el = $("leaderDistrictSummary");
  if (!el) return;
  const visibleRows = selectedCalendarDates.leader
    ? meetingRows.filter((row) => row.date === selectedCalendarDates.leader)
    : meetingRows;
  el.innerHTML = `
    <h3>各區紀錄</h3>
    <div class="district-summary-list">
      ${districts.map((district) => {
        const rows = visibleRows.filter((row) => row.district === district);
        const present = rows.filter((row) => isPresentStatus(row.status)).length;
        const leave = rows.length - present;
        const text = rows.length ? `${rows.length}筆（出席${present} / 請假${leave}）` : "0筆";
        return `<div><strong>${escapeHtml(district)}</strong><span>${text}</span></div>`;
      }).join("")}
    </div>
  `;
}

function pill(value) {
  return `<span class="pill">${escapeHtml(value)}</span>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function render() {
  const { newcomers, services, leaders } = selectedRows();
  const totalAttendance = services.reduce((sum, row) => sum + Number(row.attendance || 0), 0);
  const willingStudy = newcomers.filter((x) => yes(x.willingStudy)).length;
  const beginnerClass = newcomers.filter((x) => yes(x.beginnerClass)).length;
  const leaderPresent = leaders.filter((x) => isPresentStatus(x.status)).length;
  const leaderAbsent = leaders.length - leaderPresent;

  setText("totalAttendance", totalAttendance);
  setText("periodCount", `${services.length} 場聚會`);
  setText("newcomerCount", newcomers.length);
  setText("newcomerRate", `${newcomers.length} 筆新人留名`);
  setText("studyCount", willingStudy);
  setText("studyRate", pct(willingStudy, newcomers.length));
  setText("beginnerClassCount", beginnerClass);
  setText("beginnerClassRate", pct(beginnerClass, newcomers.length));
  setText("leaderRate", pct(leaderPresent, leaders.length));
  setText("leaderAbsences", `${leaderAbsent} 次請假`);

  columnChart("attendanceChart", services.map((x) => ({ label: x.date.slice(5), value: Number(x.attendance || 0) })), { height: 320 });
  barChart("ageChart", countBy(newcomers, (x) => ageGroup(x.age), [...ageGroups, "未填寫"]));
  donutChart("ethnicityChart", countBy(newcomers, (x) => x.ethnicity));
  barChart("residenceChart", countBy(newcomers, (x) => x.residence).slice(0, 7));
  barChart("visitChart", countBy(newcomers, (x) => visitGroup(Number(x.visits || 1)), ["第1次", "第2次", "第3次", "4次以上"]));
  barChart("reasonChart", countBy(newcomers, (x) => x.reason).slice(0, 7));
  barChart("needChart", countBy(newcomers, (x) => String(x.needs || "").split(";").map((item) => item.trim())).slice(0, 8));
  signupChart("studyChart", "是否願意接受陪讀", willingStudy);
  signupChart("beginnerChart", "是否願意報名初訓班", beginnerClass);
  renderSignupLists(newcomers);
  barChart("districtChart", countBy(newcomers, (x) => x.district, districts));
  leaderChart("leaderChart", leaders);
  const recordRows = calendarRows();
  renderRecords(recordRows.newcomers, recordRows.leaders);
  renderSundayCalendar();
  renderLeaderCalendar();
}

function refreshDashboardData() {
  state = loadData();
  renderOptions();
  render();
}

function setupMainTabs() {
  document.querySelectorAll(".main-tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".main-tab").forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      updateDashboardView(button.dataset.targetView);
      render();
    });
  });
}

function setupLeaderCalendarTabs() {
  document.querySelectorAll(".calendar-tab[data-leader-meeting]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".calendar-tab[data-leader-meeting]").forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      selectedLeaderMeetingType = button.dataset.leaderMeeting;
      selectedCalendarDates.leader = null;
      render();
    });
  });
}

function quarterValue(date) {
  const [year, month] = date.split("-").map(Number);
  return `${year}-Q${Math.floor((month - 1) / 3) + 1}`;
}

function addMonths(monthValue, offset) {
  const [year, month] = monthValue.split("-").map(Number);
  const date = new Date(year, month - 1 + offset, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function renderRangeDateCalendar() {
  const calendar = $("rangeDateCalendar");
  const selectedDate = $("rangeDate")?.value;
  if (!calendar || !selectedDate) return;
  calendar.classList.toggle("hidden", !rangeCalendarOpen);
  if (!rangeCalendarOpen) return;

  const monthValue = selectedDate.slice(0, 7);
  const [year, month] = monthValue.split("-").map(Number);
  const recordDates = new Set(statsDates());
  const cells = getMonthCalendarCells(monthValue);
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  const currentYear = new Date().getFullYear();
  const dataYears = statsDates().map((date) => Number(date.slice(0, 4))).filter(Boolean);
  const startYear = Math.min(currentYear, year, ...dataYears);
  const endYear = Math.max(currentYear + 10, year, ...dataYears);
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => endYear - index);

  calendar.innerHTML = `
    <div class="range-calendar-head">
      <button type="button" data-month="${addMonths(monthValue, -1)}">‹</button>
      <div class="range-calendar-selects">
        <select data-calendar-year>${years.map((item) => `<option value="${item}" ${item === year ? "selected" : ""}>${item}年</option>`).join("")}</select>
        <select data-calendar-month>${Array.from({ length: 12 }, (_, index) => index + 1).map((item) => `<option value="${item}" ${item === month ? "selected" : ""}>${String(item).padStart(2, "0")}月</option>`).join("")}</select>
      </div>
      <button type="button" data-month="${addMonths(monthValue, 1)}">›</button>
    </div>
    <div class="range-calendar-grid">
      ${weekdays.map((day) => `<span class="range-weekday">${day}</span>`).join("")}
      ${cells.map((cell) => {
        if (!cell) return `<span class="range-date empty"></span>`;
        const hasRecord = recordDates.has(cell.date);
        const active = selectedDate === cell.date;
        return `<button type="button" class="range-date ${hasRecord ? "has-record" : ""} ${active ? "active" : ""}" data-date="${cell.date}">${cell.day}</button>`;
      }).join("")}
    </div>
  `;
  calendar.querySelectorAll(".range-calendar-head button").forEach((button) => {
    button.addEventListener("click", () => {
      $("rangeDate").value = `${button.dataset.month}-01`;
      renderRangeDateCalendar();
      render();
    });
  });
  calendar.querySelector("[data-calendar-year]")?.addEventListener("change", (event) => {
    $("rangeDate").value = `${event.target.value}-${String(month).padStart(2, "0")}-01`;
    renderRangeDateCalendar();
    render();
  });
  calendar.querySelector("[data-calendar-month]")?.addEventListener("change", (event) => {
    $("rangeDate").value = `${year}-${String(event.target.value).padStart(2, "0")}-01`;
    renderRangeDateCalendar();
    render();
  });
  calendar.querySelectorAll(".range-date[data-date]").forEach((button) => {
    button.addEventListener("click", () => {
      $("rangeDate").value = button.dataset.date;
      rangeCalendarOpen = false;
      renderRangeDateCalendar();
      render();
    });
  });
}

function updateRangeValueControls() {
  const type = $("rangeTypeSelect")?.value || "month";
  const visibleId = {
    day: "rangeDate",
    month: "rangeMonth",
    quarter: "rangeQuarter",
    year: "rangeYear"
  }[type];
  ["rangeDate", "rangeMonth", "rangeQuarter", "rangeYear"].forEach((id) => {
    $(id)?.classList.toggle("hidden", id !== visibleId);
  });
  if (type !== "day") rangeCalendarOpen = false;
  renderRangeDateCalendar();
}

function setupStatRangeControls() {
  const latest = latestStatsDate();
  if ($("rangeTypeSelect")) $("rangeTypeSelect").value = "month";
  if ($("rangeDate")) $("rangeDate").value = latest;
  if ($("rangeMonth")) $("rangeMonth").value = currentMonthValue();
  if ($("rangeQuarter")) $("rangeQuarter").value = quarterValue(latest);
  if ($("rangeYear")) $("rangeYear").value = latest.slice(0, 4);
  updateRangeValueControls();

  $("rangeTypeSelect")?.addEventListener("input", () => {
    updateRangeValueControls();
    render();
  });
  ["rangeDate", "rangeMonth", "rangeQuarter", "rangeYear"].forEach((id) => {
    $(id)?.addEventListener("input", render);
  });
  $("rangeDate")?.addEventListener("click", () => {
    rangeCalendarOpen = true;
    renderRangeDateCalendar();
  });
  document.addEventListener("click", (event) => {
    if (!rangeCalendarOpen) return;
    if ($("rangeDateCalendar")?.contains(event.target) || $("rangeDate")?.contains(event.target)) return;
    rangeCalendarOpen = false;
    renderRangeDateCalendar();
  });
}

function updateDashboardView(view) {
  const isLeader = view === "leader";
  document.querySelectorAll(".newcomer-view").forEach((element) => {
    element.classList.toggle("view-hidden", isLeader);
  });
  document.querySelectorAll(".leader-view").forEach((element) => {
    element.classList.toggle("view-hidden", !isLeader);
  });
}

function setupCalendarMonth() {
  const fallbackMonth = today().slice(0, 7);
  const newcomerInput = $("newcomerCalendarMonth");
  const leaderInput = $("leaderCalendarMonth");
  const latestNewcomerDate = state.newcomers.map((row) => row.date).filter(Boolean).sort().pop();
  const latestLeaderDate = state.leaders.map((row) => row.date).filter(Boolean).sort().pop();

  if (newcomerInput) {
    newcomerInput.value = latestNewcomerDate ? latestNewcomerDate.slice(0, 7) : fallbackMonth;
    newcomerInput.addEventListener("input", () => {
      selectedCalendarDates.newcomer = null;
      render();
    });
  }
  if (leaderInput) {
    leaderInput.value = latestLeaderDate ? latestLeaderDate.slice(0, 7) : fallbackMonth;
    leaderInput.addEventListener("input", () => {
      selectedCalendarDates.leader = null;
      render();
    });
  }
  $("clearNewcomerDateFilter")?.addEventListener("click", () => {
    selectedCalendarDates.newcomer = null;
    render();
  });
  $("clearLeaderDateFilter")?.addEventListener("click", () => {
    selectedCalendarDates.leader = null;
    render();
  });
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function exportCsv() {
  const headers = ["date", "name", "age", "ethnicity", "residence", "visits", "reason", "inviter", "inviterPhone", "needs", "willingStudy", "beginnerClass", "district"];
  const lines = [headers.join(","), ...state.newcomers.map((row) => headers.map((key) => csvEscape(row[key])).join(","))];
  const blob = new Blob([`\ufeff${lines.join("\n")}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "church-newcomers.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (cell || row.length) {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      }
      if (char === "\r" && next === "\n") i += 1;
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function importCsv(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const rows = parseCsv(String(reader.result || ""));
    const headers = rows.shift()?.map((x) => x.trim()) || [];
    const required = ["date", "name", "age", "ethnicity", "residence", "visits", "reason", "needs", "willingStudy", "beginnerClass", "district"];
    const hasRequired = required.every((key) => headers.includes(key));
    if (!hasRequired) {
      alert(`CSV 欄位需要包含：${required.join(", ")}`);
      return;
    }
    state.newcomers = rows.filter((row) => row.length > 1).map((row) => {
      const item = {};
      headers.forEach((key, index) => {
        item[key] = row[index] || "";
      });
      item.age = Number(item.age || 0);
      item.visits = Number(item.visits || 1);
      return item;
    });
    state.services = countBy(state.newcomers, (x) => x.date).map((x) => ({ date: x.label, attendance: x.value }));
    saveData();
    renderOptions();
    render();
  };
  reader.readAsText(file, "utf-8");
}

function formToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function flashMessage(id, text) {
  setText(id, text);
  window.setTimeout(() => setText(id, ""), 3000);
}

function clearForm(form) {
  const date = form.querySelector('input[type="date"]')?.value || today();
  form.reset();
  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) dateInput.value = date;
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
  if (normalizeMeetingType(record.meetingType) !== expected) {
    alert(`日期與聚會類型不一致，${record.date} 應該選「${expected}」。`);
    return false;
  }
  return true;
}

function updateActiveView(target) {
  const isLeader = target === "leaderCheckin";
  document.querySelectorAll(".newcomer-view").forEach((element) => {
    element.classList.toggle("view-hidden", isLeader);
  });
  document.querySelectorAll(".leader-view").forEach((element) => {
    element.classList.toggle("view-hidden", !isLeader);
  });
}

function setupCheckins() {
  if (!$("newDate")) return;
  $("newDate").value = today();
  $("leaderDate").value = today();
  $("newAge").innerHTML = ageGroups.map((group) => `<option>${group}</option>`).join("");
  $("newResidenceCity").innerHTML = Object.keys(residenceAreas).map((city) => `<option>${city}</option>`).join("");
  $("newResidenceCity").value = "新北市";
  renderResidenceDistricts();
  $("newResidenceDistrict").value = "板橋區";
  $("newResidenceCity").addEventListener("change", renderResidenceDistricts);

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab-button").forEach((tab) => tab.classList.remove("active"));
      document.querySelectorAll(".checkin-form").forEach((form) => form.classList.remove("active"));
      button.classList.add("active");
      $(button.dataset.target).classList.add("active");
      updateActiveView(button.dataset.target);
    });
  });
  updateActiveView("newcomerCheckin");

  $("newcomerCheckin").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = formToObject(event.currentTarget);
    const record = {
      ...data,
      id: recordId("newcomer"),
      createdAt: new Date().toISOString(),
      residence: `${data.residenceCity}-${data.residenceDistrict}`,
      age: data.age,
      visits: Number(data.visits || 1),
    };
    state.newcomers.push(record);
    syncServiceAttendance(data.date);
    saveData();
    sendRecordToGoogleSheet("newcomer", record);
    renderOptions();
    render();
    clearForm(event.currentTarget);
    flashMessage("newcomerMessage", "新人簽到已加入統計");
  });

  $("leaderCheckin").addEventListener("submit", (event) => {
    event.preventDefault();
    const record = {
      ...formToObject(event.currentTarget),
      id: recordId("leader"),
      createdAt: new Date().toISOString(),
    };
    if (!validateLeaderMeetingDate(record)) return;
    state.leaders.push(record);
    saveData();
    sendRecordToGoogleSheet("leader", record);
    renderOptions();
    render();
    clearForm(event.currentTarget);
    flashMessage("leaderMessage", "幹部簽到已加入統計");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  $("scrollTopButton")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  setupCheckins();
  setupMainTabs();
  setupLeaderCalendarTabs();
  renderOptions();
  setupStatRangeControls();
  setupCalendarMonth();
  updateDashboardView("newcomer");
  render();
  syncGoogleSheetData();
  ["districtSelect", "searchInput"].forEach((id) => $(id).addEventListener("input", render));
  $("exportButton").addEventListener("click", exportCsv);
  $("csvInput").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importCsv(file);
    event.target.value = "";
  });
  window.addEventListener("storage", (event) => {
    if (event.key === "churchDashboardData" || event.key === "churchDashboardDataUpdated") {
      refreshDashboardData();
    }
  });
  if ("BroadcastChannel" in window) {
    const channel = new BroadcastChannel("churchDashboardData");
    channel.addEventListener("message", (event) => {
      if (event.data?.type === "updated") refreshDashboardData();
    });
  }
});
