package com.moesol.test.resources;

import com.moesol.test.entity.Comment;
import java.util.List;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/posts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CommentsResource {

  @GET
  public List<Comment> list() {
    return Comment.listAll();
  }
}
