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
    sim1q1: svg('<polygon points="30,25 190,25 190,105 30,105"/><line x1="140" y1="25" x2="140" y2="105"/>'
      + txt(22, 20, 'A', 'var(--ink)') + txt(140, 18, 'E', 'var(--ink)') + txt(198, 20, 'B', 'var(--ink)')
      + txt(22, 122, 'D', 'var(--ink)') + txt(140, 122, 'F', 'var(--ink)') + txt(198, 122, 'C', 'var(--ink)')),
    sim1q2: svg('<polygon points="110,15 25,110 195,110"/><line x1="195" y1="110" x2="56" y2="76"/><line x1="25" y1="110" x2="163" y2="74"/>'
      + '<circle cx="108" cy="89" r="2.5" style="fill:var(--ink)"/>'
      + txt(110, 12, 'A', 'var(--ink)') + txt(14, 118, 'C', 'var(--ink)') + txt(206, 118, 'B', 'var(--ink)')
      + txt(44, 70, 'D', 'var(--ink)') + txt(175, 68, 'E', 'var(--ink)') + txt(120, 92, 'O', 'var(--ink)')),
    sim1q3: svg('<polygon points="50,25 180,25 160,105 30,105"/><line x1="40" y1="65" x2="170" y2="65"/>'
      + txt(50, 18, 'A', 'var(--ink)') + txt(180, 18, 'B', 'var(--ink)') + txt(164, 122, 'C', 'var(--ink)') + txt(26, 122, 'D', 'var(--ink)')
      + txt(28, 62, 'E', 'var(--ink)') + txt(182, 62, 'F', 'var(--ink)')),
    sim2q1: svg('<polygon points="30,25 190,25 190,105 30,105"/><line x1="30" y1="60" x2="190" y2="60"/>'
      + txt(22, 20, 'A', 'var(--ink)') + txt(198, 20, 'B', 'var(--ink)') + txt(20, 68, 'E', 'var(--ink)') + txt(200, 68, 'F', 'var(--ink)')
      + txt(22, 122, 'D', 'var(--ink)') + txt(198, 122, 'C', 'var(--ink)')),
    sim2q2: svg('<polygon points="110,15 25,110 195,110"/><line x1="25" y1="110" x2="164" y2="76"/><line x1="195" y1="110" x2="57" y2="74"/>'
      + '<circle cx="112" cy="89" r="2.5" style="fill:var(--ink)"/>'
      + txt(110, 12, 'A', 'var(--ink)') + txt(14, 118, 'B', 'var(--ink)') + txt(206, 118, 'C', 'var(--ink)')
      + txt(176, 70, 'D', 'var(--ink)') + txt(45, 68, 'E', 'var(--ink)') + txt(100, 92, 'O', 'var(--ink)')),
    sim2q3: svg('<polygon points="110,15 30,110 190,110"/><line x1="75" y1="60" x2="145" y2="60"/>'
      + txt(110, 12, 'A', 'var(--ink)') + txt(20, 122, 'B', 'var(--ink)') + txt(200, 122, 'C', 'var(--ink)')
      + txt(63, 56, 'D', 'var(--ink)') + txt(157, 56, 'E', 'var(--ink)')),
    sim3q1: svg('<polygon points="30,20 85,20 85,75 30,75" style="fill:var(--teal2);stroke:none"/><polygon points="30,20 190,20 190,110 30,110"/><line x1="85" y1="20" x2="85" y2="75"/><line x1="30" y1="75" x2="85" y2="75"/>'
      + txt(22, 16, 'A', 'var(--ink)') + txt(85, 14, 'E', 'var(--ink)') + txt(198, 16, 'B', 'var(--ink)')
      + txt(20, 82, 'G', 'var(--ink)') + txt(97, 82, 'F', 'var(--ink)') + txt(198, 126, 'C', 'var(--ink)') + txt(22, 126, 'D', 'var(--ink)')),
    sim3q2: svg('<polygon points="110,15 30,110 190,110"/><line x1="110" y1="15" x2="110" y2="110" stroke-dasharray="5,4"/>'
      + '<polyline points="102,102 110,102 110,110" stroke-width="1.2" transform="translate(0,-8)"/>'
      + txt(110, 12, 'A', 'var(--ink)') + txt(20, 122, 'B', 'var(--ink)') + txt(200, 122, 'C', 'var(--ink)') + txt(122, 122, 'D', 'var(--ink)')),
    sim3q3: svg('<line x1="10" y1="30" x2="210" y2="30"/><polygon points="110,30 30,112 190,112"/>'
      + txt(14, 22, 'l', 'var(--ink)') + txt(110, 20, 'A', 'var(--ink)') + txt(20, 126, 'B', 'var(--ink)') + txt(200, 126, 'C', 'var(--ink)')
      + txt(55, 48, '5x-25°') + txt(168, 48, '4y-6°') + txt(48, 104, '3x+15°') + txt(172, 104, '2y+10°')),
    rt: function (a, b, c, mode) {
      return svg('<polygon points="40,105 180,105 40,25"/>'
        + '<polyline points="40,95 50,95 50,105" stroke-width="1.5"/>'
        + txt(110, 120, String(a), 'var(--ink)') + txt(25, 68, String(b), 'var(--ink)') + txt(128, 58, String(c)));
    },
  };

  /* ---------- answer matching (exact-value, unit-tolerant, multi-token) ---------- */
  function normTok(s) {
    return String(s ?? '').replace(/[−–—]/g, '-').replace(/\s+/g, '')
      .replace(/שורש/g, '√').replace(/sqrt\(?/g, '√').replace(/\)/g, '')
      .replace(/^x=/i, '').replace(/[.,](?=\d{3}\b)/g, '').toLowerCase();
  }
  function eqTok(a, b) {
    const A = normTok(a), B = normTok(b);
    if (A === B) return true;
    if (A.includes('√') || B.includes('√')) return false; /* radicals: exact form only */
    const ka = A.replace(/[^\d.,:+\-/]/g, ''), kb = B.replace(/[^\d.,:+\-/]/g, '');
    const X = (ka && /\d/.test(ka)) ? ka : A, Y = (kb && /\d/.test(kb)) ? kb : B;
    if (X === Y) return true;
    const x = Number(X.replace(',', '.')), y = Number(Y.replace(',', '.'));
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
        { p: 'במשולש ישר־זווית הניצבים 2 ס״מ ו־6 ס״מ. מצאו את היתר (התשובה אינה עגולה — אפשר שורש מדויק או קירוב).', a: ['√40', '2√10', '6.32', '6.324'], hint: 'c²=2²+6²=4+36=40, כלומר c=√40=2√10≈6.32.' },
        { p: 'במשולש ישר־זווית הניצבים 9 ס״מ ו־12 ס״מ. מצאו את היתר.', a: ['15', '15 ס״מ'], hint: 'c²=81+144=225.' },
        { p: 'במשולש ישר־זווית הניצבים 8 ס״מ ו־15 ס״מ. מצאו את היתר.', a: ['17', '17 ס״מ'], hint: 'c²=64+225=289.' },
        { p: 'סולם באורך 13 מ׳ נשען על קיר. בסיס הסולם 5 מ׳ מהקיר. באיזה גובה הסולם נוגע בקיר?', fig: FIG.rt(5, 'x', 13, 'a'), a: ['12', '12 מ׳'], unit: ['מ׳'], hint: 'x²=13²-5²=169-25=144.' },
        { p: 'אתגר — בדקו: משולש עם צלעות 12 ס״מ ו־16 ס״מ. אם הוא ישר־זווית, מה אורך היתר?', a: ['20', '20 ס״מ'], hint: 'c²=144+256=400.' },
      ] },
    { id: 'sim1', title: 'סימולציה נוספת 1 — מבחן מלא (45 דק׳)', topic: 'סימולציה',
      desc: '5 שאלות × 20 נק׳ בסגנון הסימולציה הכיתתית: יחס ושטחים, פיתגורס ומשולש, מקבילים וזוויות, בעיה מילולית, משוואה.',
      qs: [
        { p: 'שאלה 1 — שטח המלבן ABCD הוא 75 סמ״ר. הקטע EF מחלק את המלבן ABCD לריבוע BCFE ולמלבן AEFD (ראו ציור). נתון שהיחס בין שטח הריבוע BCFE לשטח המלבן AEFD הוא 1:2. א. חשבו את שטח הריבוע.', fig: 'sim1q1', a: ['25', '25 סמ״ר'], hint: 'היחס 1:2 מחלק את השטח הכולל ל־3 חלקים שווים.' },
        { p: '1ב. חשבו את אורך BC.', a: ['5', '5 ס״מ'], unit: ['ס״מ'], hint: 'ריבוע ששטחו 25 סמ״ר — כמה צלעו?' },
        { p: '1ג. רשמו את היחס בין היקף המלבן ABCD לבין היקף הריבוע BCFE.', a: ['2:1'], hint: 'שטח AEFD הוא 50, לכן AE=10 ו־AB=15; היקפים: 40 מול 20.' },
        { p: '1ד. במלבן AEFD מעבירים את האלכסון DE. חשבו את היחס בין שטח המשולש DFE לשטח המלבן ABCD.', a: ['1:3'], hint: 'DF=10, FE=5; שטח המשולש (10×5)÷2=25 מתוך 75.' },
        { p: 'שאלה 2 — הקטע BD הוא גובה ליתר AC במשולש ABC ששטחו 600 סמ״ר. CE הוא חוצה הזווית C; CE ו־BD נפגשים בנקודה O. נתון: DC=18 ס״מ, BC=30 ס״מ. א. חשבו את אורך AB.', fig: 'sim1q2', a: ['40', '40 ס״מ'], hint: 'במשולש BDC הישר־הזווית: BD²=30²-18²=576, ואז במשולש ADB.' },
        { p: '2ב. חשבו את אורך AD.', a: ['32', '32 ס״מ'], unit: ['ס״מ'], hint: 'שטח 600=(AC×24)÷2 נותן AC=50; AD=AC-DC.' },
        { p: '2ג. נתון ∠ECB=20°. מצאו את זווית ∠AEC.', a: ['110', '110°'], hint: '∠AEC חיצונית למשולש BCE: שווה לסכום ∠EBC+∠ECB (וחוצה הזווית נותן ∠ACB=40°).' },
        { p: 'שאלה 3 — נתון AD∥BC, AB∥DC∥EF; ∠AEF=4x+4°, ∠EFC=3y°, ∠ADC=2x+44°. א. מצאו את x ואת y.', fig: 'sim1q3', multi: ['20', '28'], hint: '∠AEF ו∠ADC מתאימות (EF∥DC) ← 4x+4=2x+44. ואז ∠DCB חד־צדדית ל∠ADC. (כתבו x ו־y)' },
        { p: '3ב. מצאו את ∠BFE ואת ∠DEF.', a: ['96', '96°'], hint: 'שתיהן 96°: סמוכות על ישר / חד־צדדיות ל־84°. (כתבו 96)' },
        { p: '3ג. מצאו את ∠CBA ואת ∠EAB.', multi: ['84', '96'], hint: '∠CBA חד־צדדית ל∠DCB (AB∥DC); ∠EAB חד־צדדית ל∠ADC. (כתבו שני הערכים)' },
        { p: 'שאלה 4 — בספרייה היו 27 ספרים בעברית יותר מספרים באנגלית. לאחר שהושאלו 9 ספרים באנגלית (ולא הושאלו ספרים בעברית), נותרו בספרייה פי 4 ספרים בעברית מאשר באנגלית. כמה ספרים מכל שפה היו בספרייה בתחילה?', multi: ['48', '21'], hint: 'e = אנגלית בהתחלה: e+27=4(e-9). (כתבו עברית ואנגלית)' },
        { p: 'שאלה 5 — פתרו את המשוואה:', m: '4(3x-5) = 7x - (10 - 3x)', a: ['5', 'x=5'], hint: '12x-20=7x-10+3x — שימו לב למינוס לפני הסוגריים.' },
      ] },
    { id: 'sim2', title: "סימולציה נוספת 2 — מבחן מלא (45 דק׳)", topic: 'סימולציה',
      desc: '5 שאלות × 20 נק׳ בסגנון הסימולציה הכיתתית, עם צורות ומספרים חדשים.',
      qs: [
        { p: 'שאלה 1 — שטח המלבן ABCD הוא 48 סמ״ר. הקטע EF מחלק את המלבן ABCD למלבן ABFE ולריבוע EFCD (ראו ציור). נתון שהיחס בין שטח המלבן ABFE לשטח הריבוע EFCD הוא 1:3. א. חשבו את שטח הריבוע.', fig: 'sim2q1', a: ['36', '36 סמ״ר'], hint: 'היחס 1:3 מחלק את השטח ל־4 חלקים; הריבוע הוא 3 חלקים.' },
        { p: '1ב. חשבו את אורך DC.', a: ['6', '6 ס״מ'], unit: ['ס״מ'], hint: 'ריבוע ששטחו 36 סמ״ר — כמה צלעו?' },
        { p: '1ג. רשמו את היחס בין היקף המלבן ABCD לבין היקף הריבוע EFCD.', a: ['7:6'], hint: 'שטח ABFE הוא 12, לכן AE=2 ו־AD=8; היקפים: 28 מול 24.' },
        { p: '1ד. במלבן ABFE מעבירים את האלכסון AF. חשבו את היחס בין שטח המשולש AEF לשטח המלבן ABCD.', a: ['1:8'], hint: 'AE=2, EF=6; שטח המשולש (2×6)÷2=6 מתוך 48.' },
        { p: 'שאלה 2 — הקטע BD הוא גובה ליתר AC במשולש ABC ששטחו 150 סמ״ר. CE הוא חוצה הזווית C; CE ו־BD נפגשים בנקודה O. נתון: DC=16 ס״מ, BC=20 ס״מ. א. חשבו את אורך AB.', fig: 'sim2q2', a: ['15', '15 ס״מ'], hint: 'במשולש BDC: BD²=20²-16²=144, ואז במשולש ADB.' },
        { p: '2ב. חשבו את אורך AD.', a: ['9', '9 ס״מ'], unit: ['ס״מ'], hint: 'שטח 150=(AC×12)÷2 נותן AC=25; AD=AC-DC.' },
        { p: '2ג. נתון ∠ECB=15°. מצאו את זווית ∠AEC.', a: ['105', '105°'], hint: '∠AEC חיצונית למשולש BCE (וחוצה הזווית נותן ∠ACB=30°).' },
        { p: 'שאלה 3 — במשולש ABC הנקודה D על הצלע AB והנקודה E על הצלע AC. נתון DE∥BC; ∠ADE=5x-20°, ∠ABC=3x+20°, ∠AED=2y°, ∠ACB=(y+30)°. א. מצאו את x ואת y.', fig: 'sim2q3', multi: ['20', '30'], hint: '∠ADE ו∠ABC מתאימות (DE∥BC); גם ∠AED ו∠ACB. (כתבו x ו־y)' },
        { p: '3ב. מצאו את ∠DEC ואת ∠BDE.', multi: ['120', '100'], hint: 'סמוכות על ישר: 180-60 ו־180-80. (כתבו שני הערכים)' },
        { p: '3ג. מצאו את גודלה של זווית ∠BAC.', a: ['40', '40°'], hint: 'סכום זוויות במשולש ABC.' },
        { p: 'שאלה 4 — בחנות החיות היו 19 חתולים יותר מכלבים. לאחר שאומצו 7 כלבים (ולא אומץ אף חתול), נותרו בחנות פי 3 חתולים מאשר כלבים. כמה חתולים וכמה כלבים היו בחנות בתחילה?', multi: ['39', '20'], hint: 'd = כלבים בהתחלה: d+19=3(d-7). (כתבו חתולים וכלבים)' },
        { p: 'שאלה 5 — פתרו את המשוואה:', m: '5(2x-3) = 9x - (21 - 4x)', a: ['2', 'x=2'], hint: '10x-15=9x-21+4x — שימו לב למינוס לפני הסוגריים.' },
      ] },
    { id: 'sim3', title: "סימולציה נוספת 3 — מבחן מלא (45 דק׳)", topic: 'סימולציה',
      desc: '5 שאלות × 20 נק׳: ריבוע בפינת מלבן, משולש שווה־שוקיים ופיתגורס, מקביל דרך קודקוד, בעיית גילאים, משוואה.',
      qs: [
        { p: 'שאלה 1 — בגינה מלבנית ABCD מקצים בפינה A חלקה ריבועית AEFG לגידול פרחים (החלק המושחר בציור). נתון: AB=12 ס״מ, שטח כל הגינה 108 סמ״ר, והיחס בין שטח הריבוע לשטח שאר הגינה הוא 1:2. א. חשבו את שטח החלקה הריבועית.', fig: 'sim3q1', a: ['36', '36 סמ״ר'], hint: 'היחס 1:2 מחלק את השטח הכולל ל־3 חלקים שווים.' },
        { p: '1ב. חשבו את אורך צלע הריבוע.', a: ['6', '6 ס״מ'], unit: ['ס״מ'], hint: 'ריבוע ששטחו 36 סמ״ר — כמה צלעו?' },
        { p: '1ג. חשבו את AD, ורשמו את היחס בין היקף המלבן ABCD להיקף הריבוע AEFG.', multi: ['9', '7:4'], hint: 'AD=108÷12; היקפים: 42 מול 24. (כתבו את AD ואת היחס)' },
        { p: '1ד. מעבירים בריבוע את האלכסון AF. חשבו את היחס בין שטח המשולש AEF לשטח הגינה כולה.', a: ['1:6'], hint: 'האלכסון מחלק את הריבוע לשני משולשים שווי שטח: 18 מתוך 108.' },
        { p: 'שאלה 2 — במשולש ABC שווה־השוקיים (AB=AC) מעבירים את הגובה AD לבסיס BC. נתון: BC=24 ס״מ, AB=20 ס״מ. א. חשבו את אורך הגובה AD.', fig: 'sim3q2', a: ['16', '16 ס״מ'], hint: 'במשולש שווה־שוקיים הגובה לבסיס הוא גם תיכון: BD=12; ואז פיתגורס במשולש ADB.' },
        { p: '2ב. חשבו את שטח המשולש.', a: ['192', '192 סמ״ר'], hint: 'שטח = בסיס×גובה÷2.' },
        { p: '2ג. חשבו את היקף המשולש.', a: ['64', '64 ס״מ'], unit: ['ס״מ'], hint: 'סכום שלוש הצלעות.' },
        { p: '2ד. נתון ∠BAC=66°. מצאו את ∠BAD, את ∠ABC ואת ∠ACB.', multi: ['33', '57'], hint: 'הגובה לבסיס הוא גם חוצה זווית הראש; זוויות הבסיס שוות. (כתבו את ∠BAD ואת זווית בסיס)' },
        { p: 'שאלה 3 — במשולש ABC מעבירים דרך הקודקוד A את הישר l המקביל ל־BC (ראו ציור): ∠ABC=3x+15°, ∠ACB=2y+10°, והזוויות בין l לצלעות כמתואר. א. מצאו את x ואת y.', fig: 'sim3q3', multi: ['20', '8'], hint: 'זוויות מתחלפות בין מקבילים: 5x-25=3x+15 וגם 4y-6=2y+10. (כתבו x ו־y)' },
        { p: '3ב. מצאו את זוויות המשולש ABC.', multi: ['75', '26', '79'], hint: '∠ABC=75°, ∠ACB=26°, והשלישית משלימה ל־180°. (כתבו שלושתן)' },
        { p: '3ג. הסבירו בעזרת הציור מדוע סכום זוויות המשולש הוא 180°.', info: 'בנקודה A על הישר l שלוש זוויות המשלימות לזווית שטוחה: זווית שמאל (∠ABC=75°), זווית ימין (∠ACB=26°) ו־∠BAC — סכומן 180°, ולכן ∠ABC+∠ACB+∠BAC=180°.' },
        { p: 'שאלה 4 — אמא של נטע מבוגרת ממנה פי 3. לפני 6 שנים הייתה האמא מבוגרת מנטע פי 5. בת כמה נטע היום, ובת כמה אמה?', multi: ['12', '36'], hint: 'n = גיל נטע: 3n-6=5(n-6). (כתבו נטע ואמא)' },
        { p: 'שאלה 5 — פתרו את המשוואה:', m: '4(x-3) = 5x - (3x - 2)', a: ['7', 'x=7'], hint: '4x-12=5x-3x+2 — שימו לב למינוס לפני הסוגריים.' },
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
    panel.innerHTML = '<div class="tool-inner"><div class="tool-head"><h2 style="margin:0">דפי עבודה וסימולציות למבחן 25.10</h2>'
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
        + (q.fig ? '<div dir="ltr" style="margin:6px 0;max-width:260px">' + (FIG[q.fig] || q.fig) + '</div>' : '');
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
