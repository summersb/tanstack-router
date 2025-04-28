package com.moesol.test.resources;

import java.util.List;
import java.util.logging.Logger;

import com.moesol.test.entity.User;

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

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
  Logger log = Logger.getLogger(UserResource.class.getName());

  @Context
  UriInfo uriInfo;

  @GET
  @Path("/{id}")
  public User getById(@PathParam("id") Long id) {
    User u = User.findById(id);
    if (u != null) {
      return u;
    }
    throw new WebApplicationException(Status.NOT_FOUND);
  }

  @POST
  @Transactional
  public Response createUser(User u) {
    User.persist(u);

    if (u.id == null) {
      throw new WebApplicationException("User ID not set after persist", Status.INTERNAL_SERVER_ERROR);
    }

    log.info("Saved  " + u);
    var uri = uriInfo.getAbsolutePathBuilder()
        .path(String.valueOf(u.id))
        .build();
    return Response.created(uri).build();
  }

  @DELETE
  @Transactional
  @Path("/{id}")
  public Response deleteUser(@PathParam("id") Long id) {
    User.deleteById(id);
    return Response.noContent().build();
  }
}
