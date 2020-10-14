package schedule.model;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

public class TimeAvailabilityRequest {
    @Range(min = 1, max = 7)
    private int day;
    @Range(min = 0, max = 23)
    private int hour;
    @Range(min = 0, max = 59)
    private int minute;
    @Range(min = 0)
    private int length;

    @NotNull
    private Long workerId;

    public TimeAvailabilityRequest()
    {

    }

    public int getDay()
    {
        return day;
    } 

    public int getHour()
    {
        return hour;
    }

    public int getMinute()
    {
        return minute;
    }

    public int getLength()
    {
        return length;
    }

    public Long getWorkerId()
    {
        return workerId;
    }
}
