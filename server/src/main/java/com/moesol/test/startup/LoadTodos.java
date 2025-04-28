package com.moesol.test.startup;

import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.moesol.test.entity.Todo;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@ApplicationScoped
public class LoadTodos {
  private static final Logger log = Logger.getLogger(LoadTodos.class.getName());

  public void load() throws IOException {
    long existingCount = Todo.count();
    if (existingCount > 0) {
      log.info("Todo table already populated with " + existingCount + " entries. Skipping fetch.");
      return;
    }

    OkHttpClient client = new OkHttpClient();

    Request request = new Request.Builder().url("https://jsonplaceholder.typicode.com/todos").build();

    try (Response response = client.newCall(request).execute()) {
      if (!response.isSuccessful()) {
        log.severe("Failed to fetch todo from API: " + response);
        return;
      }
      String body = response.body().string();
      ObjectMapper mapper = new ObjectMapper()
          .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

      List<Todo> todos = mapper.readValue(body, new TypeReference<List<Todo>>() {
      });
      log.log(Level.INFO,
          String.format("Successfully fetched %d todos from API. Starting persistence.", todos.size()));

      for (Todo todo : todos) {
        todo.id = null;
        try {
          persistTodo(todo);
        } catch (Exception e) {
          log.log(Level.SEVERE, "failed to save " + todo.title, e);
          return;
        }
      }
    } catch (IOException e) {
      log.severe("Error importing " + e.getMessage());
      return;
    }
    existingCount = Todo.count();
    System.err.println("Inserted " + existingCount + " posts into SQLite.");
  }

  @Transactional
  void persistTodo(Todo todo) {
    Todo.persist(todo);
    log.info("Persisted " + todo.title);
  }
}
