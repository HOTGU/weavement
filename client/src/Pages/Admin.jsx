import React, { useState } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import {
    useRecoilState,
    useRecoilValue,
    useRecoilValueLoadable,
    useResetRecoilState,
} from "recoil";
import Chart from "react-apexcharts";

import { userAtom } from "../atoms/isAuth";
import Loader from "../Components/Loader";
import { contactChartSelector, filterYearAtom } from "../atoms/chart";
import { useEffect } from "react";
import Metatag from "../Components/Metatag";

const CreateOptions = () => {
    let options = [];

    for (let year = 2022; year <= new Date().getFullYear(); year++) {
        options.push({ label: `${year}년`, value: year });
    }

    return (
        <>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </>
    );
};

function Admin() {
    const user = useRecoilValue(userAtom);
    const [chartData, setChartData] = useState({
        options: [],
        data: {
            total: [],
            success: [],
        },
    });
    const [year, setYear] = useRecoilState(filterYearAtom);
    const contactChart = useRecoilValueLoadable(contactChartSelector);
    const reset = useResetRecoilState(contactChartSelector);

    const options = {
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: chartData.options,
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        yaxis: {
            labels: {
                formatter: (val) => {
                    return val.toFixed(0);
                },
            },
        },
        title: {
            text: `${year.year}년`,
            align: `center`,
            style: {
                fontSize: "20px",
            },
        },
        tooltip: {
            y: {
                formatter: (value) => `${value}건`,
            },
        },
        colors: ["#353b48", "rgb(166, 25, 46)"],
    };
    const series = [
        {
            name: "문의",
            data: chartData.data.total || [],
        },
        {
            name: "계약",
            data: chartData.data.success || [],
        },
    ];

    useEffect(() => {
        if (contactChart.state === "hasValue") {
            setChartData(contactChart.contents);
        }
    }, [contactChart]);

    if (!user || !user.isAdmin) return <Navigate to="/" />;

    if (contactChart.state === "loading")
        return <Loader isCenter={true} width="40px" height="40px" />;

    return (
        <>
            <Metatag title="위브먼트Admin" />
            <div className="default-container">
                <Wrapper>
                    <select
                        value={year.year}
                        onChange={(e) => setYear({ year: Number(e.target.value) })}
                    >
                        <CreateOptions />
                    </select>
                    <span className="refreshBtn" onClick={() => reset()}>
                        새로고침
                    </span>
                    <Chart
                        options={options}
                        series={series}
                        type="line"
                        width={"100%"}
                        height={500}
                    />
                </Wrapper>
            </div>
        </>
    );
}

const Wrapper = styled.div`
    width: 100%;
    padding: 30px 0;
    z-index: 1;
    select,
    .refreshBtn {
        padding: 10px;
        margin-right: 5px;
        font-size: 18px;
        border: 1px solid ${(props) => props.theme.borderColor};
        border-radius: 5px;
        cursor: pointer;
    }
`;

export default Admin;
