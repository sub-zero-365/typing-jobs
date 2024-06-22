import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { useFilter } from "../../hooks/CustomLinkFilterHook";
import { cn } from "../../lib/utils";
import dayjs from "dayjs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"
interface ParsedDates {
    startDate: Date | null;
    endDate: Date | null;
}

function parseDateRange(date: string): ParsedDates {
    const [start, end] = decodeURIComponent(date)
        .split(",")
        .map((d) => d.split("=")[1].trim());

    const startDate = dayjs(start).isValid() ? new Date(start) : null;
    const endDate = dayjs(end).isValid() ? new Date(end) : null;

    return { startDate, endDate };
}

export function DatePickerWithRange({ className,open }: React.HTMLAttributes<HTMLDivElement> ) {
    const { handleFilterChange, searchQuery } = useFilter();

    const is_date_query = searchQuery.get("date")
    const dateQuery = is_date_query ?? "start='',end=''";
    const { startDate, endDate } = parseDateRange(dateQuery);

    const initialDateRange: DateRange = {
        from: startDate || new Date(),
        to: endDate || new Date(),
    };

    const [date, setDate] = useState<DateRange | undefined>(initialDateRange);

    const handleFilter = () => {
        handleFilterChange({
            key: "date",
            value: `start=${date?.from ? dayjs(date.from).format("YYYY-MM-DD") : ''},end=${date?.to ? dayjs(date.to).format("YYYY-MM-DD") : ''}`
        });
    };

    const clearFilter = () => {
        handleFilterChange({ key: "date" });
    };

    return (
        <>

            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
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
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar

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
                        footer={
                            date?.from ? (
                                <div className="flex items-center gap-x-2 justify-center text-xs">
                                    <Button className="w-full text-xs  bg-colorPrimary" onClick={handleFilter}>
                                        Filter By Day
                                    </Button>
                                    {
                                        is_date_query && <Button variant="destructive" className="w-full text-xs " onClick={clearFilter}>
                                            Clear Filter
                                        </Button>
                                    }

                                </div>
                            ) : null
                        }
                        numberOfMonths={1}
                        disabled={[{ after: new Date() }]}
                    />
                </PopoverContent>
            </Popover>

        </>
    );
}
