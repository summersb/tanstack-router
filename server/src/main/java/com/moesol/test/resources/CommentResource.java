package com.moesol.test.resources;

import java.util.logging.Logger;

import com.moesol.test.entity.Comment;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.core.UriInfo;

@Path("/comment")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CommentResource {
  Logger log = Logger.getLogger(CommentResource.class.getName());

  @Context
  UriInfo uriInfo;

  @GET
  @Path("/{id}")
  @Transactional
  public Comment getById(Long id) {
    return Comment.findById(id);
  }

  @POST
  @Transactional
  public Response createComment(Comment comment) {
    Comment.persist(comment);

    if (comment.id == null) {
      throw new WebApplicationException("User ID not set after persist", Status.INTERNAL_SERVER_ERROR);
    }

    log.info("Saved  " + comment);
    var uri = uriInfo.getAbsolutePathBuilder()
        .path(String.valueOf(comment.id))
        .build();
    return Response.created(uri).build();
  }

  @DELETE
  @Transactional
  @Path("/{id}")
  public Response deleteComment(@PathParam("id") Long id) {
    Comment.deleteById(id);
    return Response.noContent().build();
  }
}
