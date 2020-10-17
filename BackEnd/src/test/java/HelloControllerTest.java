
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import schedule.microservice.UserMicro;
import schedule.web.UserController;

@SpringBootTest
class HelloControllerTest {

    UserMicro userMicro = new UserMicro();
    UserController userController = new UserController();



    @Test
    void getUserNotInDataBase()
    {

    }

    @Test
    void getUserInDatabase()
    {

    }

}
