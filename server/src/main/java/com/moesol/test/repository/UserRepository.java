package com.moesol.test.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import com.moesol.test.entity.User;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {

    public User findByName(String name) {
        return find("name", name).firstResult();
    }
}