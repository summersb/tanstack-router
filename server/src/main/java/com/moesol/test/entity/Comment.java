package com.moesol.test.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Comment extends PanacheEntity {
  public Long postId;
  public String name;
  public String email;
  public String body;
}
