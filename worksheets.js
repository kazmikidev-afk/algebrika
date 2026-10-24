/* אלגבריקה — ספריית דפי עבודה וסימולציות למבחן 25.10 (תוכן קבוע מדפי העבודה שהוכנו) */
(() => {
  'use strict';

  /* ---------- figures: faithful static SVGs of the worksheet diagrams ---------- */
  function svg(inner) {
    return '<svg viewBox="0 0 220 130" style="width:100%;height:auto;stroke:var(--ink);fill:none" stroke-width="2" font-size="13" font-family="inherit">' + inner + '</svg>';
  }
  function txt(x, y, s, fill) {
    return '<text x="' + x + '" y="' + y + '" style="fill:' + (fill || 'var(--teal)') + ';stroke:none" text-anchor="middle" font-weight="700">' + s + '</text>';
  }
  const FIG = {
    adj70: svg('<line x1="20" y1="95" x2="200" y2="95"/><line x1="115" y1="95" x2="150" y2="30"/>' + txt(160, 88, '70°') + txt(70, 88, 'x')),
    x55: svg('<line x1="35" y1="115" x2="185" y2="15"/><line x1="35" y1="15" x2="185" y2="115"/>' + txt(112, 40, '55°') + txt(112, 100, 'x')),
    split3: svg('<line x1="20" y1="100" x2="200" y2="100"/><line x1="110" y1="100" x2="70" y2="40"/><line x1="110" y1="100" x2="150" y2="40"/>' + txt(75, 88, '40°') + txt(145, 88, '75°') + txt(110, 55, 'x')),
    grid: svg('<line x1="15" y1="45" x2="205" y2="45"/><line x1="15" y1="90" x2="205" y2="90"/><line x1="75" y1="12" x2="140" y2="118"/>'
      + txt(80, 38, '1', 'var(--ink)') + txt(118, 38, '2', 'var(--ink)') + txt(84, 66, '3', 'var(--ink)') + txt(122, 66, '4', 'var(--ink)')
      + txt(100, 83, '5', 'var(--ink)') + txt(138, 83, '6', 'var(--ink)') + txt(104, 111, '7', 'var(--ink)') + txt(142, 111, '8', 'var(--ink)')),
    alt: svg('<line x1="15" y1="40" x2="205" y2="40"/><line x1="15" y1="95" x2="205" y2="95"/><line x1="80" y1="118" x2="150" y2="12"/>'
      + txt(105, 62, '2x+10') + txt(150, 113, '50°')),
    tri146: svg('<polygon points="30,100 190,100 85,25"/><line x1="85" y1="25" x2="85" y2="100" stroke-dasharray="5,4"/>' + txt(110, 118, '14 ס״מ', 'var(--ink)') + txt(70, 65, '6 ס״מ', 'var(--ink)')),
    bis74: svg('<polygon points="110,20 30,110 190,110"/><line x1="110" y1="20" x2="105" y2="110" stroke-dasharray="5,4"/>' + txt(110, 45, '74°') + txt(88, 60, 'x')),
    bis28: svg('<polygon points="110,20 30,110 190,110"/><line x1="110" y1="20" x2="105" y2="110" stroke-dasharray="5,4"/>' + txt(88, 45, '28°') + txt(110, 65, 'A=?')),
    rt: function (a, b, c, mode) {
      return svg('<polygon points="40,105 180,105 40,25"/>'
        + '<polyline points="40,95 50,95 50,105" stroke-width="1.5"/>'
        + txt(110, 120, String(a), 'var(--ink)') + txt(25, 68, String(b), 'var(--ink)') + txt(128, 58, String(c)));
    },
  };

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
    { id: 'ws5', title: 'דף עבודה 5 — זוויות וישרים מקבילים', topic: 'זוויות ומקבילים',
      desc: '8 שאלות מדף העבודה: זוויות צמודות, קודקודיות, מתאימות, מתחלפות וחד־צדדיות.',
      qs: [
        { p: 'בשרטוט, מצאו את x.', fig: FIG.adj70, a: ['110', '110°'], hint: 'זוויות צמודות על קו ישר משלימות ל־180°: x=180-70.' },
        { p: 'שני ישרים נחתכים. אחת הזוויות 55°. מה ערכה של x (הזווית הקודקודית)?', fig: FIG.x55, a: ['55', '55°'], hint: 'זוויות קודקודיות שוות זו לזו.' },
        { p: 'בשרטוט, קו ישר מחולק לזוויות 40°, 75° ו־x. מצאו את x.', fig: FIG.split3, a: ['65', '65°'], hint: 'סכום הזוויות על קו ישר: 40+75+x=180.' },
        { p: 'בשרטוט, שני ישרים מקבילים נחתכים בישר שלישי. זווית 1 שווה 120°. מצאו את זוויות 4, 5 ו־8.', fig: FIG.grid, multi: ['120'], a: ['120', '120°'], hint: '4 קודקודית ל־1, 5 מתאימה ל־1, 8 מתאימה ל־4 — כולן 120°. (כתבו 120)' },
        { p: 'באותו שרטוט, זווית 3 שווה 65°. מה גודלה של זווית 5?', fig: FIG.grid, a: ['115', '115°'], hint: '3 ו־5 חד־צדדיות (פנימיות באותו צד החותך): משלימות ל־180°.' },
        { p: 'באותו שרטוט, זווית 2 שווה 130°. מה גודלה של זווית 7?', fig: FIG.grid, a: ['130', '130°'], hint: '3 קודקודית ל־2 (130°), ו־7 מתאימה ל־3.' },
        { p: 'בשרטוט, שני ישרים מקבילים. הזוויות 2x+10 ו־50° מתחלפות. מצאו את x.', fig: FIG.alt, a: ['20', 'x=20'], hint: 'זוויות מתחלפות בין מקבילים שוות: 2x+10=50.' },
        { p: 'באותו שרטוט הממוספר, כתבו זוג אחד של זוויות מתאימות, זוג מתחלפות וזוג חד־צדדיות.', fig: FIG.grid, info: 'מתאימות: 1 ו־5 (גם 2 ו־6, 3 ו־7, 4 ו־8). מתחלפות: 4 ו־5 (גם 3 ו־6). חד־צדדיות: 3 ו־5 (גם 4 ו־6).' },
      ] },
    { id: 'ws6', title: 'דף עבודה 6 — משולש: גובה, חוצה זווית, שטח והיקף', topic: 'משולש',
      desc: '8 שאלות מדף העבודה: גובה, חוצה זווית, שטח והיקף של משולש.',
      qs: [
        { p: 'א) מהו גובה במשולש? ב) מהו חוצה זווית במשולש?', info: 'א) גובה במשולש הוא קטע המאונך מקודקוד לצלע שממולו (או להמשכה). ב) חוצה זווית במשולש הוא קטע המחלק זווית קודקוד לשתי זוויות שוות.' },
        { p: 'במשולש, בסיס 14 ס״מ וגובה 6 ס״מ. מצאו את שטח המשולש.', fig: FIG.tri146, a: ['42', '42 ס״מ'], unit: ['סמ״ר', 'ס״מ'], hint: 'שטח = בסיס×גובה÷2 = 14×6÷2.' },
        { p: 'במשולש, בסיס 9 ס״מ וגובה 8 ס״מ. מצאו את שטח המשולש.', a: ['36', '36 ס״מ'], hint: 'שטח = 9×8÷2.' },
        { p: 'שטח משולש 54 סמ״ר ובסיסו 12 ס״מ. מצאו את הגובה לבסיס.', a: ['9', '9 ס״מ'], hint: '54=12h÷2 — מבודדים את h.' },
        { p: 'צלעות משולש הן 7 ס״מ, 11 ס״מ ו־13 ס״מ. מה היקף המשולש?', a: ['31', '31 ס״מ'], unit: ['ס״מ'], hint: 'היקף = סכום שלוש הצלעות.' },
        { p: 'במשולש ABC, AD חוצה זווית A. זווית A שווה 74°. מצאו את זווית BAD.', fig: FIG.bis74, a: ['37', '37°'], hint: 'חוצה זווית מחלק את הזווית לשני חלקים שווים: 74÷2.' },
        { p: 'במשולש ABC, AD חוצה זווית A. זווית BAD שווה 28°. מצאו את זווית A.', fig: FIG.bis28, a: ['56', '56°'], hint: 'הזווית כולה כפולה מחציה: 28×2.' },
        { p: 'צלעות משולש הן 8 ס״מ, 10 ס״מ ו־12 ס״מ. חוצה זווית לצלע שאורכה 10 ס״מ מחלק אותה לשני קטעים. מצאו את אורכי הקטעים.', multi: ['4', '6'], hint: 'משפט חוצה הזווית: הקטעים ביחס הצלעות המשותפות 8:12. סה״כ 10 ס״מ. (כתבו שני האורכים)' },
      ] },
    { id: 'ws7', title: 'דף עבודה 7 — משפט פיתגורס', topic: 'פיתגורס',
      desc: '8 שאלות מדף העבודה: מציאת יתר וניצב במשולש ישר־זווית.',
      qs: [
        { p: 'במשולש ישר־זווית הניצבים 6 ס״מ ו־8 ס״מ. מצאו את היתר.', fig: FIG.rt(6, 8, 'x', 'c'), a: ['10', '10 ס״מ'], hint: 'c²=6²+8²=36+64=100.' },
        { p: 'במשולש ישר־זווית הניצבים 5 ס״מ ו־12 ס״מ. מצאו את היתר.', a: ['13', '13 ס״מ'], hint: 'c²=25+144=169.' },
        { p: 'במשולש ישר־זווית היתר 15 ס״מ וניצב אחד 9 ס״מ. מצאו את הניצב השני.', fig: FIG.rt('x', 9, 15, 'a'), a: ['12', '12 ס״מ'], hint: 'a²=15²-9²=225-81=144.' },
        { p: 'במשולש ישר־זווית הניצבים 2 ס״מ ו־6 ס״מ. מצאו את היתר (עיגול לשני מקומות אחרי הנקודה).', a: ['6.32'], hint: 'c²=2²+6²=4+36=40, כלומר c=√40≈6.32.' },
        { p: 'במשולש ישר־זווית הניצבים 9 ס״מ ו־12 ס״מ. מצאו את היתר.', a: ['15', '15 ס״מ'], hint: 'c²=81+144=225.' },
        { p: 'במשולש ישר־זווית הניצבים 8 ס״מ ו־15 ס״מ. מצאו את היתר.', a: ['17', '17 ס״מ'], hint: 'c²=64+225=289.' },
        { p: 'סולם באורך 13 מ׳ נשען על קיר. בסיס הסולם 5 מ׳ מהקיר. באיזה גובה הסולם נוגע בקיר?', fig: FIG.rt(5, 'x', 13, 'a'), a: ['12', '12 מ׳'], unit: ['מ׳'], hint: 'x²=13²-5²=169-25=144.' },
        { p: 'אתגר — בדקו: משולש עם צלעות 12 ס״מ ו־16 ס״מ. אם הוא ישר־זווית, מה אורך היתר?', a: ['20', '20 ס״מ'], hint: 'c²=144+256=400.' },
      ] },
  ];

  /* ---------- persistence: same algebrika-v3 state, existing state.hw subkey ---------- */
  function hwState(setId) {
    let hasState = false;
    try { hasState = typeof state !== 'undefined' && !!state; } catch (e) { hasState = false; }
    if (!hasState) return {};
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
    return n + ' נכונות מתוך ' + set.qs.length + ' ✓';
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
        + '<span style="color:var(--teal);font-weight:700">' + setProgress(set) + '</span>'
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
      + '<span style="color:var(--teal);font-weight:700">' + setProgress(set) + '</span>';
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
      box.innerHTML = '<span class="hwqtext">' + txt + (q.m ? '<bdi dir="ltr">' + M(q.m) + '</bdi>' : '') + '</span>'
        + (q.fig ? '<div dir="ltr" style="margin:6px 0;max-width:260px">' + q.fig + '</div>' : '');
      const row = document.createElement('div');
      row.className = 'hwrow';
      if (q.info) {
        const det = document.createElement('details');
        det.className = 'hwhint';
        det.innerHTML = '<summary>הצגת התשובה</summary><div>' + q.info + '</div>';
        box.appendChild(det);
        const doneB = document.createElement('button');
        doneB.className = 'btn ghost';
        doneB.style.marginTop = '6px';
        doneB.textContent = h[i] ? '✓ סומנה' : 'בדקתי — סמנו כנכון';
        if (h[i]) doneB.disabled = true;
        doneB.onclick = () => { markOk(set.id, i); doneB.disabled = true; doneB.textContent = '✓ סומנה'; box.classList.add('ok'); head.querySelector('span').textContent = setProgress(set); };
        box.appendChild(doneB);
        body.appendChild(box);
        return;
      }
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
          head.querySelector('span').textContent = setProgress(set);
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

  function start() {
    addEntries();
    if (location.hash === '#worksheets') openLibrary();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
  window.addEventListener('hashchange', () => { if (location.hash === '#worksheets') openLibrary(); });
})();
