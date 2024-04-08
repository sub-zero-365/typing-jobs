import { useSearchParams } from "react-router-dom"
import { LineChart, BarChart, PieChart, Scrollable } from "./"
import { AreaChart } from "./AreaChart"
import FilterButton from "./FilterButton"
import Button from "./Button"
import { useState } from "react"
import { chatsOptions } from "../utils/sortedOptions"
const ChartsOptions = ({ default_chart = "line", userData = null,
    containerClass,
    chartContainerClass,
    btn_position = "top",
    queryOption = "chartOption",
    donot_refresh,
}) => {
    const [searchParams] = useSearchParams()
    const [querySearch, setQuerySearch] = useState(null)
    const FilterButtonPosition = () => {

        return <>
            <p className="text-center text-lg text-slate-600">select chart below to disply </p>
            <Scrollable className="!justify-center !mt-2.5">
                {
                    donot_refresh ? chatsOptions.map((query) => <Button
                        name={query.label.split(" ")?.slice(0, 1).join("")}
                        onClick={() => {
                            setQuerySearch(query.value)
                        }}
                        {...query} key={query} />)
                        : chatsOptions.map((query) => <FilterButton
                            name="chartOption"
                            {...query} key={query} />)
                }
            </Scrollable>
        </>
    }
    const currentDisplayChart = searchParams.get(queryOption) || querySearch
    const DisplayChart = ({ currentChart }) => {
        // if (currentChart && !chatsOptions.some(opt => opt.value.includes(opt))) return "invalid option passed"
        if (currentChart == null && default_chart) return <DisplayChart currentChart={default_chart} />
        if (currentChart == "line") return <LineChart chartData={userData} />
        if (currentChart == "bar") {
            // const labels = userData?.labels;
            const formatUserData = { ...userData };
            // formatUserData.datasets[0].backgroundColor = ["red", "green", "blue","red", "green", "blue",]
            return (<BarChart chartData={formatUserData}
            />)

        }
        if (currentChart == "pie") return <PieChart chartData={userData} />
        if (currentChart == "area") return <AreaChart chartData={{
            ...userData,
            datasets: [
                {
                    fill: true,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    label: "ticket vs user data",
                    // data: users?.map((v) => v.total)
                    // ...userData?.users

                },
            ]
        }}
        />
    }
    if (!userData) return "Nothing to display here"
    return (
        <div
            className={`${containerClass} mainclasses`}
        >
            <div className={`${chartContainerClass}`}>
                {btn_position == "top" && <FilterButtonPosition />}
                <DisplayChart currentChart={currentDisplayChart} />
                {btn_position == "bottom" && <FilterButtonPosition />}

            </div>

        </div>
    )

}

export default ChartsOptions