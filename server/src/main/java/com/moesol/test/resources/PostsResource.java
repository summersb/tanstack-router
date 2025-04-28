package com.moesol.test.resources;

import com.moesol.test.entity.Post;
import java.util.List;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/posts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PostsResource {

    @GET
    public List<Post> list() {
        return Post.listAll();
    }

    @GET
    @Path("/{id}")
    public Post getById(Long id) {
        return Post.findById(id);
    }
}
