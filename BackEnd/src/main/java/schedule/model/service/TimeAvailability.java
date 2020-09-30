package schedule.model.service;

import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.hibernate.validator.constraints.Range;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Calendar;

import schedule.model.Worker;

@Entity(name = "availability")
public class TimeAvailability
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "WORKER_ID")
    private Worker worker;

    @Range(min= 0, max = 6)
    private int dayOfWeek;
    @Range(min = 0, max = 23)
    private int hour;
    @Range(min = 0, max = 59)
    private int minute;

    public Long getId()
    {        
    
        return id;
    } 

    public Long getWorkedId()
    {
        return worker.getId();
    }

    public TimeAvailability() {}

    public TimeAvailability(Long id, int day, int hour, int minute)
    {
        this.dayOfWeek = day;
        this.hour = hour;
        this.minute = minute;
        this.id= id;
    }

    public boolean isAvailable(Date date)
    {
        return true;
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