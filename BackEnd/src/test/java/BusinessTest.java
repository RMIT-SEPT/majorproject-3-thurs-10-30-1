

import groovy.json.JsonException;
import org.junit.Test;

import org.junit.runner.RunWith;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import schedule.App;
import schedule.web.BusinessController;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.boot.configurationprocessor.json.JSONObject;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes= App.class)
@RunWith(SpringRunner.class)
@ActiveProfiles(profiles = "test")
public class BusinessTest {

    @LocalServerPort
	private int port;

    @Autowired
    private BusinessController controller;
    @Autowired
	private TestRestTemplate restTemplate;

    @Test
    public void contextLoads() throws Exception {
        Assertions.assertNotNull(controller);
    }
    
    @Test
	public void greetingShouldReturnDefaultMessage() throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject business = new JSONObject();
        try {
            business.put("name",  "Bobby Coffee");
        }
        catch (JsonException e)
        {
            e.printStackTrace();
        }
        HttpEntity<String> request = new HttpEntity<>(business.toString(), headers);
        ResponseEntity<String> responseEntityStr = restTemplate.postForEntity("http://localhost:" + port + "/api/business", request, String.class);
        boolean created = responseEntityStr.getStatusCode().equals(HttpStatus.CREATED);
        String message = responseEntityStr.getBody();
        System.out.println(port);
        Assertions.assertTrue(created,message);
	}
}
