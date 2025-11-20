document.addEventListener("DOMContentLoaded", function () {
  const timeline = document.getElementById("timeline");

  const events = [
    { date: "1997年6月30日", content: "英国国旗降下，香港最后一任总督离港。" },
    { date: "1997年7月1日", content: "中英交接仪式，香港正式回归中国。" },
    { date: "1997年7月1日", content: "中国人民解放军驻港部队进驻香港。" }
  ];

  events.forEach((event, index) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `<h3>${event.date}</h3><p>${event.content}</p >`;
    item.style.animationDelay = `${index * 0.3}s`;
    timeline.appendChild(item);
  });
});
// 点赞功能
function like(btn) {
  const current = btn.textContent;
  const num = parseFloat(current.match(/[\d.]+/)[0]);
  const newNum = (num + 0.1).toFixed(1);
  btn.textContent = current.replace(/[\d.]+/, newNum);
  btn.classList.add("liked");
  btn.disabled = true; // 只让点一次
}

/* ---------- 投票逻辑 ---------- */
const voteForm = document.getElementById('voteForm');
const resultBox = document.getElementById('result');
const STORAGE_KEY = 'hk1997voted';

// 初始化数据（若 localStorage 已有就沿用，否则新建）
let votes = JSON.parse(localStorage.getItem('hk1997votes')) || {
  A: 15,
  B: 23,
  C: 8,
  D: 4
};

// 页面加载时如果已投过，直接显示结果
if (localStorage.getItem(STORAGE_KEY)) {
  showResult();
}

voteForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const checked = document.querySelector('input[name="option"]:checked');
  if (!checked) {
    alert('请先选择一个选项！');
    return;
  }
  // 记录投票
  votes[checked.value]++;
  localStorage.setItem('hk1997votes', JSON.stringify(votes));
  localStorage.setItem(STORAGE_KEY, '1');
  showResult();
});

function showResult() {
  voteForm.style.display = 'none';
  resultBox.classList.remove('hidden');
  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  document.querySelectorAll('.bar').forEach(bar => {
    const opt = bar.dataset.opt;
    const pct = ((votes[opt] / total) * 100).toFixed(1);
    bar.querySelector('.pct').textContent = pct + '%';
    bar.style.setProperty('--w', pct);
    // 动画宽度
    setTimeout(() => bar.style.setProperty('width', pct + '%'), 100);
  });
}

 //重置投票
 document.getElementById('resetBtn').onclick = () => {
   if (confirm('确定重置投票？')) {
     localStorage.removeItem('hk1997voted');
     localStorage.removeItem('hk1997votes');
     location.reload();          // 刷新页面
   }
 };
