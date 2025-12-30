import { useEffect, useState, useMemo, memo } from "react";

const DayDot = memo(
  ({
    dateStr,
    isPast,
    isToday,
    dayProgress,
    onHover,
  }: {
    dayNum: number;
    dateStr: string;
    isPast: boolean;
    isToday: boolean;
    dayProgress: number;
    onHover: (e: React.MouseEvent, date: string, today: boolean) => void;
  }) => {
    return (
      <div
        className="relative cursor-default"
        onMouseEnter={(e) => onHover(e, dateStr, isToday)}
        onMouseLeave={(e) => onHover(e, "", false)}
      >
        <div className="w-2.5 h-2.5 md:w-[1.8vh] md:h-[1.8vh] lg:w-[2.2vh] lg:h-[2.2vh] rounded-full bg-dot-empty overflow-hidden relative">
          {(isPast || isToday) && (
            <div
              className="absolute bottom-0 left-0 w-full bg-brand"
              style={{
                height: isPast ? "100%" : `${dayProgress * 100}%`,
              }}
            />
          )}
        </div>
      </div>
    );
  },
  (prev, next) => {
    if (next.isToday) return false;
    return prev.isPast === next.isPast && prev.isToday === next.isToday;
  }
);

function App() {
  const [now, setNow] = useState(new Date());
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    text: string;
    isToday: boolean;
  } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { year, totalDays, startOfYear, totalMs, days } = useMemo(() => {
    const year = now.getFullYear();
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const totalDays = isLeapYear ? 366 : 365;
    const startOfYearDate = new Date(year, 0, 1);
    const startOfYear = startOfYearDate.getTime();
    const endOfYear = new Date(year + 1, 0, 1).getTime();

    const days = Array.from({ length: totalDays }, (_, i) => {
      const dayNum = i + 1;
      const date = new Date(year, 0, dayNum);
      return {
        dayNum,
        dateStr: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      };
    });

    return {
      year,
      totalDays,
      startOfYear,
      totalMs: endOfYear - startOfYear,
      days,
    };
  }, [now.getFullYear()]);

  const elapsedMs = now.getTime() - startOfYear;
  const progress = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
  const currentDay = Math.floor(elapsedMs / (1000 * 60 * 60 * 24)) + 1;
  const daysLeft = totalDays - currentDay;

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  const dayProgress = (now.getTime() - startOfToday) / (1000 * 60 * 60 * 24);

  const handleHover = (e: React.MouseEvent, date: string, today: boolean) => {
    if (!date) {
      setTooltip(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      text: date,
      isToday: today,
    });
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col p-6 overflow-hidden font-sans">
      <header className="py-8 md:py-[6vh] text-center shrink-0">
        <h1 className="text-4xl md:text-[8vh] font-serif tracking-tight text-white/90 leading-none">
          {year}
        </h1>
      </header>

      <main className="flex-1 flex justify-center items-center overflow-hidden">
        <div className="grid grid-cols-18 md:grid-cols-40 gap-y-3 gap-x-2 md:gap-[1vh] w-full px-4 max-w-5xl justify-items-center content-center">
          {days.map((day) => (
            <DayDot
              key={day.dayNum}
              dayNum={day.dayNum}
              dateStr={day.dateStr}
              isPast={day.dayNum < currentDay}
              isToday={day.dayNum === currentDay}
              dayProgress={dayProgress}
              onHover={handleHover}
            />
          ))}
        </div>
      </main>

      <footer className="py-8 md:py-[6vh] text-center shrink-0">
        <div className="text-lg md:text-[3vh] font-light tracking-wide">
          <span className="text-danger font-medium">{daysLeft}d left</span>
          <span className="mx-2 text-white/20">·</span>
          <span className="text-white/40">{progress.toFixed(7)}%</span>
        </div>
      </footer>

      {tooltip && (
        <div
          className="fixed bg-white text-black text-[10px] md:text-[1.2vh] px-2 py-1 rounded shadow-xl pointer-events-none flex flex-col items-center z-50 transform -translate-x-1/2 -translate-y-[calc(100%+8px)] transition-all duration-75"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <span className="font-medium">{tooltip.text}</span>
          {tooltip.isToday && (
            <span className="text-[8px] md:text-[0.9vh] opacity-60">Today</span>
          )}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
        </div>
      )}
    </div>
  );
}

export default App;
