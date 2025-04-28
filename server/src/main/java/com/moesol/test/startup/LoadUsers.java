package com.moesol.test.startup;

import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.moesol.test.entity.User;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@ApplicationScoped
public class LoadUsers {
  private static final Logger log = Logger.getLogger(LoadUsers.class.getName());

  public void load() throws IOException {
    long existingCount = User.count();
    if (existingCount > 0) {
      log.info("User table already populated with " + existingCount + " entries. Skipping fetch.");
      return;
    }

    OkHttpClient client = new OkHttpClient();

    Request request = new Request.Builder().url("https://jsonplaceholder.typicode.com/users").build();

    try (Response response = client.newCall(request).execute()) {
      if (!response.isSuccessful()) {
        log.severe("Failed to fetch users from API: " + response);
        return;
      }
      String body = response.body().string();
      ObjectMapper mapper = new ObjectMapper()
          .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

      List<User> users = mapper.readValue(body, new TypeReference<List<User>>() {
      });
      log.log(Level.INFO,
          String.format("Successfully fetched %d users from API. Starting persistence.", users.size()));

      for (User user : users) {
        user.id = null;
        try {
          persistUser(user);
        } catch (Exception e) {
          log.log(Level.SEVERE, "failed to save " + user.name, e);
          return;
        }
      }
    } catch (IOException e) {
      log.severe("Error importing " + e.getMessage());
      return;
    }
    existingCount = User.count();
    System.err.println("Inserted " + existingCount + " users into SQLite.");

  }

  @Transactional
  void persistUser(User user) {
    User.persist(user);
    log.info("Persisted " + user.name);
  }
}
