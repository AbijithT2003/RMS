package com.tarento.recruitment_service.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI recruitmentOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8080");
        devServer.setDescription("Development Server");
        
        Server prodServer = new Server();
        prodServer.setUrl("https://api.recruitment.com");
        prodServer.setDescription("Production Server");
        
        Contact contact = new Contact();
        contact.setEmail("support@recruitment.com");
        contact.setName("Recruitment Team");
        contact.setUrl("https://www.recruitment.com");
        
        License mitLicense = new License()
                .name("MIT License")
                .url("https://choosealicense.com/licenses/mit/");
        
        Info info = new Info()
                .title("Recruitment Management System API")
                .version("1.0.0")
                .contact(contact)
                .description("This API exposes endpoints for managing recruitment processes, " +
                        "including jobs, applications, interviews, and candidate management.")
                .termsOfService("https://www.recruitment.com/terms")
                .license(mitLicense);
        
        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer, prodServer));
    }
}
