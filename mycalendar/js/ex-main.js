'use strict';

$(function() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    function getCalendarHead() {
        let dates = [];
        let d = new Date(year, month, 0).getDate();
        let n = new Date(year, month, 1).getDay();

        for (let i = 0; i < n; i++) {
            dates.unshift({
                date: d - i,
                isToday: false,
                isDisabled: true,
            });
        }

        return dates;
    }

    function getCalendarTail() {
        let dates = [];
        let lastDay = new Date(year, month + 1, 0).getDay();

        for (let i = 1; i < 7 - lastDay; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: true,
            });
        }

        return dates;
    }

    function getCalendarBody() {
        let dates = [];
        let lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= lastDate; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: false,
            });
        }

        if (year === today.getFullYear() && month === today.getMonth()) {
            dates[today.getDate() - 1].isToday = true;
        }

        return dates;
    }

    function createCalendar() {
        clearCalendar();
        renderTitle();

        let dates = [...getCalendarHead(), ...getCalendarBody(), ...getCalendarTail()];

        renderWeeks();

        function renderWeeks() {
            let weeksCount = dates.length / 7;

            for (let i = 0; i < weeksCount; i++) {
                let week = dates.splice(0, 7);
                let $tr = $('<tr></tr>');

                $.each(week, function(index, date) {
                    let $td = $('<td></td>').text(date.date);

                    if (date.isToday) {
                        $td.addClass('today');
                    }
                    if (date.isDisabled) {
                        $td.addClass('disabled');
                    }

                    $tr.append($td);
                });

                $('tbody').append($tr);
            }
        }

        function renderTitle() {
            let title = `${year}/${String(month + 1).padStart(2, '0')}`;
            $('#title').text(title);
        }

        function clearCalendar() {
            $('tbody').empty();
        }
    }

    $('#prev').click(function() {
        month--;
        if (month < 0) {
            year--;
            month = 11;
        }
        createCalendar();
    });

    $('#next').click(function() {
        month++;
        if (month > 11) {
            year++;
            month = 0;
        }
        createCalendar();
    });

    $('#today').click(function() {
        year = today.getFullYear();
        month = today.getMonth();

        createCalendar();
    });

    createCalendar();
});
