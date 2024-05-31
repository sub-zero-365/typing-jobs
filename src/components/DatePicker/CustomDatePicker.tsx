
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"
import { DateRange } from "react-day-picker"

import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import { useFilter } from "../../hooks/CustomLinkFilterHook"
import { cn } from "../../lib/utils"
export function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 0),
    })
    const { handleFilterChange } = useFilter()
    React.useEffect(() => {
        // console.log({ from: date?.from, to: date?.to })

    },
        [date]
    )
    return (
        <div className={cn("grid gap-2 w-fit px-4 py-2 rounded-md mt-2 mx-auto  z-[10] shadow-l shadow-md shadow-colorPrimary", className)}>
            <Button type="button"
                id="date"
                variant={"outline"}
                className={cn(
                    "w-full justify-start text-left font-normal ",
                    !date && "text-muted-foreground"
                )}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                    date.to ? (
                        <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                        </>
                    ) : (
                        format(date.from, "LLL dd, y")
                    )
                ) : (
                    <span>Pick a date</span>
                )}
            </Button>
            <Calendar
                className=""
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                classNames={{
                    button: "",
                    day_range_start: "bg-colorPrimary",
                    day_range_middle: "bg-colorPrimary/50",
                    day_disabled: "text-colorPrimary/40"
                }}
                // modifiersClassNames={{
                //     range_middle: "bg-orange-500",
                //     selected: "bg-blue-500",
                //     today: "bg-blue-900"
                // }}
                footer={date?.from ? <Button className="w-full mt-4 bg-colorPrimary">
                    Filter By Day
                </Button> : <></>}

                modifiers={{
                }}
                numberOfMonths={1}

                disabled={[
                    {
                        after: new Date()
                    }
                ]}


            // max={new Date()}


            />
            {/* </PopoverContent>
            </Popover> */}
        </div>
    )
}
