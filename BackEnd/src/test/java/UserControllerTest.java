import org.junit.Before;
import org.junit.Test;

import org.junit.runner.RunWith;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import schedule.App;
import schedule.repositories.AdminRepo;
import schedule.repositories.BusinessRepo;
import schedule.repositories.CustomerRepo;
import schedule.repositories.ServiceRepo;
import schedule.repositories.UserRepo;
import schedule.repositories.WorkerRepo;
import schedule.web.UserController;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.boot.configurationprocessor.json.JSONObject;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes= App.class)
@RunWith(SpringRunner.class)
@ActiveProfiles(profiles = "test")
public class UserControllerTest
{
    @LocalServerPort
    private int port;

    @Autowired
    private UserController controller;
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired 
    private UserRepo userRepo;
    @Autowired
    private AdminRepo adminRepo;
    @Autowired
    private WorkerRepo workerRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private BusinessRepo businessRepo;
    @Autowired
    private ServiceRepo serviceRepo;

    @Test
    public void contextLoads() throws Exception
    {
        Assertions.assertNotNull(controller);
    }

    @Before
    public void clean_database()
    {
        workerRepo.deleteAll();
        adminRepo.deleteAll();
        businessRepo.deleteAll();
        serviceRepo.deleteAll();
        customerRepo.deleteAll();
        userRepo.deleteAll();
    }

    @Test
    public void createNewUser_ValidValues_CREATED() throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject user = new JSONObject(
        "{" +
        "    \"name\" : \"Michael\"," +
        "    \"username\" : \"Moose\"," +
        "    \"password\" : \"password\"," +
        "    \"contactNumber\" : 123," +
        "    \"email\" : \"person@gmail.com\"" +
        "}");
        HttpEntity<String> request = new HttpEntity<>(user.toString(), headers);
        String url = "http://localhost:" + port + "/api/user";
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity(url, request, String.class);
        boolean created = responseEntityStr.getStatusCode().equals(HttpStatus.CREATED);
        String message = responseEntityStr.getBody();
        System.out.println(port);
        Assertions.assertTrue(created,message);
    }

    @Test
    public void createNewUser_MissingName_BAD_REQUEST() throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject user = new JSONObject(
        "{" +
        "    \"username\" : \"Moose\"," +
        "    \"password\" : \"password\"," +
        "    \"contactNumber\" : 123," +
        "    \"email\" : \"person@gmail.com\"" +
        "}");
        HttpEntity<String> request = new HttpEntity<>(user.toString(), headers);
        String url = "http://localhost:" + port + "/api/user";
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity(url, request, String.class);
        boolean notCreated = responseEntityStr.getStatusCode().equals(HttpStatus.BAD_REQUEST);
        String message = responseEntityStr.getBody();
        System.out.println(port);
        Assertions.assertTrue(notCreated,message);
    }

    @Test
    public void createNewUser_MissingUsername_BAD_REQUEST() throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject user = new JSONObject(
            "{" +
            "    \"name\" : \"Michael\"," +
            "    \"password\" : \"password\"," +
            "    \"contactNumber\" : 123," +
            "    \"email\" : \"person@gmail.com\"" +
            "}");
        HttpEntity<String> request = new HttpEntity<>(user.toString(), headers);
        String url = "http://localhost:" + port + "/api/user";
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity(url, request, String.class);
        boolean notCreated = responseEntityStr.getStatusCode().equals(HttpStatus.BAD_REQUEST);
        String message = responseEntityStr.getBody();
        System.out.println(port);
        Assertions.assertTrue(notCreated,message);
    }

    @Test
    public void createNewUser_MissingPassword_BAD_REQUEST() throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject user = new JSONObject(
            "{" +
            "    \"name\" : \"Michael\"," +
            "    \"username\" : \"Moose\"," +
            "    \"contactNumber\" : 123," +
            "    \"email\" : \"person@gmail.com\"" +
            "}");
        HttpEntity<String> request = new HttpEntity<>(user.toString(), headers);
        String url = "http://localhost:" + port + "/api/user";
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity(url, request, String.class);
        boolean notCreated = responseEntityStr.getStatusCode().equals(HttpStatus.BAD_REQUEST);
        String message = responseEntityStr.getBody();
        System.out.println(port);
        Assertions.assertTrue(notCreated,message);
    }

    @Test
    public void createNewUser_MissingEmail_BAD_REQUEST() throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject user = new JSONObject(
        "{" +
        "    \"name\" : \"Michael\"," +
        "    \"username\" : \"Moose\"," +
        "    \"password\" : \"password\"," +
        "    \"contactNumber\" : 123" +
        "}");
        HttpEntity<String> request = new HttpEntity<>(user.toString(), headers);
        String url = "http://localhost:" + port + "/api/user";
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity(url, request, String.class);
        boolean notCreated = responseEntityStr.getStatusCode().equals(HttpStatus.BAD_REQUEST);
        String message = responseEntityStr.getBody();
        System.out.println(port);
        Assertions.assertTrue(notCreated,message);
    }

    @Test
    public void createNewUser_InvalidEmailNoAtSymbol_BAD_REQUEST() throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject user = new JSONObject(
            "{" +
            "    \"name\" : \"Michael\"," +
            "    \"username\" : \"Moose\"," +
            "    \"password\" : \"password\"," +
            "    \"contactNumber\" : 123," +
            "    \"email\" : \"persongmail.com\"" +
            "}");
        HttpEntity<String> request = new HttpEntity<>(user.toString(), headers);
        String url = "http://localhost:" + port + "/api/user";
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity(url, request, String.class);
        boolean notCreated = responseEntityStr.getStatusCode().equals(HttpStatus.BAD_REQUEST);
        String message = responseEntityStr.getBody();
        System.out.println(port);
        Assertions.assertTrue(notCreated,message);
    }

    @Test
    public void createNewUser_InvalidEmailOnlyAtSymbol_BAD_REQUEST() throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject user = new JSONObject(
            "{" +
            "    \"name\" : \"Michael\"," +
            "    \"username\" : \"Moose\"," +
            "    \"password\" : \"password\"," +
            "    \"contactNumber\" : 123," +
            "    \"email\" : \"@\"" +
            "}");
        HttpEntity<String> request = new HttpEntity<>(user.toString(), headers);
        String url = "http://localhost:" + port + "/api/user";
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity(url, request, String.class);
        boolean notCreated = responseEntityStr.getStatusCode().equals(HttpStatus.BAD_REQUEST);
        String message = responseEntityStr.getBody();
        System.out.println(port);
        Assertions.assertTrue(notCreated,message);
    }
}
