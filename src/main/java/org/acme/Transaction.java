package org.acme;
/*
Class Transaction has all method for CRUD operation
This class has relationship one-to-many with class category.
This class get the Foreign key from Category class
@JoinColumn(name = "category_id")
 */
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@Entity
@Table(name="Transactions")
public class Transaction extends PanacheEntity {
    public String description;
    public BigDecimal amount;

    @Temporal(TemporalType.DATE)
    public Date date;

    public Integer type;

    @ManyToOne
    @JoinColumn(name = "category_id")
    public Category category;


    /*
    Create a Transaction using the method persist
    Parameter: Transaction Object
     */
    public static void addTransaction(Transaction transaction) {
        transaction.persist();
    }

    /*
    Find and return a specific transaction using the method find()
    Parameter: Long id
    Return a Transaction Object
     */
    public static Transaction findById(Long id) {
        return find("id", id).firstResult();
    }
    /*
    Getting All transactions using the method listAll()
    Return a list of Transaction Objects
     */
    public static List<Transaction> listAllTransactions() {
        return listAll();
    }

    /*
    Update a specific Transaction using the persist() method
    Parameters: six parameters
    This method use the findById() method to retrieve the transaction that
    we want to update.
     */
    public static void updateTransaction(Long id, String newDescription, BigDecimal newAmount, Date newDate, Integer newType, Category newCategory) {
        Transaction transaction = findById(id);
        if (transaction != null) {
            transaction.description = newDescription;
            transaction.amount = newAmount;
            transaction.date = newDate;
            transaction.type = newType;
            transaction.category = newCategory;
            transaction.persist();
        }
    }

    /*
    Delete a specific transaction using the method findById() to find the
    transaction and the delete() method to delete the transaction found
     */
    public static void deleteTransaction(Long id) {
        Transaction transaction = findById(id);
        if (transaction != null) {
            transaction.delete();
        }
    }
}