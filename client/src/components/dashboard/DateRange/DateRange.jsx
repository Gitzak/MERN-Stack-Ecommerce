import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/en";

const { RangePicker } = DatePicker;

export const DateRange = () => {
    const getWeekDates = () => {
        const today = dayjs();
        const startOfWeek = today.startOf("week");
        const endOfWeek = today.endOf("week");
        return [startOfWeek, endOfWeek];
    };

    const [defaultStartDate, defaultEndDate] = getWeekDates();

    return (
        <Space direction="vertical" size={12}>
            <RangePicker
                size="large"
                defaultValue={[defaultStartDate, defaultEndDate]}
                format="YYYY-MM-DD"
            />
        </Space>
    );
};
