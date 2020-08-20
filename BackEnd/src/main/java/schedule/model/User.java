package schedule.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank(message = "Person name is required")
    private String name;

    @NotBlank(message = "Username is required")
    private String userName;

    @NotBlank(message = "password is required")
    private String password;

    private long contactNumber;

    @NotBlank(message = "email s required")
    @Email
    private String email;

    @NotBlank(message = "accType is required")
    private char accountType;

    @OneToMany(mappedBy = "customer")
    private List<Booking> customerBookings;

    @OneToMany(mappedBy = "worker")
    private List<Booking> workerBookings;

    public User(Long userId, String name,  String userName,  String password, long contactNumber,  String email, char accountType) {
        this.userId = userId;
        this.name = name;
        this.userName = userName;
        this.password = password;
        this.contactNumber = contactNumber;
        this.email = email;
        this.accountType = accountType;
    }

    public User() {

    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public long getContactNumber() {
        return contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public char getAccountType() {
        return accountType;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setContactNumber(long contactNumber) {
        this.contactNumber = contactNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAccountType(char accountType) {
        this.accountType = accountType;
    }

    public List<Booking> getCustomerBookings() {
        return customerBookings;
    }

    public List<Booking> getWorkerBookings() {
        return workerBookings;
    }
}
