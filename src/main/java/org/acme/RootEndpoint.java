package org.acme;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

@Path("/")
public class RootEndpoint {

    @GET
    public Response hello() {
        return Response.ok("Hello Quinoa!").build();
    }
}
