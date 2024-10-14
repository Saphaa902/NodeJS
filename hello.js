function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    // Helper function to check if a date is a Friday
    function isFriday(date) {
        return date.getDay() === 5;
    }

    // Helper function to get the number of days in a month
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Helper function to calculate working days excluding Fridays
    function calculateWorkingDays(year, month, startDay = 1, endDay = null) {
        let totalDays = getDaysInMonth(year, month);
        endDay = endDay || totalDays;
        let workingDays = 0;

        for (let day = startDay; day <= endDay; day++) {
            let date = new Date(year, month, day);
            if (!isFriday(date)) {
                workingDays++;
            }
        }

        return workingDays;
    }

    // Parse input dates
    let start = new Date(startDate);
    let end = new Date(endDate);

    let totalWorkingDays = 0;
    let daysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
    let monthlyTargets = [];

    // Loop through each month in the range
    for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
        let startMonth = (year === start.getFullYear()) ? start.getMonth() : 0;
        let endMonth = (year === end.getFullYear()) ? end.getMonth() : 11;

        for (let month = startMonth; month <= endMonth; month++) {
            let monthStartDay = (year === start.getFullYear() && month === start.getMonth()) ? start.getDate() : 1;
            let monthEndDay = (year === end.getFullYear() && month === end.getMonth()) ? end.getDate() : getDaysInMonth(year, month);

            // Calculate total working days in the current month (excluding Fridays)
            let totalDaysInMonthExcludingFridays = calculateWorkingDays(year, month);
            daysExcludingFridays.push(totalDaysInMonthExcludingFridays);

            // Calculate worked days in the current month within the range (excluding Fridays)
            let workedDaysInMonthExcludingFridays = calculateWorkingDays(year, month, monthStartDay, monthEndDay);
            daysWorkedExcludingFridays.push(workedDaysInMonthExcludingFridays);

            totalWorkingDays += workedDaysInMonthExcludingFridays;
        }
    }

    // Calculate monthly targets based on the proportion of working days in each month
    let totalTarget = 0;
    for (let i = 0; i < daysWorkedExcludingFridays.length; i++) {
        let monthlyTarget = (daysWorkedExcludingFridays[i] / totalWorkingDays) * totalAnnualTarget;
        monthlyTargets.push(monthlyTarget);
        totalTarget += monthlyTarget;
    }

    return {
        daysExcludingFridays: daysExcludingFridays,
        daysWorkedExcludingFridays: daysWorkedExcludingFridays,
        monthlyTargets: monthlyTargets,
        totalTarget: totalTarget
    };
}

// Example usage:
let result = calculateTotalTarget('2024-01-01', '2024-03-31', 5220);
console.log(result);
