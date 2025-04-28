package com.moesol.test.resources;

import java.util.logging.Logger;

import com.moesol.test.entity.Post;

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

@Path("/post")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PostResource {
  Logger log = Logger.getLogger(PostResource.class.getName());

  @Context
  UriInfo uriInfo;

  @GET
  @Path("/{id}")
  @Transactional
  public Post getById(Long id) {
    return Post.findById(id);
  }

  @POST
  @Transactional
  public Response createPost(Post post) {
    Post.persist(post);

    if (post.id == null) {
      throw new WebApplicationException("User ID not set after persist", Status.INTERNAL_SERVER_ERROR);
    }

    log.info("Saved  " + post);
    var uri = uriInfo.getAbsolutePathBuilder()
        .path(String.valueOf(post.id))
        .build();
    return Response.created(uri).build();
  }

  @DELETE
  @Transactional
  @Path("/{id}")
  public Response deletePost(@PathParam("id") Long id) {
    Post.deleteById(id);
    return Response.noContent().build();
  }
}
