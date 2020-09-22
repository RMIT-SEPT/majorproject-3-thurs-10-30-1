package schedule.model.service;

import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

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

    public Long getId()
    {
        return id;
    } 

    public Long getWorkedId()
    {
        return worker.getId();
    }

    public TimeAvailability() {}

    public TimeAvailability(Long id)
    {
        this.id= id;
    }

    public boolean isAvailable(Date date)
    {
        return true;
    }
}