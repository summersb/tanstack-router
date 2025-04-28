package com.moesol.test.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Todo extends PanacheEntity {
  public Long userId;
  public String title;
  public Boolean completed;
}
