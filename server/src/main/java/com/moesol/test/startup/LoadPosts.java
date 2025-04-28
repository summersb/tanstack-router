package com.moesol.test.startup;

import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.moesol.test.entity.Post;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@ApplicationScoped
public class LoadPosts {
  private static final Logger log = Logger.getLogger(LoadPosts.class.getName());

  public void load() throws IOException {
    long existingCount = Post.count();
    if (existingCount > 0) {
      log.info("Post table already populated with " + existingCount + " entries. Skipping fetch.");
      return;
    }

    OkHttpClient client = new OkHttpClient();

    Request request = new Request.Builder().url("https://jsonplaceholder.typicode.com/posts").build();

    try (Response response = client.newCall(request).execute()) {
      if (!response.isSuccessful()) {
        log.severe("Failed to fetch post from API: " + response);
        return;
      }
      String body = response.body().string();
      ObjectMapper mapper = new ObjectMapper()
          .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

      List<Post> posts = mapper.readValue(body, new TypeReference<List<Post>>() {
      });
      log.log(Level.INFO,
          String.format("Successfully fetched %d posts from API. Starting persistence.", posts.size()));

      for (Post post : posts) {
        post.id = null;
        try {
          persistPost(post);
        } catch (Exception e) {
          log.log(Level.SEVERE, "failed to save " + post.title, e);
          return;
        }
      }
    } catch (IOException e) {
      log.severe("Error importing " + e.getMessage());
      return;
    }
    existingCount = Post.count();
    System.err.println("Inserted " + existingCount + " posts into SQLite.");
  }

  @Transactional
  void persistPost(Post post) {
    Post.persist(post);
    log.info("Persisted " + post.title);
  }
}
