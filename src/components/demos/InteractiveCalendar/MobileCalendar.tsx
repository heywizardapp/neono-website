import { useState } from "react";
import {
  C, f, STAFF, STATUS, INITIAL_APTS, HOURS,
  fmtTime, useInView, FaceAvatar,
  type Appointment, type ToastState,
} from "./shared";

// ─── Mobile Timeline ───
function MobileTimeline({
  apts, onSelect, onAction, staffFilter,
}: {
  apts: Appointment[];
  onSelect: (a: Appointment) => void;
  onAction: (a: Appointment, action: string) => void;
  staffFilter: number;
}) {
  const filtered = apts
    .filter(a => staffFilter === -1 || a.st === staffFilter)
    .sort((a, b) => (a.h * 60 + a.m) - (b.h * 60 + b.m));
  const now = 10.75;

  return (
    <div style={{ padding: "0 16px 16px" }}>
      {filtered.map((a, i) => {
        const s = STAFF[a.st];
        const sc = STATUS[a.status];
        const t = a.h + a.m / 60;
        const isPast = t + a.d < now;
        const isCurrent = t <= now && t + a.d > now;
        const prevEnd = i > 0 ? filtered[i - 1].h + filtered[i - 1].m / 60 + filtered[i - 1].d : 0;
        const showNow = i > 0 && prevEnd <= now && t > now;

        return (
          <div key={a.id}>
            {showNow && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent }} />
                <div style={{ flex: 1, height: 2, background: C.accent, opacity: 0.4 }} />
                <span style={{ fontFamily: f.mono, fontSize: 10, color: C.accent, fontWeight: 600 }}>NOW</span>
              </div>
            )}
            <div onClick={() => onSelect(a)} style={{
              padding: 16, marginBottom: 10, borderRadius: 14,
              background: isCurrent ? s.color + "08" : "#fff",
              border: isCurrent ? `2px solid ${s.color}30` : "1px solid rgba(0,0,0,.06)",
              opacity: isPast ? 0.5 : 1,
              cursor: "pointer", WebkitTapHighlightColor: "transparent",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: f.mono, fontSize: 13, fontWeight: 600, color: isCurrent ? s.color : C.ink }}>{fmtTime(a.h, a.m)}</span>
                  <span style={{ fontFamily: f.mono, fontSize: 11, color: C.textMuted }}>&middot; {a.d}h</span>
                  {isCurrent && <span style={{ fontFamily: f.mono, fontSize: 9, fontWeight: 600, color: C.accent, background: `${C.accent}12`, padding: "2px 8px", borderRadius: 4 }}>NOW</span>}
                </div>
                <span style={{ fontFamily: f.mono, fontSize: 10, fontWeight: 600, color: sc.color, background: sc.color + "15", padding: "3px 10px", borderRadius: 5, textTransform: "uppercase" }}>{sc.label}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                <FaceAvatar seed={a.cl} size={44} gender={a.g} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: f.body, fontSize: 16, fontWeight: 700, color: C.ink }}>{a.cl}</div>
                  <div style={{ fontFamily: f.body, fontSize: 13, color: C.text }}>{a.sv}</div>
                </div>
                <span style={{ fontFamily: f.mono, fontSize: 15, fontWeight: 600, color: C.ink }}>${a.p}</span>
              </div>

              {staffFilter === -1 && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <FaceAvatar seed={s.name} size={22} gender={s.gender} />
                  <span style={{ fontFamily: f.body, fontSize: 12, color: C.text }}>{s.name}</span>
                  <span style={{ fontFamily: f.body, fontSize: 11, color: C.textMuted }}>&middot; {s.role}</span>
                </div>
              )}

              {a.notes && <div style={{ fontFamily: f.body, fontSize: 12, color: C.textMuted, fontStyle: "italic", marginBottom: 10 }}>{a.notes}</div>}

              {!isPast && (
                <div style={{ display: "flex", gap: 8 }}>
                  {a.status === "confirmed" && (
                    <button onClick={e => { e.stopPropagation(); onAction(a, "checkin"); }} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", fontFamily: f.body, fontSize: 13, fontWeight: 600, background: s.color, color: "#fff", cursor: "pointer" }}>Check In</button>
                  )}
                  {a.status === "checked_in" && (
                    <button onClick={e => { e.stopPropagation(); onAction(a, "start"); }} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", fontFamily: f.body, fontSize: 13, fontWeight: 600, background: "#8B5CF6", color: "#fff", cursor: "pointer" }}>Start Service</button>
                  )}
                  {a.status === "in-progress" && a.cat === "Colour" && (
                    <button onClick={e => e.stopPropagation()} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", fontFamily: f.body, fontSize: 13, fontWeight: 600, background: "#8B5CF615", color: "#8B5CF6", cursor: "pointer" }}>Colour Studio</button>
                  )}
                  <button onClick={e => e.stopPropagation()} style={{ padding: "12px 18px", borderRadius: 10, border: "none", fontFamily: f.body, fontSize: 13, fontWeight: 500, background: C.bgSection, color: C.text, cursor: "pointer" }}>Reschedule</button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Mobile Bottom Sheet ───
function BottomSheet({
  apt, onClose, onAction,
}: {
  apt: Appointment; onClose: () => void;
  onAction: (a: Appointment, action: string) => void;
}) {
  const s = STAFF[apt.st];
  const sc = STATUS[apt.status];

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,.4)", backdropFilter: "blur(4px)",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      animation: "calMfi .2s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: "20px 20px 0 0",
        maxHeight: "85vh", overflow: "auto",
        animation: "calMsu .3s cubic-bezier(.22,1,.36,1)",
        paddingBottom: "env(safe-area-inset-bottom, 20px)",
      }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 8px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "#E5E7EB" }} />
        </div>
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
            <FaceAvatar seed={apt.cl} size={56} gender={apt.g} />
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: f.body, fontWeight: 700, fontSize: 20, color: C.ink, margin: 0 }}>{apt.cl}</h3>
              <p style={{ fontFamily: f.body, fontSize: 15, color: C.text, margin: "4px 0 0" }}>{apt.sv}</p>
            </div>
            <span style={{ fontFamily: f.mono, fontSize: 11, fontWeight: 600, color: sc.color, background: sc.color + "15", padding: "5px 12px", borderRadius: 6, textTransform: "uppercase" }}>{sc.label}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: C.bg, borderRadius: 12, marginBottom: 18 }}>
            <FaceAvatar seed={s.name} size={38} gender={s.gender} />
            <div>
              <div style={{ fontFamily: f.body, fontSize: 15, fontWeight: 600, color: C.ink }}>{s.name}</div>
              <div style={{ fontFamily: f.body, fontSize: 12, color: C.textMuted }}>{s.role}</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 18 }}>
            {[{ l: "Time", v: fmtTime(apt.h, apt.m) }, { l: "Duration", v: `${apt.d}h` }, { l: "Price", v: `$${apt.p}` }].map(d => (
              <div key={d.l}>
                <div style={{ fontFamily: f.mono, fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em" }}>{d.l}</div>
                <div style={{ fontFamily: f.body, fontSize: 18, fontWeight: 700, color: C.ink, marginTop: 3 }}>{d.v}</div>
              </div>
            ))}
          </div>

          {apt.notes && (
            <div style={{ background: C.bg, borderRadius: 12, padding: "14px 16px", marginBottom: 18 }}>
              <div style={{ fontFamily: f.mono, fontSize: 9, color: C.textMuted, textTransform: "uppercase", marginBottom: 4 }}>Notes</div>
              <div style={{ fontFamily: f.body, fontSize: 14, color: C.text, lineHeight: 1.5 }}>{apt.notes}</div>
            </div>
          )}

          <button onClick={() => { onAction(apt, "checkin"); onClose(); }} style={{ width: "100%", padding: "16px 0", borderRadius: 14, border: "none", fontFamily: f.body, fontSize: 16, fontWeight: 700, background: s.color, color: "#fff", cursor: "pointer", marginBottom: 10 }}>Check In</button>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "14px 0", borderRadius: 14, border: "none", fontFamily: f.body, fontSize: 14, fontWeight: 600, background: C.bgSection, color: C.text, cursor: "pointer" }}>Reschedule</button>
            <button onClick={onClose} style={{ flex: 1, padding: "14px 0", borderRadius: 14, border: "none", fontFamily: f.body, fontSize: 14, fontWeight: 600, background: "#8B5CF615", color: "#8B5CF6", cursor: "pointer" }}>Colour Studio</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN MOBILE CALENDAR ───
export default function MobileCalendar() {
  const [sRef, inView] = useInView();
  const [apts, setApts] = useState(INITIAL_APTS);
  const [sel, setSel] = useState<Appointment | null>(null);
  const [staffFilter, setStaffFilter] = useState(-1);
  const [tab, setTab] = useState("Timeline");
  const [toast, setToast] = useState<ToastState>({ msg: "", show: false, type: "success" });

  const showToast = (msg: string, type: ToastState["type"] = "success") => {
    setToast({ msg, type, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2500);
  };

  const handleAction = (apt: Appointment, action: string) => {
    if (action === "checkin") {
      setApts(prev => prev.map(x => x.id === apt.id ? { ...x, status: "checked_in" } : x));
      showToast(`${apt.cl} checked in \u2713`);
    } else if (action === "start") {
      setApts(prev => prev.map(x => x.id === apt.id ? { ...x, status: "in-progress" } : x));
      showToast(`${apt.cl} started`, "info");
    }
  };

  const totalRev = apts.reduce((s, a) => s + a.p, 0);

  return (
    <div ref={sRef as React.RefObject<HTMLDivElement>}>
      <style>{`
        @keyframes calMfi { from{opacity:0} to{opacity:1} }
        @keyframes calMsu { from{transform:translateY(100%)} to{transform:translateY(0)} }
      `}</style>

      {/* Fixed toast */}
      <div style={{
        position: "fixed", top: 12, left: 12, right: 12, zIndex: 300,
        padding: "10px 14px", borderRadius: 10,
        background: toast.type === "success" ? C.mint : "#3B82F6",
        color: "#fff", fontFamily: f.body, fontSize: 12, fontWeight: 600,
        boxShadow: "0 8px 24px rgba(0,0,0,.15)",
        opacity: toast.show ? 1 : 0, transform: toast.show ? "translateY(0)" : "translateY(-20px)",
        transition: "all .3s cubic-bezier(.22,1,.36,1)",
        pointerEvents: "none", display: "flex", alignItems: "center", gap: 6,
      }}>
        <span>&#10003;</span>{toast.msg}
      </div>

      {/* Compact header with inline stats */}
      <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6, opacity: inView ? 1 : 0, transition: "opacity .6s ease" }}>
        <span style={{ fontFamily: f.body, fontSize: 13, fontWeight: 700, color: C.ink }}>Today's Schedule</span>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ fontFamily: f.mono, fontSize: 9, color: C.accent, background: `${C.accent}10`, padding: "2px 8px", borderRadius: 6 }}>{apts.length} bookings</span>
          <span style={{ fontFamily: f.mono, fontSize: 9, color: C.mint, background: `${C.mint}10`, padding: "2px 8px", borderRadius: 6 }}>${totalRev.toLocaleString()}</span>
        </div>
      </div>

      {/* Main card */}
      <div style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,.06)" }}>
        {/* Staff filter pills */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,.05)", display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <button onClick={() => setStaffFilter(-1)} style={{
            padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", flexShrink: 0,
            background: staffFilter === -1 ? C.ink : "rgba(0,0,0,.04)",
            color: staffFilter === -1 ? "#fff" : C.text,
            fontFamily: f.body, fontSize: 13, fontWeight: 600,
          }}>All</button>
          {STAFF.map((s, i) => (
            <button key={i} onClick={() => setStaffFilter(i)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px 6px 6px", borderRadius: 20,
              border: staffFilter === i ? `1.5px solid ${s.color}40` : "1.5px solid transparent",
              cursor: "pointer", flexShrink: 0,
              background: staffFilter === i ? s.color + "12" : "rgba(0,0,0,.03)",
              color: staffFilter === i ? s.color : C.text,
              fontFamily: f.body, fontSize: 13, fontWeight: 600,
            }}>
              <FaceAvatar seed={s.name} size={26} gender={s.gender} />
              {s.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,.05)" }}>
          {["Timeline", "List", "Gaps"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, fontFamily: f.body, fontSize: 13,
              fontWeight: tab === t ? 600 : 400, border: "none",
              borderBottom: tab === t ? `2px solid ${C.ink}` : "2px solid transparent",
              padding: "12px 0", background: "transparent", cursor: "pointer",
              color: tab === t ? C.ink : C.textMuted,
            }}>{t}</button>
          ))}
        </div>

        {/* Content */}
        {tab === "Timeline" && <MobileTimeline apts={apts} onSelect={setSel} onAction={handleAction} staffFilter={staffFilter} />}

        {tab === "List" && (
          <div>
            {apts
              .filter(a => staffFilter === -1 || a.st === staffFilter)
              .sort((a, b) => (a.h * 60 + a.m) - (b.h * 60 + b.m))
              .map(a => {
                const s = STAFF[a.st];
                const sc = STATUS[a.status];
                return (
                  <div key={a.id} onClick={() => setSel(a)} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,.04)", cursor: "pointer",
                  }}>
                    <FaceAvatar seed={a.cl} size={36} gender={a.g} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: f.body, fontSize: 14, fontWeight: 600, color: C.ink }}>{a.cl}</div>
                      <div style={{ fontFamily: f.body, fontSize: 12, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.sv}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: f.mono, fontSize: 11, color: C.ink, fontWeight: 600 }}>{fmtTime(a.h, a.m)}</div>
                      <span style={{ fontFamily: f.mono, fontSize: 9, fontWeight: 600, color: sc.color, background: sc.color + "15", padding: "2px 7px", borderRadius: 4, textTransform: "uppercase" }}>{sc.label}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {tab === "Gaps" && (
          <div style={{ padding: "12px 16px" }}>
            <div style={{ fontFamily: f.body, fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 12 }}>&#9889; Schedule Gaps</div>
            {[
              { si: 0, t: "11:30 AM \u2013 12:00 PM", d: "30m", p: true },
              { si: 1, t: "2:00 \u2013 3:00 PM", d: "1hr", p: true },
              { si: 3, t: "9:00 \u2013 10:00 AM", d: "1hr", p: true },
              { si: 2, t: "2:00 \u2013 2:30 PM", d: "30m", p: false },
            ].map((g, i) => {
              const s = STAFF[g.si];
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 16px", marginBottom: 8, borderRadius: 12,
                  background: g.p ? `${C.mint}08` : "#F59E0B08",
                  borderLeft: `3px solid ${g.p ? C.mint : "#F59E0B"}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <FaceAvatar seed={s.name} size={32} gender={s.gender} />
                    <div>
                      <div style={{ fontFamily: f.body, fontSize: 14, fontWeight: 600, color: C.ink }}>{s.name}</div>
                      <div style={{ fontFamily: f.mono, fontSize: 12, color: C.text }}>{g.t}</div>
                    </div>
                  </div>
                  <button style={{
                    fontFamily: f.body, fontSize: 12, fontWeight: 600, border: "none",
                    background: g.p ? C.mint : "#F59E0B", color: "#fff",
                    borderRadius: 8, padding: "8px 16px", cursor: "pointer",
                  }}>+ Fill</button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {sel && <BottomSheet apt={sel} onClose={() => setSel(null)} onAction={handleAction} />}
    </div>
  );
}
