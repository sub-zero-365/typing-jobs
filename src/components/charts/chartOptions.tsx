import { useSearchParams } from "react-router-dom"
import { LineChart, BarChart, AreaChart, PieChart } from "./react-chartjs-2"
// import FilterButton from "./FilterButton"

import { useState } from "react"
import { chatsOptions } from "../utils/sortedOptions.ts"
import { Button } from "../ui/button"
import { Scrollable } from "../Scrollable"
import FilterButton from "../CustomFilterLink"
import React from "react"
import { cn } from "../../lib/utils.ts"


export const FilterButtonPosition = () => {
    return <>
        <p className="text-center text-lg text-slate-600">select chart below to disply </p>
        <Scrollable className=" !mt-2.5 gap-y-2 gap-x-1 w-fit max-w-full mx-auto" direction="row">
            <FilterButton
                show
                filterType="chartOption"
                layoutId="hohdfhiahdhh"
                selectedClassName='text-green-800   text-white bg-colorPrimary'
                animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                className='bg-transparent text-xs relative z-20 bg-white lg:text-sm capitalize w-fit px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9 flex items-center   hover:bg-purple-600/20'

            >
                Bar Chart
            </FilterButton>
            {
                chatsOptions.map((query, idx) => {
                    if (!idx) return
                    return (<FilterButton
                        show
                        filterType="chartOption"
                        layoutId="hohdfhiahdhh"
                        selectedClassName='text-green-800   text-white bg-colorPrimary'
                        animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                        className='bg-transparent text-xs relative z-20 bg-white lg:text-sm capitalize w-fit px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9 flex items-center   hover:bg-purple-600/20'

                        {...query} key={query.label} >
                        {query.label}
                    </FilterButton>)
                })
            }
        </Scrollable>
    </>
}
interface iChartOPtions {
    containerClass?: string,
    chartContainerClass?: string,
    btn_position?: "top" | "bottom",
    queryOption?: "chartOption",
    donot_refresh?: boolean,
    default_chart?: "line" | "pie" | "bar" | "area",
    chartData: any,
}
const ChartsOptions = ({
    default_chart = "bar",
    chartData,
    containerClass,
    chartContainerClass,
    btn_position = "top",
    queryOption = "chartOption",
    donot_refresh,
}: iChartOPtions) => {
    const [searchParams] = useSearchParams()
    const [querySearch, setQuerySearch] = useState<any>()
    const FilterButtonPosition = () => {
        return <>
            <p className="text-center text-lg text-slate-600">select chart below to disply </p>
            <Scrollable className=" !mt-2.5 gap-y-2 gap-x-1 max-w-sm lg:max-w-md [--scroll-to-height:0px] lg:[--scroll-to-height:6px] mx-auto" direction="row">
                {
                    donot_refresh ? chatsOptions.map((query) => <Button
                        name={query.label.split(" ")?.slice(0, 1).join("")}
                        onClick={() => {
                            setQuerySearch(query.value!)
                        }}
                        className={cn('bg-transparent text-xs relative z-20 bg-white lg:text-sm capitalize w-fit px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9 flex items-center   hover:bg-purple-600/20',
                            query.value == querySearch && " animate-pulse  shadow-md  right-0  bg-purple-600/60  rounded-full"
                        )}

                        key={query.label} >{query.label}</Button>)
                        : chatsOptions.map((query) => <FilterButton
                            show
                            filterType="chartOption"
                            layoutId="hohdfhiahdhh"
                            selectedClassName='text-green-800   text-white bg-colorPrimary'
                            animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                            className='bg-transparent text-xs relative z-20 bg-white lg:text-sm capitalize w-fit px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9 flex items-center   hover:bg-purple-600/20'

                            {...query} key={query.label} >
                            {query.label}
                        </FilterButton>)
                }
            </Scrollable>
        </>
    }
    const currentDisplayChart = !donot_refresh ? searchParams.get(queryOption) : querySearch
    const DisplayChart = ({ currentChart }) => {
        if (currentChart == null && default_chart) return <DisplayChart currentChart={default_chart} />
        if (currentChart == "line") return <LineChart chartData={chartData} />
        if (currentChart == "bar") return <BarChart chartData={chartData} />
        if (currentChart == "pie") return <div className="max-w-sm mx-auto"><PieChart chartData={chartData} /></div>
        if (currentChart == "area") return <AreaChart chartData={chartData}
        />
    }
    if (!chartData) return "Nothing to display here"
    return (
        <div
            className={cn("", containerClass)}
        >
            <div className={cn("", chartContainerClass)}>
                {btn_position == "top" && donot_refresh && <FilterButtonPosition />}
                <DisplayChart currentChart={currentDisplayChart} />
                {btn_position == "bottom" && donot_refresh && <FilterButtonPosition />}
            </div>
        </div>
    )

}

export default ChartsOptions