import { useRef, useState } from "react";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar, Select } from "antd";
import type { Moment } from "moment";
import momentGenerateConfig from "rc-picker/es/generate/moment";
import { HeaderRender } from "antd/es/calendar/generateCalendar";
import moment from "moment";
import "./callendar.css";

export const MyCalendar =
  Calendar.generateCalendar<Moment>(momentGenerateConfig);

export default function CustomCalendar() {
  // const [month, setMonth] = useState(moment().format("MMMM"));
  const [year, setYear] = useState(moment().format("YYYY"));

  const monthSelector = useRef(null);
  const yearSelector = useRef(null);

  const getListData = (value: Moment) => {
    let listData: { type: string; content: string }[] = []; // Specify the type of listData
    // switch (value.date()) {
    //   case 8:
    //     listData = [
    //       { type: 'warning', content: 'This is warning event.' },
    //       { type: 'success', content: 'This is usual event.' },
    //     ];
    //     break;
    //   case 10:
    //     listData = [
    //       { type: 'warning', content: 'This is warning event.' },
    //       { type: 'success', content: 'This is usual event.' },
    //       { type: 'error', content: 'This is error event.' },
    //     ];
    //     break;
    //   case 15:
    //     listData = [
    //       { type: 'warning', content: 'This is warning event' },
    //       { type: 'success', content: 'This is very long usual event......' },
    //       { type: 'error', content: 'This is error event 1.' },
    //       { type: 'error', content: 'This is error event 2.' },
    //       { type: 'error', content: 'This is error event 3.' },
    //       { type: 'error', content: 'This is error event 4.' },
    //     ];
    //     break;
    //   default:
    // }
    return listData || [];
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Moment>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const headerRender: HeaderRender<Moment> = ({ value, onChange }) => {
    let formatString = value.format("MM/DD/YYYY");
    let month = value.format("MMMM")
    let year = value.format("YYYY")
    return (
      <div className="flex flex-row space-x-5 mb-5">
        <Select
          ref={monthSelector}
          defaultValue={month}
          style={{ width: 120 }}
          onChange={(val: string) => onChange(moment(val))}
          options={[
            { value: `01/01/${year}`, label: "January" },
            { value: `02/01/${year}`, label: "February" },
            { value: `03/01/${year}`, label: "March" },
            { value: `04/01/${year}`, label: "April" },
            { value: `05/01/${year}`, label: "May" },
            { value: `06/01/${year}`, label: "June" },
            { value: `07/01/${year}`, label: "July" },
            { value: `08/01/${year}`, label: "August" },
            { value: `09/01/${year}`, label: "September" },
            { value: `10/01/${year}`, label: "October" },
            { value: `11/01/${year}`, label: "November" },
            { value: `12/01/${year}`, label: "December" },
          ]}
        />
        <Select
          defaultValue={year}
          style={{ width: 120 }}
          ref={yearSelector}
          onChange={(val: string) => onChange(moment(val))}
          options={[
            {
              value: `${formatString.slice(0, formatString.length - 2)}24`,
              label: "2024",
            },
            {
              value: `${formatString.slice(0, formatString.length - 2)}25`,
              label: "2025",
            },
            {
              value: `${formatString.slice(0, formatString.length - 2)}26`,
              label: "2026",
            },
            {
              value: `${formatString.slice(0, formatString.length - 2)}27`,
              label: "2027",
            },
            {
              value: `${formatString.slice(0, formatString.length - 2)}28`,
              label: "2028",
            },
            {
              value: `${formatString.slice(0, formatString.length - 2)}29`,
              label: "2029",
            },
            {
              value: `${formatString.slice(0, formatString.length - 2)}30`,
              label: "2030",
            },
            {
              value: `${formatString.slice(0, formatString.length - 2)}31`,
              label: "2031",
            },
            {
              value: `${formatString.slice(0, formatString.length - 2)}32`,
              label: "2032",
            },
            {
              value: `${formatString.slice(0, formatString.length - 2)}33`,
              label: "2033",
            },
            {
              value: `${formatString.slice(0, formatString.length - 2)}34`,
              label: "2034",
            },
            {
              value: `${formatString.slice(0, formatString.length - 2)}35`,
              label: "2035",
            },
          ]}
        />
      </div>
    );
  };

  const locale = {
    lang: {
      locale: "pt_BR",
      placeholder: "Select date",
      rangePlaceholder: ["Start date", "End date"],
      today: "Today",
      now: "Now",
      backToToday: "Back to today",
      ok: "OK",
      clear: "Clear",
      month: "Month",
      year: "Year",
      timeSelect: "Select time",
      dateSelect: "Select date",
      monthSelect: "Choose a month",
      yearSelect: "Choose a year",
      decadeSelect: "Choose a decade",
      yearFormat: "YYYY",
      dateFormat: "D/M/YYYY",
      dayFormat: "D",
      dateTimeFormat: "D/M/YYYY HH:mm:ss",
      monthFormat: "MMMM",
      shortWeekDays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    dateFormat: "DD-MM-YYYY",
    dateTimeFormat: "DD-MM-YYYY HH:mm:ss",
    weekFormat: "wo-YYYY",
    monthFormat: "MM-YYYY",
  };

  return (
    <MyCalendar
      cellRender={cellRender}
      onChange={(date) => {
        // setMonth(moment(date).format("MMMM"));
        if (year !== moment(date).format("YYYY")) {
          setYear(moment(date).format("YYYY"));

          if (yearSelector.current !== null) {
            const spanEl = (
              ((yearSelector.current as any).nativeElement as HTMLDivElement)
                .firstChild as HTMLDivElement
            ).lastChild as HTMLSpanElement;
            spanEl.textContent = moment(date).format("YYYY");
          }
        }

        if (monthSelector.current !== null) {
          const spanEl = (
            ((monthSelector.current as any).nativeElement as HTMLDivElement)
              .firstChild as HTMLDivElement
          ).lastChild as HTMLSpanElement;
          spanEl.textContent = moment(date).format("MMMM");
        }
      }}
      locale={locale as any}
      headerRender={headerRender}
    />
  );
}
