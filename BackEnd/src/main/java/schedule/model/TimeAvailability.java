package schedule.model;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.validator.constraints.*;

@Entity(name = "availability")
public class TimeAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "WORKER_ID")
    private Worker worker;

    @Range(min = 1, max = 7)
    private int dayOfWeek;
    @Range(min = 0, max = 23)
    private int hour;
    @Range(min = 0, max = 59)
    private int minute;
    @Range(min = 0)
    private int length;

    public Long getId() {

        return id;
    }

    public Long getWorkedId() {
        return worker.getId();
    }

    public TimeAvailability() {
    }

    public TimeAvailability(Long id, int day, int hour, int minute, int length) {
        this.dayOfWeek = day;
        this.hour = hour;
        this.minute = minute;
        this.id = id;
        this.length = length;
    }

    public boolean isAvailable(Date date) {
        boolean value = true;
        Calendar c = Calendar.getInstance();
        c.setTimeZone(TimeZone.getTimeZone("GMT"));
        c.setTime(date);
        value &= c.get(Calendar.DAY_OF_WEEK) == dayOfWeek;
        value &= c.get(Calendar.HOUR_OF_DAY) == hour;
        value &= c.get(Calendar.MINUTE) == minute;
        return value;
    }

    public int getDay()
    {
        return dayOfWeek;
    }

    public int getHour()
    {
        return hour;
    }

    public int getMinute()
    {
        return minute;
    }
}