package com.moesol.test.resources;

import java.util.List;
import java.util.logging.Logger;

import com.moesol.test.entity.User;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsersResource {
  Logger log = Logger.getLogger(UsersResource.class.getName());

  @Context
  UriInfo uriInfo;

  @GET
  public List<User> getAll() {
    return User.listAll();
  }
}
