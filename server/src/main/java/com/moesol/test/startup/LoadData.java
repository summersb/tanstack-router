package com.moesol.test.startup;

import java.io.IOException;
import java.util.logging.Logger;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;

@ApplicationScoped
public class LoadData {

  private static final Logger log = Logger.getLogger(LoadData.class.getName());

  @Inject
  private LoadUsers loadUsers;
  @Inject
  private LoadTodos loadTodos;
  @Inject
  private LoadPosts loadPosts;
  @Inject
  private LoadComments loadComments;

  public void onStart(@Observes StartupEvent ev) throws IOException {
    loadUsers.load();
    loadPosts.load();
    loadTodos.load();
    loadComments.load();
  }

}
