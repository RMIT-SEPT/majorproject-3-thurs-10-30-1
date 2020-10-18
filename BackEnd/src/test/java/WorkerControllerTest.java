import org.json.simple.JSONObject;
import org.junit.Before;
import org.junit.Test;

import org.junit.runner.RunWith;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import schedule.App;
import schedule.web.WorkerController;
import utils.Database;
import utils.JSON;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes= App.class)
@RunWith(SpringRunner.class)
@ActiveProfiles(profiles = "test")
public class WorkerControllerTest
{
    @LocalServerPort
    private int port;

    @Autowired
    private WorkerController controller;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void contextLoads() throws Exception
    {
        Assertions.assertNotNull(controller);
    }

    @Before
    public void clean_database()
    {
        Database.cleanDatabase();
    }

    private ResponseEntity<String> makeRequest(String jsonFilename, String apiURL) throws Exception
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject json = JSON.parseFromFile(JSON.getJSONFilePath(jsonFilename));
        HttpEntity<String> request = new HttpEntity<>(json.toString(), headers);
        String url = "http://localhost:" + port + apiURL;
        return restTemplate.postForEntity(url, request, String.class);
    }

    @Test
    public void createNewWorker_ValidValues_OK() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("WorkerControllerTest/createNewWorker_ValidValues_OK.json", "/api/worker");
        Assertions.assertEquals(HttpStatus.OK, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewWorker_MissingName_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("WorkerControllerTest/createNewWorker_MissingName_BAD_REQUEST.json", "/api/worker");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewWorker_MissingUsername_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("WorkerControllerTest/createNewWorker_MissingUsername_BAD_REQUEST.json", "/api/worker");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewWorker_MissingPassword_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("WorkerControllerTest/createNewWorker_MissingPassword_BAD_REQUEST.json", "/api/worker");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewWorker_MissingEmail_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("WorkerControllerTest/createNewWorker_MissingEmail_BAD_REQUEST.json", "/api/worker");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewWorker_InvalidEmailNoAtSymbol_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("WorkerControllerTest/createNewWorker_InvalidEmailNoAtSymbol_BAD_REQUEST.json", "/api/worker");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }

    @Test
    public void createNewWorker_InvalidEmailOnlyAtSymbol_BAD_REQUEST() throws Exception
    {
        ResponseEntity<String> responseEntityStr =
            makeRequest("WorkerControllerTest/createNewWorker_InvalidEmailOnlyAtSymbol_BAD_REQUEST.json", "/api/worker");
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntityStr.getStatusCode(), responseEntityStr.getBody());
    }
}
