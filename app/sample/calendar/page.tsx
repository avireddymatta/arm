"use client";

import React, { useEffect, useState } from 'react'
import { getCalendarData, getDate, getMonthData, ICalendarEventDetail, ICalendarState } from "./CalendarEvents";
import classes from './SampleCalendar.module.css';

function SampleCalendar() {


    const [entities, setEntities] = useState([] as ICalendarEventDetail[]);
    const [calendarState, setCalendarState] = useState({} as ICalendarState);

    useEffect(() => {

        setEntities(getCalendarData());
        setCalendarState({...getMonthData()});
    }, [])

    //var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    var daysShort = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    var weekDaysShort = ["", "01 Sunday", "02 Monday", "03 Tuesday", "04 Wednesday", "05 Thursday", "06 Friday", "07 Saturday"];

    var hourTimeList = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8]

    // Events on Date: 4, 6
    // Timings: 4: 11AM-12PM
    // Timings: 6: 3pm-5pm

    const updateMode = (mode: "Week" | "Month" | "Day") => {
            setCalendarState({...calendarState, Mode: mode});
    }

    const togglePreviousNext = (actionType: "Next" | "Previous") => {
        if(calendarState.Mode == "Month"){

            let monthIndex = calendarState.DateValue.getMonth();

            if(actionType == "Next"){
                monthIndex++;
            }
            else{
                monthIndex--;
            }

            console.log(monthIndex)
            setCalendarState({...getMonthData(calendarState.DateValue.getFullYear(), monthIndex)});
        }
    }

    return (
        <div className="p-5">
            <div className={classes.calendarbar}>
                <div className={classes.calendarbaricongroup} >
                <button className={classes.calendarbaricon} onClick={() => togglePreviousNext("Previous")}>
                <i className="fa-solid fa-angle-left"></i>
                </button>
                <button className={classes.calendarbaricon}  onClick={() => togglePreviousNext("Next")}>
                <i className="fa-solid fa-angle-right"></i>
                </button>

                </div>
                
                <span>{calendarState.Label}</span>

                <div className={classes.calendarbarbuttongroup}>

                <button className={classes.calendarbarbutton} onClick={() => updateMode("Month")}>Month</button>
                <button className={classes.calendarbarbutton}  onClick={() => updateMode("Week")}>Week</button>
                <button className={classes.calendarbarbutton} onClick={() => updateMode("Day")}>Day</button>
                </div>

            </div>
            {/* weekly Calendar */}
            {
                calendarState.Mode == "Week" && 

          
            <div>
                <div className={classes.weeklycalendarheader}>
                    {
                        weekDaysShort.map((day, index) => (
                            <div key={day} className={index == 0 ? classes.weeklyheaderhour : classes.weeklyheader}>
                                <span className={classes.weeklyheadercontent}> {day}</span>

                            </div>
                        ))
                    }
                </div>

                <div>
                    {
                        hourTimeList.map(hour => (
                            <div key={hour} className={classes.weeklycalendarbody}>
                                {
                                    weekDaysShort.map((day, index) => (
                                        <div key={day} className={index == 0 ? classes.weeklybodyhour : classes.weeklybody}>
                                            {
                                                index == 0 && <span>{hour}</span>
                                            }
                                            {
                                                index != 0 &&
                                                <div className={classes.weeklybodycontent}>


                                                    <div className={classes.weeklybodycontentdiv} style={{ borderBottom: "1px dashed" }}>
                                                        {
                                                            entities.findIndex(d => d.MeetingDate == index && d.MeetingStartHour == hour) > -1 &&
                                                        //     <OverlayTrigger key={'right'} placement={'right'}
                                                        //     overlay={getWeeklyOverLayContent(entities.find(d => d.MeetingDate == index && d.MeetingStartHour == hour)!)}
                                                        // >
                                                        //</OverlayTrigger> *

                                                           <div className={classes.meetingContent} style={{ height: `${entities.find(d => d.MeetingDate == index && d.MeetingStartHour == hour)?.Duration!}px` }}>
                                                                {
                                                                    entities.find(d => d.MeetingDate == index && d.MeetingStartHour == hour)?.Name
                                                                }
                                                            </div>
                                                            
                                                        }
                                                    </div>
                                                    <div className={classes.weeklybodycontentdiv}>

                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    ))
                                }
                            </div>

                        ))
                    }

                </div>


            </div>
  }

            {/* Monthly Calendar */}
            {
                calendarState.Mode == "Month" &&

            <div>
                <div className={classes.appcalendarheader}>
                    {
                        daysShort.map(day => (
                            <div key={day} className={classes.dayheader}>
                                <span className={classes.dayheadercontent}> {day}</span>
                            </div>
                        ))
                    }
                </div>
                <div className={classes.appcalendar}>

                    {
                        calendarState.MonthDays.map(day => (
                            <div key={day.IndexNumber} className={classes.day}>
                                <span className={`${day.IsCurrentMonth ? "" : classes.inactiveday}`}>{day.DayDate}</span>
                                
                                {
                                    entities.findIndex(d => d.MeetingDate == day.DayDate) > -1 &&
                                    <>
                                        {/* <br />
                                        <OverlayTrigger key={'right'} placement={'right'}
                                            overlay={getMonthOverLayContent(entities.find(d => d.MeetingDate == day.DayDate)!)}
                                        >
                                            <Button className="btn btn-sm btn-primary rounded-pill" style={{ width: "1rem", height: "1rem" }}></Button>
                                        </OverlayTrigger> */}
                                    </>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            }

        </div>

    )
}

export default SampleCalendar


// const getMonthOverLayContent = (data: ICalendarEventDetail) => {
//     return (
//         <Popover id="popover-basic">
//             <Popover.Header as="h3">{data.Name}</Popover.Header>
//             <Popover.Body>
//                 <span>Meeting Starts at: {data.MeetingStartHour}:{data.MeetingStartMinutes}</span>
//                 <br />
//                 <span>        Ends at: {data.MeetingEndHour}:{data.MeetingEndMinutes}</span>

//             </Popover.Body>
//         </Popover>
//     )
// }

// const getWeeklyOverLayContent = (data: ICalendarEventDetail) => {
//     return (
//         <Popover id="popover-basic">
//             <Popover.Header as="h3">{data.Name}</Popover.Header>
//             <Popover.Body>
//                 <span>Meeting Starts at: {data.MeetingStartHour}:{data.MeetingStartMinutes}</span>
//                 <br />
//                 <span>        Ends at: {data.MeetingEndHour}:{data.MeetingEndMinutes}</span>
//                 <br />
//                 <span>
//                     <strong>Subject:</strong> {data.Description}
//                 </span>

//             </Popover.Body>
//         </Popover>
//     )
// }

