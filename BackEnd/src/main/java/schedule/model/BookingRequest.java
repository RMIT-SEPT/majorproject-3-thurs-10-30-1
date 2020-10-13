package schedule.model;

import java.util.*;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.*;

public class BookingRequest {

    @NotNull(message = "the field (\"id\" : long) is required")
    private Long id;
    @NotNull(message = "the field (\"date\" : yyyy-mm-dd HH:mm) is required")
    @JsonFormat(pattern ="yyyy-mm-dd HH:mm")
    private Date date;
    @NotNull(message = "the field (\"customerId\" : long) is required")
    private Long customerId; 

    public BookingRequest() {}
    public BookingRequest(Long id, Date date, Long customerId)
    {
        this.date = date;
        this.id = id;
        this.customerId = customerId;
    }
    
    public Long getId()
    {
        return id;
    }

    public Long getCustomerId()
    {
        return customerId;
    }

    public Date getDate()
    {
        return date; 
    }
}
