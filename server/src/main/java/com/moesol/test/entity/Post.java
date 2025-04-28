package com.moesol.test.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Post extends PanacheEntity {
  public String title;
  public String body;
}
