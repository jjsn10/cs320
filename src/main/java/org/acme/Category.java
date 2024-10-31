package org.acme;

/*
Class Category has all method for CRUD operation

 */

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

    /*
    Create a category object and save to the database is the method persist()
    Parameter: (Category) category
     */
    public static void addCategory(Category category) {
        category.persist();
    }

    /*
    Find a specific Category Object using the method find().
    Parameter: Long id
    Return: Category Object
     */
    public static Category findById(Long id) {
        return find("id", id).firstResult();
    }

    /*
    get a list of all categories using the method listAll().
    Return a list of Category Objects
     */
    public static List<Category> listAllCategories() {
        return listAll();
    }

    /*
    Update Category using persist method
    Parameters: id, newName, newDescription, newColor
     */
    public static void updateCategory(Long id, String newName,String newDescription, String newColor) {
        Category category = findById(id);
        if (category != null) {
            category.name = newName;
            category.description = newDescription;
            category.color = newColor;
            category.persist();
        }
    }

    /*
    Delete a Category using delete() method
    Parameters: id
     */
    public static void deleteCategory(Long id) {
        Category category = findById(id);
        if (category != null) {
            category.delete();
        }
    }
}