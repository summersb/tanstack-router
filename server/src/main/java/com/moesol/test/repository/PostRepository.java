package com.moesol.test.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import com.moesol.test.entity.Post;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PostRepository implements PanacheRepository<Post> {

    public Post findByTitle(String title) {
        return find("title", title).firstResult();
    }
}