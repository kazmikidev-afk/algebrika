/* אלגבריקה — ספריית דפי עבודה וסימולציות למבחן 25.10 (תוכן קבוע מדפי העבודה שהוכנו) */
(() => {
  'use strict';

  /* ---------- answer matching (exact-value, unit-tolerant, multi-token) ---------- */
  function keyOf(s) {
    const t = String(s ?? '').replace(/[−–—]/g, '-').replace(/[.,](?=\d{3}\b)/g, '').trim();
    const k = t.replace(/[^\d.,:+\-/]/g, '');
    return (k && /\d/.test(k)) ? k : t.replace(/\s+/g, '');
  }
  function eqTok(a, b) {
    const A = keyOf(a), B = keyOf(b);
    if (A === B) return true;
    const x = Number(A.replace(',', '.')), y = Number(B.replace(',', '.'));
    return isFinite(x) && isFinite(y) && Math.abs(x - y) < 1e-9;
  }
  function matchQ(q, raw) {
    const v = String(raw ?? '').trim();
    if (!v) return false;
    if (q.multi) {
      const nums = v.match(/-?\d+(?:[.,]\d+)?/g) || [];
      return q.multi.every(req => nums.some(t => eqTok(t, req)));
    }
    const cands = [v];
    (q.unit || []).forEach(u => { cands.push(v + u); cands.push(v + ' ' + u); });
    return (q.a || []).some(ans => cands.some(c => eqTok(c, ans)));
  }

  /* ---------- sets: worksheets 1-4 (text-only); 5-7 with diagrams land next ---------- */
  const SETS = [
    { id: 'ws1', title: 'דף עבודה 1 — משוואות עם חוק הפילוג', topic: 'משוואות',
      desc: '9 שאלות מדף העבודה: פתיחת סוגריים בחוק הפילוג ופתרון משוואות.',
      qs: [
        { m: '5(x+2) = 35', a: ['5', 'x=5'], hint: 'פותחים סוגריים: 5x+10=35, ואז מעבירים אגפים.' },
        { m: '3(x-4) = 21', a: ['13', 'x=13'], hint: 'פותחים סוגריים: 3x-12=21.' },
        { m: '4(x+3) = 52', a: ['10', 'x=10'], hint: 'פותחים סוגריים: 4x+12=52.' },
        { p: 'התשובה חיובית:', m: '2(x-7) = -6', a: ['4', 'x=4'], hint: 'פותחים סוגריים: 2x-14=-6.' },
        { m: '6(3-x) = 12', a: ['1', 'x=1'], hint: 'פותחים סוגריים: 18-6x=12. שימו לב למינוס לפני ה־x.' },
        { m: '3(x+2) + 5 = 26', a: ['5', 'x=5'], hint: 'פותחים סוגריים: 3x+6+5=26.' },
        { m: '2(x+5) = 3(x+1)', a: ['7', 'x=7'], hint: 'פותחים שני האגפים: 2x+10=3x+3, ומעבירים אגפים.' },
        { m: '4(x+1) + 2(x-3) = 28', a: ['5', 'x=5'], hint: '4x+4+2x-6=28, כלומר 6x-2=28.' },
        { p: 'אתגר — התשובה שלילית:', m: '3(2x+1) = 5(x-2)', a: ['-13', 'x=-13'], hint: '6x+3=5x-10. מעבירים אגפים בזהירות עם הסימנים.' },
      ] },
    { id: 'ws2', title: 'דף עבודה 2 — מינוס לפני סוגריים', topic: 'מינוס לפני סוגריים',
      desc: '9 שאלות מדף העבודה: פישוט ביטויים ומשוואות עם מינוס לפני סוגריים.',
      qs: [
        { p: 'פשטו את הביטוי:', m: '12 - (3x+5)', a: ['7-3x', '-3x+7'], hint: 'מינוס לפני סוגריים הופך את כל הסימנים: 12-3x-5.' },
        { p: 'פשטו את הביטוי:', m: '8x - (5x+2)', a: ['3x-2'], hint: '8x-5x-2.' },
        { p: 'פשטו את הביטוי (שימו לב למינוס הכפול):', m: '7x - (2x-9)', a: ['5x+9'], hint: '7x-2x+9 — המינוס הופך גם את ה־9-.' },
        { p: 'פשטו את הביטוי:', m: '20 - (4x-6)', a: ['26-4x', '-4x+26'], hint: '20-4x+6.' },
        { m: '15 - (2x+3) = 4', a: ['4', 'x=4'], hint: '15-2x-3=4, כלומר 12-2x=4.' },
        { m: '9x - (4x-7) = 22', a: ['3', 'x=3'], hint: '9x-4x+7=22, כלומר 5x=15.' },
        { m: '10 - (3x-5) = -9', a: ['8', 'x=8'], hint: '10-3x+5=-9, כלומר -3x=-24.' },
        { m: '7x + 3 - (2x+8) = 20', a: ['5', 'x=5'], hint: '7x+3-2x-8=20, כלומר 5x-5=20.' },
        { p: 'אתגר:', m: '4(2x+1) - 3(x-2) = 35', a: ['5', 'x=5'], hint: '8x+4-3x+6=35, כלומר 5x=25.' },
      ] },
    { id: 'ws3', title: 'דף עבודה 3 — בעיות מילוליות במשוואות', topic: 'בעיות מילוליות',
      desc: '8 שאלות מדף העבודה: בניית משוואה מבעיה מילולית ופתרונה.',
      qs: [
        { p: 'מספר אחד גדול ב־9 ממספר אחר. סכום שני המספרים 47. מצאו את שני המספרים.', multi: ['19', '28'], hint: 'סמנו x לקטן, הגדול x+9. המשוואה: x+(x+9)=47. (כתבו את שני המספרים)' },
        { p: 'סכום שלושה מספרים עוקבים הוא 72. מצאו את שלושת המספרים.', multi: ['23', '24', '25'], hint: 'מספרים עוקבים: x, x+1, x+2. המשוואה: x+(x+1)+(x+2)=72.' },
        { p: 'מספר אחד גדול פי 4 ממספר אחר. סכום שני המספרים 60. מצאו את שני המספרים.', multi: ['12', '48'], hint: 'x ו־4x. המשוואה: x+4x=60.' },
        { p: 'אורך מלבן גדול ב־4 ס״מ מרוחבו. היקף המלבן 40 ס״מ. מצאו את הרוחב והאורך.', multi: ['8', '12'], hint: 'רוחב x, אורך x+4. היקף: 2x+2(x+4)=40. (רוחב ואורך בס״מ)' },
        { p: 'רונית קנתה 3 מחברות באותו מחיר ועט ב־6 ש״ח. שילמה בסך הכול 51 ש״ח. מה מחיר מחברת?', a: ['15', '15 ש״ח'], hint: 'מחיר מחברת x: 3x+6=51.' },
        { p: 'כרטיס למבוגר יקר ב־12 ש״ח מכרטיס לילד. משפחה קנתה 2 כרטיסי מבוגר ו־3 כרטיסי ילד ושילמה 109 ש״ח. מה מחיר כרטיס ילד ומה מחיר כרטיס מבוגר?', multi: ['17', '29'], hint: 'כרטיס ילד x, מבוגר x+12: 3x+2(x+12)=109. (ילד ומבוגר בש״ח)' },
        { p: 'ליוסי יש פי 3 כרטיסים מדני. אם יוסי יתן לדני 12 כרטיסים, יהיה להם מספר שווה. כמה כרטיסים יש לכל אחד?', multi: ['12', '36'], hint: 'דני x, יוסי 3x. אחרי הנתינה: 3x-12=x+12. (דני ויוסי)' },
        { p: 'אתגר — אמא מבוגרת פי 3 מבתה. בעוד 4 שנים סכום גילאיהן יהיה 56. בת כמה הבת היום?', a: ['12', '12 שנים'], hint: 'בת x, אמא 3x. בעוד 4 שנים: (x+4)+(3x+4)=56.' },
      ] },
    { id: 'ws4', title: 'דף עבודה 4 — יחס, פרופורציה וקנה מידה', topic: 'יחס ופרופורציה',
      desc: '9 שאלות מדף העבודה: צמצום יחס, פרופורציה, חלוקה ביחס וקנה מידה.',
      qs: [
        { p: 'כתבו את היחס בצורתו הפשוטה ביותר:', m: '18:24', a: ['3:4'], hint: 'מחלקים את שני האיברים באותו מספר (6).' },
        { p: 'בכיתה 15 בנים ו־20 בנות. מה היחס בנים:בנות בצורתו הפשוטה ביותר?', a: ['3:4'], hint: '15:20 ואז מצמצמים ב־5.' },
        { p: 'מחלקים 84 ש״ח בין שני ילדים ביחס 3:4. כמה מקבל כל ילד?', multi: ['36', '48'], hint: 'סה״כ 3+4=7 חלקים; 84:7=12 לחלק. (כתבו שני הסכומים)' },
        { p: 'פתרו את הפרופורציה:', m: 'x/5 = 40/8', a: ['25', 'x=25'], hint: 'כפל בהצלבה: 8x=5·40.' },
        { p: 'פתרו את הפרופורציה:', m: 'x/6 = 7/3', a: ['14', 'x=14'], hint: 'כפל בהצלבה: 3x=6·7.' },
        { p: 'קנה המידה במפה הוא 1:50000. המרחק במפה בין שתי נקודות 7 ס״מ. מה המרחק האמיתי בק״מ?', a: ['3.5', '3.5 ק״מ'], unit: ['ק״מ'], hint: '7 ס״מ במפה × 50000 = 350000 ס״מ, וממירים לק״מ (÷100000).' },
        { p: 'המרחק האמיתי בין שני יישובים 12 ק״מ. קנה המידה במפה 1:400000. מה המרחק במפה בס״מ?', a: ['3', '3 ס״מ'], unit: ['ס״מ'], hint: '12 ק״מ = 1,200,000 ס״מ; ÷400000.' },
        { p: 'לערבוב צבע מערבבים כחול ולבן ביחס 5:3 (כחול:לבן). הכינו 24 ק״ג תערובת. כמה גרם צבע כחול יש בתערובת?', a: ['15000', '15000 גרם'], unit: ['גרם'], hint: 'סה״כ 5+3=8 חלקים; כחול = 5/8 מ־24 ק״ג, ואז להמיר לגרמים.' },
        { p: 'אתגר — דגם של גשר באורך 14 ס״מ בנוי בקנה מידה 1:250. מה אורך הגשר האמיתי במטרים?', a: ['35', '35 מ׳'], unit: ['מ׳'], hint: '14 ס״מ × 250 = 3500 ס״מ, וממירים למטרים (÷100).' },
      ] },
  ];

  /* ---------- persistence: same algebrika-v3 state, existing state.hw subkey ---------- */
  function hwState(setId) {
    if (typeof state === 'undefined') return {};
    state.hw = state.hw || {};
    state.hw[setId] = state.hw[setId] || {};
    return state.hw[setId];
  }
  function markOk(setId, idx) {
    const h = hwState(setId);
    h[idx] = 1;
    if (typeof save === 'function') save();
    if (typeof ping === 'function') ping();
  }
  function setProgress(set) {
    const h = hwState(set.id);
    const n = set.qs.reduce((s, q, i) => s + (h[i] ? 1 : 0), 0);
    return n + '/' + set.qs.length;
  }

  /* ---------- UI ---------- */
  let panel = null, body = null;

  function buildPanel() {
    if (panel) return;
    panel = document.createElement('div');
    panel.className = 'tool-panel';
    panel.id = 'wsPanel';
    panel.innerHTML = '<div class="tool-inner"><div class="tool-head"><h2 style="margin:0">דפי עבודה למבחן 25.10</h2>'
      + '<button class="btn ghost" id="wsClose">סגירה</button></div>'
      + '<p style="color:var(--muted);margin-top:0">דפי העבודה שהוכנו בשבוע האחרון — באותן שאלות בדיוק, עם בדיקה מיידית באפליקציה. הפתרונות המלאים נשארים בדרייב הפרטי.</p>'
      + '<div id="wsBody"></div></div>';
    document.body.appendChild(panel);
    body = panel.querySelector('#wsBody');
    panel.querySelector('#wsClose').onclick = closeLibrary;
  }

  function openLibrary() {
    buildPanel();
    renderLibrary();
    panel.classList.add('show');
    document.body.style.overflow = 'hidden';
    try { history.replaceState(null, '', '#worksheets'); } catch (e) {}
  }
  function closeLibrary() {
    if (panel) panel.classList.remove('show');
    document.body.style.overflow = '';
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
  }

  function renderLibrary() {
    body.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'grid';
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px';
    SETS.forEach(set => {
      const card = document.createElement('div');
      card.className = 'pcard';
      card.style.cssText = 'border:1px solid var(--line);border-radius:16px;padding:14px;background:var(--paper);cursor:pointer';
      card.innerHTML = '<b>' + set.title + '</b>'
        + '<div style="color:var(--muted);font-size:14px;margin:6px 0">' + set.desc + '</div>'
        + '<div style="display:flex;justify-content:space-between;align-items:center">'
        + '<span style="color:var(--teal);font-weight:700">' + setProgress(set) + ' ✓</span>'
        + '<button class="btn">פתיחה</button></div>';
      card.onclick = () => openSet(set.id);
      grid.appendChild(card);
    });
    body.appendChild(grid);
  }

  function openSet(id) {
    const set = SETS.find(s => s.id === id);
    if (!set) return;
    const h = hwState(set.id);
    body.innerHTML = '';
    const head = document.createElement('div');
    head.style.cssText = 'display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px';
    head.innerHTML = '<button class="btn ghost" id="wsBack">→ כל דפי העבודה</button>'
      + '<b>' + set.title + '</b>'
      + '<span style="color:var(--teal);font-weight:700">' + setProgress(set) + ' ✓</span>';
    body.appendChild(head);
    head.querySelector('#wsBack').onclick = renderLibrary;

    const note = document.createElement('p');
    note.style.cssText = 'color:var(--muted);margin:0 0 6px';
    note.textContent = set.desc + ' כתבו רק את התשובה הסופית; דרך הפתרון המלאה בדף הפתרונות הפרטי.';
    body.appendChild(note);

    set.qs.forEach((q, i) => {
      const box = document.createElement('div');
      box.className = 'hwq' + (h[i] ? ' ok' : '');
      let txt = (i + 1) + '. ' + (q.p ? q.p + ' ' : '');
      box.innerHTML = '<span class="hwqtext">' + txt + (q.m ? '<bdi dir="ltr">' + M(q.m) + '</bdi>' : '') + '</span>';
      const row = document.createElement('div');
      row.className = 'hwrow';
      const input = document.createElement('input');
      input.className = 'hwinput';
      input.placeholder = 'התשובה שלכם';
      input.setAttribute('inputmode', 'text');
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = 'בדיקה';
      if (h[i]) { input.disabled = true; btn.disabled = true; }
      row.appendChild(input);
      row.appendChild(btn);
      if (q.hint) {
        const det = document.createElement('details');
        det.className = 'hwhint';
        det.innerHTML = '<summary>רמז</summary><div>' + q.hint + '</div>';
        row.appendChild(det);
      }
      box.appendChild(row);
      const fb = document.createElement('div');
      fb.className = 'feedback';
      fb.setAttribute('aria-live', 'polite');
      box.appendChild(fb);

      function check() {
        if (matchQ(q, input.value)) {
          box.classList.add('ok');
          input.disabled = true; btn.disabled = true;
          fb.className = 'feedback show';
          fb.textContent = 'נכון מאוד! ✓';
          markOk(set.id, i);
          head.querySelector('span').textContent = setProgress(set) + ' ✓';
        } else {
          fb.className = 'feedback show';
          fb.textContent = 'לא בדיוק — נסו שוב. אפשר להציץ ברמז.';
        }
      }
      btn.onclick = check;
      input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
      body.appendChild(box);
    });
  }

  /* ---------- entry points ---------- */
  function addEntries() {
    const pc = document.querySelector('.pc-actions');
    if (pc && !document.getElementById('wsEntryBtn')) {
      const b = document.createElement('button');
      b.className = 'btn ghost';
      b.id = 'wsEntryBtn';
      b.textContent = '📄 דפי עבודה למבחן 25.10';
      b.onclick = openLibrary;
      const pcMock = document.getElementById('pcMock');
      pc.insertBefore(b, pcMock ? pcMock.nextSibling : null);
    }
    const slot = document.getElementById('examMockSlot');
    if (slot && !document.getElementById('wsExamBtn')) {
      const b2 = document.createElement('button');
      b2.className = 'btn ghost';
      b2.id = 'wsExamBtn';
      b2.textContent = '📄 דפי עבודה';
      b2.onclick = openLibrary;
      slot.appendChild(b2);
    }
  }

  addEntries();
  if (location.hash === '#worksheets') openLibrary();
  window.addEventListener('hashchange', () => { if (location.hash === '#worksheets') openLibrary(); });
})();
