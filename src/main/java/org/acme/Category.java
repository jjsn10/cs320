package org.acme;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import java.util.List;

@Entity
@Table(name="Categories")
public class Category extends PanacheEntity {
    public String name;

    @Column(length = 100)
    public String description;

    @Column(length = 12)
    public String color;

    // Create
    public static void addCategory(Category category) {
        category.persist();
    }

    // Read
    public static Category findById(Long id) {
        return find("id", id).firstResult();
    }

    public static List<Category> listAllCategories() {
        return listAll();
    }

    // Update
    public static void updateCategory(Long id, String newName,String newDescription, String newColor) {
        Category category = findById(id);
        if (category != null) {
            category.name = newName;
            category.description = newDescription;
            category.color = newColor;
            category.persist();
        }
    }

    // Delete
    public static void deleteCategory(Long id) {
        Category category = findById(id);
        if (category != null) {
            category.delete();
        }
    }
}