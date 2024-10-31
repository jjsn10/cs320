package org.acme;

/*
API requests for Category and Transaction Tables
Classes Category and Transaction have all method from CRUD that are used
in This class.
*/

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

import jakarta.transaction.Transactional;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GreetingResource {

    //End Point for testing purpose
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String tracker() {
        return "Hello RESTEasy";
    }

    //Create a category record using addCategory() method from class Category
    @POST
    @Path("/categories")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createCategory(Category category) {
            Category.addCategory(category);
            //userName.persist();
            //return "Category " + category.name + "! has been  stored in the database.";
            return Response.status(Response.Status.CREATED).entity(category).build();

    }
    /*
    Retrieve all categories using getAllCategories() method from class Category.
    Return List of Category Objects
     */
    @GET
    @Path("/categories")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Category> getAllCategories() {
        return Category.listAllCategories();
    }

    /*
    Get Category by id using getCategoryById() method from class Category.
    Return a Category Object
     */
    @GET
    @Path("/categories/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getCategoryById(@PathParam("id") Long id) {
        Category category = Category.findById(id);
        if (category == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(category).build();
    }

    /*
    Update a Category record using updateCategory method from class Category
    Parameters: id and Category object
    */
    @PUT
    @Path("/categories/{id}")
    @Transactional
    public Response updateCategory(@PathParam("id") Long id, Category updatedCategory) {
        Category category = Category.findById(id);
        if (category == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        category.name = updatedCategory.name;
        category.description = updatedCategory.description;
        category.color = updatedCategory.color;
        category.persist();
        return Response.ok(category).build();
    }

    /*
    Delete a Category record using delete() method from class Category
    Parameter: id
     */
    @DELETE
    @Path("/categories/{id}")
    @Transactional
    public Response deleteCategory(@PathParam("id") Long id) {
        Category category = Category.findById(id);
        if (category == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        category.delete();
        return Response.noContent().build();
    }

    /*
    API Endpoints for Transactions
     */

    /*
    Create a transaction object using addTransaction method from class Transaction
     */
    @POST
    @Path("/transactions")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createTransaction(Transaction transaction) {
        Transaction.addTransaction(transaction);
        return Response.status(Response.Status.CREATED).entity(transaction).build();
    }

    /*
    Get all Transactions using getAllTransactions() method from class Transaction.
    Return a List of Transaction Objects
     */
    @GET
    @Path("/transactions")
    public List<Transaction> getAllTransactions() {
        return Transaction.listAllTransactions();
    }

    /*
    Get a Transaction using getTransactionById() method from class Transaction.
    Return a Transaction Object.
    Parameter: id
     */
    @GET
    @Path("/transactions/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getTransactionById(@PathParam("id") Long id) {
        Transaction transaction = Transaction.findById(id);
        if (transaction == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(transaction).build();
    }

    /*
    Update a Transaction Object using updateTransaction method from class Transaction.
    Parameter: id
     */
    @PUT
    @Path("/transactions/{id}")
    @Transactional
    public Response updateTransaction(@PathParam("id") Long id, Transaction updatedTransaction) {
        Transaction transaction = Transaction.findById(id);
        if (transaction == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        transaction.description = updatedTransaction.description;
        transaction.amount = updatedTransaction.amount;
        transaction.date = updatedTransaction.date;
        transaction.type = updatedTransaction.type;
        transaction.category = updatedTransaction.category;
        transaction.persist();
        return Response.ok(transaction).build();
    }

    /*
    Delete a Transaction using deleteTransaction method from class Transaction.
    Parameter: id
     */
    @DELETE
    @Path("/transactions/{id}")
    @Transactional
    public Response deleteTransaction(@PathParam("id") Long id) {
        Transaction transaction = Transaction.findById(id);
        if (transaction == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        transaction.delete();
        return Response.noContent().build();
    }



}
