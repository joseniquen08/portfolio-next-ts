import * as React from "react"
import { HiChevronLeft, HiChevronRight, HiChevronDown } from "react-icons/hi"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"
import { es } from "date-fns/locale"

import { cn } from "@/utils/shadcn"
import { Button, buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  fixedWeeks = false,
  locale = es,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      fixedWeeks={fixedWeeks}
      locale={locale}
      className={cn("bg-zinc-900 p-3 [--cell-size:2rem]", className)}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "h-[var(--cell-size)] w-[var(--cell-size)] select-none p-0 text-zinc-400 hover:text-white hover:bg-zinc-800 aria-disabled:opacity-40",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "h-[var(--cell-size)] w-[var(--cell-size)] select-none p-0 text-zinc-400 hover:text-white hover:bg-zinc-800 aria-disabled:opacity-40",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[var(--cell-size)] w-full items-center justify-center px-[var(--cell-size)]",
          defaultClassNames.month_caption
        ),
        caption_label: cn(
          "select-none text-sm font-medium text-white capitalize",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "w-[var(--cell-size)] select-none rounded-md text-[0.8rem] font-normal text-zinc-500 text-center",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex", defaultClassNames.week),
        day: cn(
          "group/day relative w-[var(--cell-size)] h-[var(--cell-size)] select-none p-0 text-center",
          defaultClassNames.day
        ),
        today: cn("bg-zinc-700 text-white rounded-md", defaultClassNames.today),
        outside: cn("text-zinc-600 opacity-50", defaultClassNames.outside),
        disabled: cn("text-zinc-600 opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        range_start: cn("rounded-l-md bg-zinc-800", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-zinc-800", defaultClassNames.range_end),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: cls, ...rest }) => {
          if (orientation === "left")
            return <HiChevronLeft  className={cn("size-4", cls)} {...(rest as object)} />
          if (orientation === "right")
            return <HiChevronRight className={cn("size-4", cls)} {...(rest as object)} />
          return <HiChevronDown className={cn("size-4", cls)} {...(rest as object)} />
        },
        DayButton: CalendarDayButton,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "w-[var(--cell-size)] h-[var(--cell-size)] font-normal leading-none",
        "text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer",
        "data-[selected-single=true]:bg-white data-[selected-single=true]:text-zinc-900",
        "data-[selected-single=true]:hover:bg-white/90 data-[selected-single=true]:hover:text-zinc-900",
        "data-[range-start=true]:bg-white data-[range-start=true]:text-zinc-900",
        "data-[range-end=true]:bg-white data-[range-end=true]:text-zinc-900",
        "data-[range-middle=true]:bg-zinc-800 data-[range-middle=true]:text-zinc-200",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar }
