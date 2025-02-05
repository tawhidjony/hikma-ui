import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "../../utils";

interface UiDatePickersProps {
  className?: string;
  selectedStyle?: string;
  todayDateStyle?: string;
  onChange?: (value: string | null) => void;
  value?: string;
  register?: { onChange: (value: string | null) => void };
  fullWidth?: boolean;
  errors?: boolean;
  dateFormat?: string;
  placeholder?: string;
  title?: string;
  mark?: string;
  name?: string;
  disablePastDates?: boolean;
}

const UiBasicDatePicker = forwardRef<HTMLInputElement, UiDatePickersProps>((props, ref) => {
  const {
    className,
    selectedStyle,
    todayDateStyle,
    onChange,
    value,
    register,
    fullWidth = false,
    errors = false,
    dateFormat = "MM/dd/yyyy",
    placeholder = "Select date",
    title = "",
    mark = "",
    name = "",
    disablePastDates = false,
  } = props;

  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (value) {
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    }
    return null;
  });
  const [year, setYear] = useState<number>(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear());
  const [month, setMonth] = useState<number>(selectedDate ? selectedDate.getMonth() : new Date().getMonth());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNextMonthClick = () => {
    if (month === 11) setYear(year + 1);
    setMonth((month + 1) % 12);
  };

  const handlePrevMonthClick = () => {
    if (month === 0) setYear(year - 1);
    setMonth((month - 1 + 12) % 12);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(e.target.value));
  };

  const renderDates = () => {
    const datesArray = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day);
      const disabled = isDateDisabled(date);
      datesArray.push(
        <button
          key={`prev-${day}`}
          className={cn(
            "p-1 text-gray-400 bg-white border border-gray-300 rounded",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-100"
          )}
          onClick={() => !disabled && handleDateClick(date)}
          disabled={disabled}
        >
          {day}
        </button>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = isDateToday(date);
      const isSelected = isDateSelected(date);
      const disabled = isDateDisabled(date);
      datesArray.push(
        <button
          type="button"
          key={i}
          className={cn(
            "border border-gray-300 rounded p-1",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            isToday
              ? cn("border border-primary-600 bg-primary-200", todayDateStyle)
              : isSelected
                ? cn(
                  "bg-primary-400 text-primary-900 border border-primary-600",
                  selectedStyle
                )
                : "bg-white hover:bg-gray-100"
          )}
          onClick={() => !disabled && handleDateClick(date)}
          disabled={disabled}
        >
          {i}
        </button>
      );
    }

    const remainingDays = 42 - datesArray.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      const disabled = isDateDisabled(date);
      datesArray.push(
        <button
          key={`next-${i}`}
          className={cn(
            "p-1 text-gray-400 bg-white border border-gray-300 rounded",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-100"
          )}
          onClick={() => !disabled && handleDateClick(date)}
          disabled={disabled}
        >
          {i}
        </button>
      );
    }

    return datesArray;
  };

  const isDateToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const isDateDisabled = (date: Date) => {
    if (disablePastDates) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    }
    return false;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
    setShowDatePicker(false);
    if (onChange) {
      onChange(formatDate(date, dateFormat));
    }
    if (register) {
      register.onChange(formatDate(date, dateFormat));
    }
  };

  const clearDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedDate(null);
    if (onChange) {
      onChange(null);
    }
    if (register) {
      register.onChange(null);
    }
  };

  const formatDate = (date: Date, format: string) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, '0');
    const monthIndex = date.getMonth() + 1;
    const monthName = date.toLocaleString('default', { month: 'long' });
    const shortMonthName = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    return format
      .replace('dd', day)
      .replace('MM', monthIndex.toString().padStart(2, '0'))
      .replace('MMMM', monthName)
      .replace('MMM', shortMonthName)
      .replace('yyyy', year.toString())
      .replace('yy', year.toString().slice(-2));
  };

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  return (
    <div className="relative" ref={datePickerRef}>
      <label htmlFor={name || ""}>{title || ""}</label>
      <div className="relative">
        <input
          type="text"
          className={cn('bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-0 focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500',
            fullWidth ? "block w-full" : "", errors && 'border-red-600 focus:border-red-500', className)}
          ref={ref}
          value={selectedDate ? formatDate(selectedDate, dateFormat) : ""}
          onClick={handleInputClick}
          placeholder={placeholder}
          readOnly
        />
        {selectedDate && (
          <button
            type="button"
            className="absolute text-gray-400 transform -translate-y-1/2 right-2 top-1/2 hover:text-gray-600"
            onClick={clearDate}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      {showDatePicker && (
        <div className="absolute top-[110%] left-0 bg-white border border-gray-300 rounded z-[9999]">
          <div className="flex items-center justify-between p-2 border-b border-gray-300">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <select
                  value={month}
                  onChange={handleMonthChange}
                  className="h-8 px-2 py-1 bg-white border rounded focus:outline-none "
                >
                  <option value={0}>January</option>
                  <option value={1}>February</option>
                  <option value={2}>March</option>
                  <option value={3}>April</option>
                  <option value={4}>May</option>
                  <option value={5}>June</option>
                  <option value={6}>July</option>
                  <option value={7}>August</option>
                  <option value={8}>September</option>
                  <option value={9}>October</option>
                  <option value={10}>November</option>
                  <option value={11}>December</option>
                </select>
                <input
                  type="number"
                  value={year}
                  onChange={handleYearChange}
                  className="h-8 px-2 py-1 bg-white border rounded max-w-20 focus:outline-none "
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="flex items-center justify-center w-8 h-8 text-white border-none rounded cursor-pointer bg-primary-500"
                  onClick={handlePrevMonthClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  className="flex items-center justify-center w-8 h-8 text-white border-none rounded cursor-pointer bg-primary-500"
                  onClick={handleNextMonthClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-7 p-2 bg-gray-100">
            <span className="font-bold text-center">Sun</span>
            <span className="font-bold text-center">Mon</span>
            <span className="font-bold text-center">Tue</span>
            <span className="font-bold text-center">Wed</span>
            <span className="font-bold text-center">Thu</span>
            <span className="font-bold text-center">Fri</span>
            <span className="font-bold text-center">Sat</span>
          </div>
          <div className="grid grid-cols-7 p-2 gap-y-1 gap-x-1">
            {renderDates()}
          </div>
        </div>
      )}
    </div>
  );
});

export default UiBasicDatePicker;
