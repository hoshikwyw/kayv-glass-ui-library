export const containerBase =
  'inline-flex flex-col w-72 rounded-2xl select-none p-4 ' +
  'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm ' +
  'border border-white/60 dark:border-white/10 ' +
  'shadow-lg shadow-slate-100/50 dark:shadow-black/20';

export const headerBase = 'flex items-center justify-between mb-3';

export const navButtonBase =
  'flex h-7 w-7 items-center justify-center rounded-lg ' +
  'text-slate-400 dark:text-slate-500 ' +
  'hover:text-slate-700 dark:hover:text-slate-300 ' +
  'hover:bg-slate-100/70 dark:hover:bg-white/8 ' +
  'disabled:opacity-30 disabled:pointer-events-none ' +
  'transition-colors focus:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-kv-300/70 dark:focus-visible:ring-kv-500/40';

// Clickable month / year label in the header
export const headerLabelButtonBase =
  'flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ' +
  'text-sm font-semibold text-slate-900 dark:text-white ' +
  'hover:bg-slate-100/70 dark:hover:bg-white/8 ' +
  'transition-colors focus:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-kv-300/70 dark:focus-visible:ring-kv-500/40';

export const headerRangeLabelBase =
  'text-sm font-semibold text-slate-900 dark:text-white';

export const weekRowBase = 'grid grid-cols-7 mb-1';

export const weekDayBase =
  'flex items-center justify-center h-8 ' +
  'text-[11px] font-medium text-slate-400 dark:text-slate-500';

export const weekDayWeekendStyles = 'text-rose-400 dark:text-rose-500';

export const gridBase = 'grid grid-cols-7';

export const cellBase = 'relative flex items-center justify-center h-8';

export const rangeStripBase = 'bg-kv-50 dark:bg-kv-500/15';

export const dayButtonBase =
  'relative z-10 flex items-center justify-center h-8 w-8 rounded-full text-sm ' +
  'transition-colors duration-75 focus:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-kv-300/70 dark:focus-visible:ring-kv-500/40';

export const dayDefaultStyles =
  'text-slate-700 dark:text-slate-300 ' +
  'hover:bg-kv-50 dark:hover:bg-kv-500/15 ' +
  'hover:text-slate-900 dark:hover:text-white';

export const dayTodayStyles =
  'font-semibold text-kv-600 dark:text-kv-400 ' +
  'ring-1 ring-kv-300 dark:ring-kv-500/50';

export const daySelectedStyles =
  'bg-kv-500 text-white font-medium ' +
  'hover:bg-kv-600 dark:hover:bg-kv-400';

export const dayDisabledStyles = 'opacity-30 cursor-not-allowed';

export const dayHolidayStyles =
  'text-rose-600 dark:text-rose-400 ' +
  'hover:bg-rose-50 dark:hover:bg-rose-500/15 ' +
  'hover:text-rose-700 dark:hover:text-rose-300';

export const dayHolidayTodayStyles =
  'font-semibold text-rose-600 dark:text-rose-400 ' +
  'ring-1 ring-rose-300 dark:ring-rose-500/50';

export const dayHolidaySelectedStyles =
  'bg-rose-500 text-white font-medium ' +
  'hover:bg-rose-600 dark:hover:bg-rose-400';

// Month / year picker grid
export const pickerGridBase = 'grid grid-cols-3 gap-1 min-h-[168px] content-start';

export const pickerItemBase =
  'flex items-center justify-center h-10 rounded-xl text-sm ' +
  'transition-colors duration-75 focus:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-kv-300/70 dark:focus-visible:ring-kv-500/40';

export const pickerItemDefaultStyles =
  'text-slate-700 dark:text-slate-300 ' +
  'hover:bg-kv-50 dark:hover:bg-kv-500/15 ' +
  'hover:text-slate-900 dark:hover:text-white';

export const pickerItemTodayStyles =
  'font-semibold text-kv-600 dark:text-kv-400 ' +
  'ring-1 ring-kv-300 dark:ring-kv-500/50';

export const pickerItemSelectedStyles =
  'bg-kv-500 text-white font-medium ' +
  'hover:bg-kv-600 dark:hover:bg-kv-400';

export const pickerItemDisabledStyles = 'opacity-30 cursor-not-allowed pointer-events-none';
