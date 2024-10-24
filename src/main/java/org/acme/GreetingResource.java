package org.acme;

//import jakarta.ws.rs.GET;
//import jakarta.ws.rs.POST;
//import jakarta.ws.rs.PUT;
//import jakarta.ws.rs.DELETE;
//import jakarta.ws.rs.Path;
//import jakarta.ws.rs.PathParam;
//import jakarta.ws.rs.Produces;
//import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

import jakarta.transaction.Transactional;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String tracker() {
        return "Hello RESTEasy";
    }

    //Create
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
    // Read all
    @GET
    @Path("/categories")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Category> getAllCategories() {
        return Category.listAllCategories();
    }

    // Read by ID
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

    // Update
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

    // Delete
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

    //Transactions

    // Create
    @POST
    @Path("/transactions")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createTransaction(Transaction transaction) {
        Transaction.addTransaction(transaction);
        return Response.status(Response.Status.CREATED).entity(transaction).build();
    }

    // Read all
    @GET
    @Path("/transactions")
    public List<Transaction> getAllTransactions() {
        return Transaction.listAllTransactions();
    }

    // Read by ID
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

    // Update
    @PUT
    @Path("/transactions/{id}")
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

    // Delete
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
