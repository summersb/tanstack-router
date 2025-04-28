package com.moesol.test.startup;

import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.moesol.test.entity.Comment;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@ApplicationScoped
public class LoadComments {
  private static final Logger log = Logger.getLogger(LoadComments.class.getName());

  public void load() throws IOException {
    long existingCount = Comment.count();
    if (existingCount > 0) {
      log.info("Comment table already populated with " + existingCount + " entries. Skipping fetch.");
      return;
    }

    OkHttpClient client = new OkHttpClient();

    Request request = new Request.Builder().url("https://jsonplaceholder.typicode.com/comments").build();

    try (Response response = client.newCall(request).execute()) {
      if (!response.isSuccessful()) {
        log.severe("Failed to fetch comment from API: " + response);
        return;
      }
      String body = response.body().string();
      ObjectMapper mapper = new ObjectMapper()
          .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

      List<Comment> comments = mapper.readValue(body, new TypeReference<List<Comment>>() {
      });
      log.log(Level.INFO,
          String.format("Successfully fetched %d comments from API. Starting persistence.", comments.size()));

      for (Comment comment : comments) {
        comment.id = null;
        try {
          persistComment(comment);
        } catch (Exception e) {
          log.log(Level.SEVERE, "failed to save " + comment.name, e);
          return;
        }
      }
    } catch (IOException e) {
      log.severe("Error importing " + e.getMessage());
      return;
    }
    existingCount = Comment.count();
    System.err.println("Inserted " + existingCount + " comments into SQLite.");
  }

  @Transactional
  void persistComment(Comment comments) {
    Comment.persist(comments);
    log.info("Persisted " + comments.name);
  }
}
