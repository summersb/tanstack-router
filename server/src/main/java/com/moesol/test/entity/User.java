package com.moesol.test.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class User extends PanacheEntity {
  public String name;
  public String username;
  public String email;

  public static User findByName(String name) {
    return find("name", name).firstResult();
  }

}
