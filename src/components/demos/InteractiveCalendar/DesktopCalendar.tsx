import { useState, useEffect, useRef } from "react";
import {
  C, f, STAFF, CATS, STATUS, INITIAL_APTS, HOURS, H,
  getCol, fmtTime, useInView,
  FaceAvatar, Toast, Legend,
  type Appointment, type ToastState,
} from "./shared";

// ─── Appointment Block (draggable, clickable) ───
function Block({
  a, show, onClick, colorMode, onDragStart, isDragging,
}: {
  a: Appointment; show: boolean; onClick: (a: Appointment) => void;
  colorMode: string; onDragStart: (id: number | null) => void; isDragging: number | null;
}) {
  const [hov, setHov] = useState(false);
  const col = getCol(a, colorMode);
  const top = (a.h - 8 + a.m / 60) * H;
  const ht = a.d * H - 2;
  const beingDragged = isDragging === a.id;

  return (
    <div
      onClick={() => { if (!beingDragged) onClick(a); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      draggable
      onDragStart={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetY = e.clientY - rect.top;
        e.dataTransfer.setData("text/plain", JSON.stringify({ id: a.id, offsetY }));
        e.dataTransfer.effectAllowed = "move";
        const ghost = e.currentTarget.cloneNode(true) as HTMLElement;
        ghost.style.opacity = "0.7";
        ghost.style.position = "absolute";
        ghost.style.top = "-1000px";
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, e.clientX - rect.left, offsetY);
        setTimeout(() => document.body.removeChild(ghost), 0);
        onDragStart(a.id);
      }}
      onDragEnd={() => onDragStart(null)}
      style={{
        position: "absolute", top, left: 2, right: 2, height: ht,
        background: beingDragged ? col + "08" : hov ? col + "28" : col + "14",
        borderLeft: `2px solid ${beingDragged ? col + "40" : col}`,
        borderRadius: 4, padding: "1px 4px", cursor: beingDragged ? "grabbing" : "grab",
        opacity: show ? (beingDragged ? 0.35 : 1) : 0,
        transform: show ? (hov && !beingDragged ? "scale(1.02)" : "scale(1)") : "scale(.88) translateY(4px)",
        transition: beingDragged ? "opacity .15s ease" : "all .4s cubic-bezier(.22,1,.36,1)",
        zIndex: hov ? 10 : 1,
        boxShadow: hov && !beingDragged ? `0 4px 12px ${col}20` : "none",
        overflow: "hidden",
        border: beingDragged ? `1px dashed ${col}60` : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <FaceAvatar seed={a.cl} size={9} gender={a.g} />
        <span style={{ fontFamily: f.body, fontSize: 7.5, fontWeight: 700, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{a.cl}</span>
      </div>
      <div style={{ fontFamily: f.body, fontSize: 7, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.sv}</div>
      {ht > 28 && (
        <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 0 }}>
          <span style={{ fontFamily: f.mono, fontSize: 6, color: C.textMuted }}>{STAFF[a.st].name.split(" ")[0]} &middot; {a.d}h</span>
        </div>
      )}
      {ht > 42 && (
        <div style={{ marginTop: 0, display: "flex", gap: 2, alignItems: "center" }}>
          <span style={{ fontFamily: f.mono, fontSize: 5.5, fontWeight: 600, color: STATUS[a.status].color, background: STATUS[a.status].color + "15", padding: "0px 3px", borderRadius: 2, textTransform: "uppercase" }}>
            {STATUS[a.status].label}
          </span>
          {colorMode === "Revenue" && <span style={{ fontFamily: f.mono, fontSize: 6, fontWeight: 600, color: col }}>${a.p}</span>}
        </div>
      )}
      {hov && !beingDragged && ht > 24 && (
        <div style={{ position: "absolute", bottom: 1, right: 3, fontFamily: f.mono, fontSize: 5.5, color: col, opacity: 0.6 }}>drag</div>
      )}
    </div>
  );
}

// ─── Smart Drop Column ───
function DropColumn({
  ci, apts, allApts, vis, onDrop, onSelect, colorMode, dragId, onDragStart,
}: {
  ci: number; apts: Appointment[]; allApts: Appointment[]; vis: number;
  onDrop: (aptId: number, staffIdx: number, h: number, m: number, conflict: Appointment | null) => void;
  onSelect: (a: Appointment) => void; colorMode: string;
  dragId: number | null; onDragStart: (id: number | null) => void;
}) {
  const colRef = useRef<HTMLDivElement>(null);
  const [ghostTime, setGhostTime] = useState<{ h: number; m: number } | null>(null);
  const [isOver, setIsOver] = useState(false);
  const draggedApt = dragId ? allApts.find(a => a.id === dragId) : null;

  const getConflict = (targetH: number, targetM: number): Appointment | null => {
    if (!draggedApt) return null;
    const targetStart = targetH + targetM / 60;
    const targetEnd = targetStart + draggedApt.d;
    for (const a of apts) {
      if (a.id === dragId) continue;
      const aStart = a.h + a.m / 60;
      const aEnd = aStart + a.d;
      if (targetStart < aEnd && targetEnd > aStart) return a;
    }
    return null;
  };

  const conflict = ghostTime ? getConflict(ghostTime.h, ghostTime.m) : null;

  const yToTime = (clientY: number) => {
    if (!colRef.current) return null;
    const rect = colRef.current.getBoundingClientRect();
    const relY = clientY - rect.top;
    const rawHours = relY / H + 8;
    const snappedQuarters = Math.round(rawHours * 4) / 4;
    const h = Math.floor(snappedQuarters);
    const m = Math.round((snappedQuarters - h) * 60);
    if (h < 8 || h >= 18) return null;
    return { h, m };
  };

  return (
    <div
      ref={colRef}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setGhostTime(yToTime(e.clientY));
        setIsOver(true);
      }}
      onDragLeave={() => { setGhostTime(null); setIsOver(false); }}
      onDrop={(e) => {
        e.preventDefault();
        const time = yToTime(e.clientY);
        setGhostTime(null);
        setIsOver(false);
        if (time && draggedApt) {
          onDrop(draggedApt.id, ci, time.h, time.m, conflict);
        }
      }}
      style={{
        position: "relative",
        borderRight: ci < STAFF.length - 1 ? "1px solid rgba(0,0,0,.04)" : "none",
        background: isOver && dragId ? `${C.accent}04` : "transparent",
        transition: "background .15s ease",
      }}
    >
      {HOURS.map((_, i) => (
        <div key={i} style={{ height: H, borderBottom: "1px solid rgba(0,0,0,.02)" }}>
          <div style={{ height: H / 2, borderBottom: "1px dashed rgba(0,0,0,.015)" }} />
        </div>
      ))}
      {/* Now indicator */}
      <div style={{ position: "absolute", top: (10.75 - 8) * H, left: 0, right: 0, height: 1.5, background: C.accent, zIndex: 5, opacity: 0.4 }}>
        <div style={{ position: "absolute", left: -2, top: -2, width: 5, height: 5, borderRadius: "50%", background: C.accent }} />
      </div>
      {/* Ghost preview */}
      {ghostTime && draggedApt && isOver && (
        <div style={{
          position: "absolute",
          top: (ghostTime.h - 8 + ghostTime.m / 60) * H,
          left: 2, right: 2,
          height: draggedApt.d * H - 2,
          background: conflict ? "#EF444420" : `${C.accent}12`,
          border: `1.5px dashed ${conflict ? "#EF4444" : C.accent}`,
          borderRadius: 4, zIndex: 20, pointerEvents: "none",
          transition: "top .1s ease",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
        }}>
          <span style={{ fontFamily: f.mono, fontSize: 7, fontWeight: 600, color: conflict ? "#EF4444" : C.accent }}>
            {fmtTime(ghostTime.h, ghostTime.m)}
          </span>
          {conflict && <span style={{ fontFamily: f.body, fontSize: 6, fontWeight: 600, color: "#EF4444" }}>&#9888; {conflict.cl.split(" ")[0]}</span>}
        </div>
      )}
      {apts.map(a => (
        <Block key={a.id} a={a} show={allApts.findIndex(x => x.id === a.id) < vis} onClick={onSelect} colorMode={colorMode} onDragStart={onDragStart} isDragging={dragId} />
      ))}
    </div>
  );
}

// ─── Detail Modal ───
function Modal({ a, onClose, onCheckIn }: { a: Appointment; onClose: () => void; onCheckIn: (a: Appointment) => void }) {
  const s = STAFF[a.st]; const sc = STATUS[a.status];
  const hist = [
    { date: "Feb 28", sv: a.sv, stylist: s.name },
    { date: "Jan 15", sv: "Gloss + Trim", stylist: s.name },
    { date: "Dec 4", sv: a.cat === "Colour" ? "Full Colour" : "Cut & Style", stylist: s.name },
  ];
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, zIndex: 100, background: "rgba(0,0,0,.3)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "calFi .2s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, width: 340, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.18)", animation: "calSu .3s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ height: 3, background: s.color }} />
        <div style={{ padding: "12px 16px" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
            <FaceAvatar seed={a.cl} size={36} gender={a.g} />
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: f.body, fontWeight: 700, fontSize: 13, color: C.ink, margin: 0 }}>{a.cl}</h3>
              <p style={{ fontFamily: f.body, fontSize: 10, color: C.text, margin: "1px 0 0" }}>{a.sv}</p>
            </div>
            <span style={{ fontFamily: f.mono, fontSize: 8, fontWeight: 600, color: sc.color, background: sc.color + "15", padding: "2px 6px", borderRadius: 4, textTransform: "uppercase" }}>{sc.label}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", background: C.bg, borderRadius: 6, marginBottom: 8 }}>
            <FaceAvatar seed={s.name} size={22} gender={s.gender} />
            <div>
              <div style={{ fontFamily: f.body, fontSize: 10, fontWeight: 600, color: C.ink }}>{s.name}</div>
              <div style={{ fontFamily: f.body, fontSize: 8, color: C.textMuted }}>{s.role}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
            {[{ l: "Time", v: fmtTime(a.h, a.m) }, { l: "Duration", v: `${a.d}h` }, { l: "Price", v: `$${a.p}` }].map(d => (
              <div key={d.l}>
                <div style={{ fontFamily: f.mono, fontSize: 6.5, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".05em" }}>{d.l}</div>
                <div style={{ fontFamily: f.body, fontSize: 12, fontWeight: 700, color: C.ink, marginTop: 1 }}>{d.v}</div>
              </div>
            ))}
          </div>
          {a.notes && (
            <div style={{ background: C.bg, borderRadius: 5, padding: "6px 8px", marginBottom: 8 }}>
              <div style={{ fontFamily: f.mono, fontSize: 6.5, color: C.textMuted, textTransform: "uppercase", marginBottom: 1 }}>Notes</div>
              <div style={{ fontFamily: f.body, fontSize: 9, color: C.text, lineHeight: 1.4 }}>{a.notes}</div>
            </div>
          )}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontFamily: f.mono, fontSize: 6.5, color: C.textMuted, textTransform: "uppercase", marginBottom: 4 }}>Recent Visits</div>
            {hist.map((v, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px 0", borderBottom: i < hist.length - 1 ? "1px solid rgba(0,0,0,.04)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontFamily: f.mono, fontSize: 8, color: C.textMuted, width: 40 }}>{v.date}</span>
                  <span style={{ fontFamily: f.body, fontSize: 9, color: C.ink }}>{v.sv}</span>
                </div>
                <span style={{ fontFamily: f.body, fontSize: 8, color: C.textMuted }}>{v.stylist.split(" ")[0]}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <button onClick={(e) => { e.stopPropagation(); onCheckIn(a); onClose(); }} style={{ flex: 1, padding: "7px 0", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: f.body, fontSize: 9, fontWeight: 600, background: s.color, color: "#fff" }}>Check In</button>
            <button style={{ flex: 1, padding: "7px 0", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: f.body, fontSize: 9, fontWeight: 600, background: C.bgSection, color: C.text }}>Reschedule</button>
            <button style={{ flex: 1, padding: "7px 0", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: f.body, fontSize: 9, fontWeight: 600, background: "#8B5CF615", color: "#8B5CF6" }}>Start Colour</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN DESKTOP CALENDAR (compact, for browser-chrome embed) ───
export default function DesktopCalendar() {
  const [sRef, inView] = useInView();
  const [tab, setTab] = useState("Calendar");
  const [view, setView] = useState("Multi-Staff");
  const [cm, setCm] = useState("Staff");
  const [vis, setVis] = useState(0);
  const [sel, setSel] = useState<Appointment | null>(null);
  const [toast, setToast] = useState<ToastState>({ msg: "", type: "success", show: false });
  const [apts, setApts] = useState(INITIAL_APTS);
  const [dragId, setDragId] = useState<number | null>(null);

  const showToast = (msg: string, type: ToastState["type"] = "success") => {
    setToast({ msg, type, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2800);
  };

  const animate = () => {
    setVis(0); setSel(null);
    let c = 0;
    const t = setInterval(() => { c++; setVis(c); if (c >= apts.length) clearInterval(t); }, 80);
  };
  useEffect(() => { if (inView) animate(); }, [inView]);

  const handleCheckIn = (a: Appointment) => {
    setApts(prev => prev.map(x => x.id === a.id ? { ...x, status: "checked_in" } : x));
    showToast(`${a.cl} checked in`, "success");
  };

  const handleSmartDrop = (aptId: number, newStaffIdx: number, newH: number, newM: number, conflict: Appointment | null) => {
    const apt = apts.find(a => a.id === aptId);
    if (!apt) return;
    const newStaff = STAFF[newStaffIdx].name.split(" ")[0];
    const sameStaff = apt.st === newStaffIdx;
    const sameTime = apt.h === newH && apt.m === newM;
    if (sameStaff && sameTime) { setDragId(null); return; }
    if (conflict) {
      const newEnd = newH + newM / 60 + apt.d;
      const pushH = Math.floor(newEnd);
      const pushM = Math.round((newEnd - pushH) * 60);
      setApts(prev => prev.map(x => {
        if (x.id === aptId) return { ...x, st: newStaffIdx, h: newH, m: newM };
        if (x.id === conflict.id) return { ...x, h: pushH, m: pushM };
        return x;
      }));
      showToast(`${apt.cl} \u2192 ${fmtTime(newH, newM)}${!sameStaff ? ` w/ ${newStaff}` : ""} \u00B7 ${conflict.cl.split(" ")[0]} bumped`, "warning");
    } else {
      setApts(prev => prev.map(x => x.id === aptId ? { ...x, st: newStaffIdx, h: newH, m: newM } : x));
      showToast(sameStaff ? `${apt.cl} \u2192 ${fmtTime(newH, newM)}` : `${apt.cl} \u2192 ${newStaff} ${fmtTime(newH, newM)}`, "info");
    }
    setDragId(null);
  };

  const totalRev = apts.reduce((s, a) => s + a.p, 0);
  const durationData = apts.map(a => ({ ...a, diff: a.d - a.bd, pct: Math.round(((a.d - a.bd) / a.bd) * 100) }));
  const avgOv = durationData.reduce((s, d) => s + d.diff, 0) / durationData.length;
  const worst = [...durationData].sort((a, b) => b.diff - a.diff).slice(0, 3);
  const byCat = Object.entries(
    durationData.reduce((acc, d) => { if (!acc[d.cat]) acc[d.cat] = { t: 0, c: 0 }; acc[d.cat].t += d.diff; acc[d.cat].c++; return acc; }, {} as Record<string, { t: number; c: number }>)
  ).map(([cat, v]) => ({ cat, avg: v.t / v.c })).sort((a, b) => b.avg - a.avg);

  return (
    <div ref={sRef as React.RefObject<HTMLDivElement>} style={{ position: "relative", fontFamily: f.body, fontSize: 9 }}>
      <style>{`
        @keyframes calFi { from{opacity:0} to{opacity:1} }
        @keyframes calSu { from{opacity:0;transform:translateY(12px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
      <Toast message={toast.msg} type={toast.type} visible={toast.show} />

      {/* Toolbar */}
      <div style={{ padding: "4px 8px", borderBottom: "1px solid rgba(0,0,0,.06)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 9, color: C.ink }}>Schedule Management</span>
          <span style={{ fontFamily: f.mono, fontSize: 7, color: C.accent, background: `${C.accent}10`, padding: "1px 5px", borderRadius: 3 }}>{apts.length}</span>
          <span style={{ fontFamily: f.mono, fontSize: 7, color: C.mint, background: `${C.mint}10`, padding: "1px 5px", borderRadius: 3 }}>${totalRev.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {["Waitlist", "Closed"].map(b => (
            <button key={b} style={{ fontSize: 7, fontWeight: 500, border: "1px solid rgba(0,0,0,.08)", borderRadius: 3, padding: "2px 6px", background: "#fff", color: C.text, cursor: "pointer" }}>{b}</button>
          ))}
          <button style={{ fontSize: 7, fontWeight: 700, border: "none", borderRadius: 3, padding: "2px 8px", background: C.accentDark, color: "#fff", cursor: "pointer" }}>+ Add</button>
        </div>
      </div>

      {/* Colour Mode + Legend */}
      <div style={{ padding: "3px 8px", borderBottom: "1px solid rgba(0,0,0,.04)", display: "flex", gap: 2, alignItems: "center" }}>
        <span style={{ fontSize: 7, color: C.textMuted, marginRight: 2 }}>Colour</span>
        {["Staff", "Service Category", "Status", "Revenue"].map(t => (
          <button key={t} onClick={() => setCm(t)} style={{
            fontSize: 7, fontWeight: 600, border: "none", cursor: "pointer", borderRadius: 2, padding: "1px 6px",
            background: cm === t ? C.accentDark : "rgba(0,0,0,.04)", color: cm === t ? "#fff" : C.text,
          }}>{t}</button>
        ))}
        <div style={{ marginLeft: "auto", transform: "scale(0.85)", transformOrigin: "right center" }}><Legend mode={cm} /></div>
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 8px", borderBottom: "1px solid rgba(0,0,0,.05)", display: "flex" }}>
        {["Calendar", "Listing", "Gaps", "Duration"].map(t => {
          const full: Record<string, string> = { Calendar: "Calendar", Listing: "Appointment Listing", Gaps: "Gap Analyzer", Duration: "Duration Intel" };
          return (
            <button key={t} onClick={() => { setTab(full[t]); if (t === "Calendar") animate(); }} style={{
              fontSize: 8, fontWeight: tab === full[t] ? 600 : 400, border: "none",
              borderBottom: tab === full[t] ? `1.5px solid ${C.ink}` : "1.5px solid transparent",
              padding: "4px 8px", background: "transparent", cursor: "pointer", color: tab === full[t] ? C.ink : C.textMuted,
            }}>{t === "Gaps" ? "\u26A1 " + t : t === "Duration" ? "\u23F1 " + t : t}</button>
          );
        })}
      </div>

      {/* ─── CALENDAR TAB ─── */}
      {tab === "Calendar" && <>
        <div style={{ padding: "3px 8px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,.03)" }}>
          <div style={{ display: "flex", gap: 2 }}>
            {["Day", "Week", "Month", "Multi-Staff"].map(v => (
              <button key={v} onClick={() => { setView(v); animate(); }} style={{
                fontSize: 7, fontWeight: 600, border: "none", cursor: "pointer", borderRadius: 2, padding: "2px 6px",
                background: view === v ? C.ink : "rgba(0,0,0,.03)", color: view === v ? "#fff" : C.text,
              }}>{v}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {STAFF.map((s, i) => <FaceAvatar key={i} seed={s.name} size={14} gender={s.gender} />)}
          </div>
        </div>

        {(view === "Multi-Staff" || view === "Day") && (
          <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: 360 }}>
            <div style={{ display: "grid", gridTemplateColumns: `28px repeat(${STAFF.length}, 1fr)`, minWidth: 420 }}>
              <div style={{ borderBottom: "1px solid rgba(0,0,0,.05)", borderRight: "1px solid rgba(0,0,0,.04)", padding: 2, textAlign: "center" }}>
                <span style={{ fontFamily: f.mono, fontSize: 5.5, color: C.textMuted }}>MAR 26</span>
              </div>
              {STAFF.map((s, i) => (
                <div key={i} style={{ padding: "3px 4px", borderBottom: "1px solid rgba(0,0,0,.05)", borderRight: i < STAFF.length - 1 ? "1px solid rgba(0,0,0,.04)" : "none", display: "flex", alignItems: "center", gap: 3 }}>
                  <FaceAvatar seed={s.name} size={18} gender={s.gender} />
                  <div>
                    <div style={{ fontSize: 8, fontWeight: 700, color: C.ink }}>{s.name}</div>
                    <div style={{ fontSize: 6, color: C.textMuted }}>{s.role}</div>
                  </div>
                </div>
              ))}
              <div style={{ borderRight: "1px solid rgba(0,0,0,.04)" }}>
                {HOURS.map(h => (
                  <div key={h} style={{ height: H, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 1 }}>
                    <span style={{ fontFamily: f.mono, fontSize: 6, color: C.textFaint }}>{h > 12 ? h - 12 : h}{h >= 12 ? "p" : "a"}</span>
                  </div>
                ))}
              </div>
              {STAFF.map((_, ci) => (
                <DropColumn key={ci} ci={ci} apts={apts.filter(a => a.st === ci)} allApts={apts} vis={vis} onDrop={handleSmartDrop} onSelect={setSel} colorMode={cm} dragId={dragId} onDragStart={setDragId} />
              ))}
            </div>
          </div>
        )}

        {view === "Week" && (
          <div style={{ padding: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4 }}>
              {["Mon 23", "Tue 24", "Wed 25", "Thu 26", "Fri 27", "Sat 28"].map((day, i) => {
                const isT = i === 3; const cts = [9, 11, 8, apts.length, 10, 15]; const rvs = [1420, 1890, 1100, totalRev, 1340, 2100];
                return (
                  <div key={day} style={{ background: isT ? `${C.accent}08` : C.bg, borderRadius: 6, padding: 6, border: isT ? `1.5px solid ${C.accent}` : "1px solid rgba(0,0,0,.04)" }}>
                    <div style={{ fontSize: 7, fontWeight: 700, color: isT ? C.accent : C.ink, marginBottom: 2 }}>{day}</div>
                    <div style={{ fontFamily: f.display, fontSize: 16, color: C.ink }}>{cts[i]}</div>
                    <div style={{ fontFamily: f.mono, fontSize: 6, color: C.textMuted }}>bookings</div>
                    <div style={{ marginTop: 3, paddingTop: 3, borderTop: "1px solid rgba(0,0,0,.04)" }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: C.mint }}>${rvs[i].toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "Month" && (
          <div style={{ padding: 8 }}>
            <div style={{ textAlign: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.ink }}>March 2026</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 1 }}>
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} style={{ textAlign: "center", padding: "2px 0", fontSize: 6, fontWeight: 600, color: C.textMuted }}>{d}</div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i + 1; const inM = day <= 31; const isT = day === 26;
                return (
                  <div key={i} style={{ padding: 1, minHeight: 24, borderRadius: 2, background: isT ? `${C.accent}08` : inM ? "#fff" : "transparent", border: isT ? `1.5px solid ${C.accent}` : "1px solid rgba(0,0,0,.02)", opacity: inM ? 1 : 0.15 }}>
                    <div style={{ fontSize: 7, fontWeight: isT ? 700 : 400, color: isT ? C.accent : C.ink }}>{inM ? day : ""}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>}

      {/* ─── LISTING TAB ─── */}
      {tab === "Appointment Listing" && (
        <div style={{ padding: "4px 6px 6px", maxHeight: 340, overflowY: "auto" }}>
          <div style={{ borderRadius: 4, border: "1px solid rgba(0,0,0,.05)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 8 }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {["Time", "Client", "Service", "Staff", "Status", "$"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "3px 5px", fontWeight: 600, color: C.text, fontSize: 7, borderBottom: "1px solid rgba(0,0,0,.05)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apts.map((a, i) => {
                  const s = STAFF[a.st]; const sc = STATUS[a.status];
                  return (
                    <tr key={a.id} onClick={() => setSel(a)} style={{ cursor: "pointer", background: i % 2 === 0 ? "#fff" : C.bg, opacity: i < vis ? 1 : 0, transition: `opacity .2s ease ${i * 0.02}s`, height: 28 }}>
                      <td style={{ padding: "2px 5px", fontFamily: f.mono, fontSize: 7 }}>{fmtTime(a.h, a.m)}</td>
                      <td style={{ padding: "2px 5px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <FaceAvatar seed={a.cl} size={14} gender={a.g} />
                          <span style={{ fontWeight: 600, color: C.ink, fontSize: 8 }}>{a.cl}</span>
                        </div>
                      </td>
                      <td style={{ padding: "2px 5px", color: C.text }}>{a.sv}</td>
                      <td style={{ padding: "2px 5px", fontSize: 7 }}>{s.name.split(" ")[0]}</td>
                      <td style={{ padding: "2px 5px" }}>
                        <span style={{ fontFamily: f.mono, fontSize: 6, fontWeight: 600, color: sc.color, background: sc.color + "15", padding: "1px 4px", borderRadius: 2, textTransform: "uppercase" }}>{sc.label}</span>
                      </td>
                      <td style={{ padding: "2px 5px", fontFamily: f.mono, fontWeight: 600, color: C.ink }}>${a.p}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── GAP ANALYZER TAB ─── */}
      {tab === "Gap Analyzer" && (
        <div style={{ padding: "6px 8px", maxHeight: 360, overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: C.ink }}>&#9889; Gaps</span>
            <span style={{ fontFamily: f.mono, fontSize: 7, color: C.textMuted }}>5h 30m</span>
            <span style={{ fontFamily: f.mono, fontSize: 7, color: C.mint }}>3 fillable</span>
          </div>
          {[
            { si: 0, t: "11:30\u201312:00", d: "30m", p: "high" },
            { si: 1, t: "2:00\u20133:00 PM", d: "1hr", p: "high" },
            { si: 3, t: "9:00\u201310:00 AM", d: "1hr", p: "high" },
            { si: 2, t: "2:00\u20132:30 PM", d: "30m", p: "opt" },
            { si: 1, t: "11:30\u201312:00", d: "30m", p: "opt" },
            { si: 0, t: "4:30\u20135:30 PM", d: "1hr", p: "opt" },
          ].map((g, i) => {
            const s = STAFF[g.si]; const high = g.p === "high";
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 8px", marginBottom: 2, borderRadius: 4, background: high ? `${C.mint}08` : "#F59E0B08", borderLeft: `2px solid ${high ? C.mint : "#F59E0B"}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <FaceAvatar seed={s.name} size={16} gender={s.gender} />
                  <div>
                    <div style={{ fontSize: 8, fontWeight: 600, color: C.ink }}>{s.name}</div>
                    <div style={{ fontFamily: f.mono, fontSize: 7, color: C.text }}>{g.t} ({g.d})</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ fontFamily: f.mono, fontSize: 6, fontWeight: 600, color: high ? C.mint : "#F59E0B", background: high ? `${C.mint}15` : "#F59E0B15", padding: "1px 4px", borderRadius: 2 }}>{high ? "High" : "Opt"}</span>
                  <button style={{ fontSize: 6, fontWeight: 600, border: "none", background: "rgba(0,0,0,.04)", borderRadius: 2, padding: "1px 5px", cursor: "pointer", color: C.text }}>+ Fill</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── DURATION INTEL TAB ─── */}
      {tab === "Duration Intel" && (
        <div style={{ padding: "6px 8px", maxHeight: 360, overflowY: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, marginBottom: 10 }}>
            {[
              { l: "Avg Overrun", v: `+${(avgOv * 60).toFixed(0)}m`, c: C.accent },
              { l: "On-Time", v: "58%", c: C.mint },
              { l: "At Risk", v: "$165", c: "#8B5CF6" },
            ].map(s => (
              <div key={s.l} style={{ background: s.c + "08", borderRadius: 6, padding: "6px 8px", border: `1px solid ${s.c}15` }}>
                <div style={{ fontFamily: f.mono, fontSize: 6, color: C.textMuted, textTransform: "uppercase" }}>{s.l}</div>
                <div style={{ fontFamily: f.display, fontSize: 18, color: s.c, marginTop: 1 }}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 9, fontWeight: 700, color: C.ink, marginBottom: 6 }}>By Category</div>
          {byCat.map((c) => (
            <div key={c.cat} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <div style={{ width: 55, fontSize: 8, fontWeight: 600, color: C.ink }}>{c.cat}</div>
              <div style={{ flex: 1, height: 10, background: C.bgSection, borderRadius: 2, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", left: c.avg >= 0 ? "50%" : undefined, right: c.avg < 0 ? "50%" : undefined, top: 0, bottom: 0, width: `${Math.min(Math.abs(c.avg) / 1 * 50, 48)}%`, background: c.avg > 0 ? (CATS[c.cat] || "#6B7280") + "40" : `${C.mint}40`, borderRadius: 2 }} />
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#D1D5DB" }} />
              </div>
              <div style={{ width: 35, textAlign: "right", fontFamily: f.mono, fontSize: 8, fontWeight: 600, color: c.avg > 0 ? C.accent : C.mint }}>{c.avg > 0 ? "+" : ""}{(c.avg * 60).toFixed(0)}m</div>
            </div>
          ))}
          <div style={{ fontSize: 9, fontWeight: 700, color: C.ink, marginTop: 8, marginBottom: 4 }}>Biggest Overruns</div>
          {worst.map((d) => (
            <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 6px", marginBottom: 2, borderRadius: 4, background: `${C.accent}08` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <FaceAvatar seed={d.cl} size={16} gender={d.g} />
                <div>
                  <div style={{ fontSize: 8, fontWeight: 600, color: C.ink }}>{d.cl}</div>
                  <div style={{ fontSize: 7, color: C.text }}>{d.sv}</div>
                </div>
              </div>
              <div style={{ fontFamily: f.mono, fontSize: 8, fontWeight: 700, color: C.accent }}>+{(d.diff * 60).toFixed(0)}m</div>
            </div>
          ))}
          <div style={{ marginTop: 6, padding: "6px 8px", borderRadius: 4, background: `linear-gradient(135deg, #8B5CF608, ${C.accent}08)`, border: "1px solid rgba(139,92,246,.1)" }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: "#8B5CF6", marginBottom: 2 }}>&#128161; NeonO Insight</div>
            <p style={{ fontSize: 8, color: C.text, lineHeight: 1.4, margin: 0 }}>
              <strong>Colour services</strong> average <strong>30 min over</strong> booked time. Adjusting defaults from 2h to 2.5h would recover ~<strong>$165/wk</strong>.
            </p>
          </div>
        </div>
      )}

      {sel && <Modal a={sel} onClose={() => setSel(null)} onCheckIn={handleCheckIn} />}
    </div>
  );
}
