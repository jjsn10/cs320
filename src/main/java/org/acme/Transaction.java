package org.acme;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    // Create
    public static void addTransaction(Transaction transaction) {
        transaction.persist();
    }

    // Read
    public static Transaction findById(Long id) {
        return find("id", id).firstResult();
    }

    public static List<Transaction> listAllTransactions() {
        return listAll();
    }

    // Update
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

    // Delete
    public static void deleteTransaction(Long id) {
        Transaction transaction = findById(id);
        if (transaction != null) {
            transaction.delete();
        }
    }
}