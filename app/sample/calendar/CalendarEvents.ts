
const CalendarEvents = () => {



}

export default CalendarEvents;


export interface ICalendarEvent {
    Name: string,
    StartDate: Date,
    EndDate: Date,
    Description: string
}

export interface ICalendarEventDetail {
    Name: string,
    MeetingDate: number,
    MeetingStartHour: number,
    MeetingStartMinutes: number,
    MeetingEndHour: number,
    MeetingEndMinutes: number,
    Duration: number,
    Description: string
}

let data: ICalendarEvent[] = [{ Name: "Event1", StartDate: new Date(2022, 12, 4, 11), EndDate: new Date(2022, 12, 4, 12), Description: "Sprint 1 meeting" },
{ Name: "Event2", StartDate: new Date(2022, 12, 6, 15), EndDate: new Date(2022, 12, 6, 17), Description: "Database Design Improvement discussion" },
{ Name: "Event3", StartDate: new Date(2022, 12, 2, 10), EndDate: new Date(2022, 12, 2, 12, 30), Description: "Internal team meeting about technical development and skills enhancement" },
{ Name: "Event4", StartDate: new Date(2022, 12, 1, 17), EndDate: new Date(2022, 12, 1, 20, 30), Description: "Code Review on sprint 1 cases and QA discussions" }
,{ Name: "Event5", StartDate: new Date(2022, 12, 6, 9), EndDate: new Date(2022, 12, 6, 11, 30), Description: "Cloud Setup Discussion" }]

export const getCalendarData = (): ICalendarEventDetail[] => {
    let entities: ICalendarEventDetail[] = [];

    data.forEach(d => {
        entities.push({
            Name: d.Name,
            MeetingDate: getDayDate(d.StartDate),
            MeetingStartHour: getHourDate(d.StartDate),
            MeetingStartMinutes: getMinutesDate(d.StartDate),
            MeetingEndHour: getHourDate(d.EndDate),
            MeetingEndMinutes: getMinutesDate(d.EndDate),
            Duration: getDurationInMinutes(d.StartDate, d.EndDate),
            Description: d.Description
        })
    })

    return entities;
}

//Date, Time in hour, minutes, 
export const getDayDate = (value: Date): number => {
    return value.getDate();
}


export const getHourDate = (value: Date): number => {
    return value.getHours();
}

export const getMinutesDate = (value: Date): number => {
    return value.getMinutes();
}

export const getDurationInMinutes = (from: Date, to: Date): number => {
    return Math.round((to.getTime() - from.getTime()) / 60000);
}

export const getAllDaysOfMonth = (monthNumber: number) =>{
    new Date(2022, 11, 0);

}

export interface ICalendarState {
    Mode: "Week" | "Month" | "Day",
    DateValue: Date
    Value: number,  //For Month it has number Index, for day it has date, for week it has week index,
    Label: string  //Value Info 
    MonthDays: ICalendarMonthDays[],
}

export interface ICalendarMonthDays {
    IndexNumber: number
    DayDate: number,
    IsCurrentMonth: boolean
}

export interface ICalendarWeekDays {
    IndexNumber: number,
    Day: string,
    DayDate: number,
    IsCurrentMonth: boolean
}

export const getWeekDaysData =  (year: number  = new Date().getFullYear(), monthIndex: number = new Date().getMonth(), calendarState: ICalendarState) => {

    var requestedDate = new Date(year, monthIndex);
    
    calendarState.Mode = "Week";

    

}

export const getMonthData = (year: number  = new Date().getFullYear(), monthIndex: number = new Date().getMonth()):ICalendarState => {
    var data: ICalendarState = {} as ICalendarState;
    data.Mode = "Month";
    data.DateValue = new Date(year, monthIndex);
    data.Label = `${data.DateValue.toLocaleDateString('en-us', {month: "long"})}, ${data.DateValue.getFullYear()}`
    data.Value = monthIndex;
    
    let firstDayOfMonth = new Date(year, monthIndex).getDay();

    let lastDateOfMonth = new Date(year, monthIndex + 1, 0).getDate();
    let lastDateOfLastMonth = new Date(year, monthIndex, 0).getDate();

    let lastDayOfMonth = new Date(year, monthIndex, lastDateOfMonth).getDay();

    data.MonthDays = [];

    let indexNumber = 0;

    //Previous month last days
    firstDayOfMonth = firstDayOfMonth != 0 ? firstDayOfMonth : 7;

    for(let i = (firstDayOfMonth - 1); i > 0; i--){
        data.MonthDays.push({DayDate: lastDateOfLastMonth - i + 1, IsCurrentMonth: false, IndexNumber: ++indexNumber})
    }
    

    //all days of current month
    for(let i = 1; i <= lastDateOfMonth; i++){
        data.MonthDays.push({DayDate: i, IsCurrentMonth: true, IndexNumber: ++indexNumber});
    }

    //next month first days
    lastDayOfMonth = lastDayOfMonth != 0 ? lastDayOfMonth : 7;


    for(let i = lastDayOfMonth; i <= 6; i++){
        data.MonthDays.push({DayDate: i- lastDayOfMonth + 1, IsCurrentMonth: false, IndexNumber: ++indexNumber});
    }

    return data;
}

export const getDate = (): Date => {
    return new Date();
}