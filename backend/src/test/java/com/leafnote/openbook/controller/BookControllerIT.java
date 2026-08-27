package com.leafnote.openbook.controller;

import org.json.JSONException;
import org.jspecify.annotations.NonNull;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookControllerIT {

    @LocalServerPort
    private int port;

    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();

    @Test
    public void givenBookId_whenGetBookById_thenReturnJsonBookData() throws JSONException {

        HttpEntity<@NonNull String> entity = new HttpEntity<>(null, headers);

        ResponseEntity<@NonNull String> response = restTemplate.exchange(
                createURLWithPort("/api/books/1"),
                HttpMethod.GET, entity, String.class);

        String expected = "{\"data\":{\"id\":1,\"title\":\"sites\",\"author\":\"devops\"}}";
        System.out.println(response.getBody());

        JSONAssert.assertEquals(expected, response.getBody(),JSONCompareMode.LENIENT);
    }

    private String createURLWithPort(String uri) {
        return "http://localhost:" + port + uri;
    }

}
