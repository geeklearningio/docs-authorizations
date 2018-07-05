# Getting Started

## Installation

First add the main package to your project:
```
Install-package GeekLearning.Authorization.AspNetCore
```

Then you will need to add a bunch of tables to your Database:


## Configuration


Then you need to register services provided by the library:
```csharp
   services.Configure<ModelBuilderOptions>(Configuration.GetSection("AuthorizationsModelBuilderOptions"));
   services.AddAclAuthorizationHandlers();
```

Then you can start using it in your regular Authorization Policies:
```charp
            services.AddAuthorization(options =>
            {
                options.AddPolicy("myapp-backoffice-user", builder =>
                {
                    builder
                        .RequireAuthenticatedUser()
                        .RequireRightUnderScope(Domain.Security.RightNames.Write, Domain.Aggregates.MyApp.RootScopeName);
                });

                options.AddPolicy("myapp-backoffice-admin", builder =>
                {
                    builder
                        .RequireAuthenticatedUser()
                        .RequireRightOnScope(Domain.Security.RightNames.Administer, Domain.Aggregates.MyApp.RootScopeName);
                });

                options.AddPolicy("myapp-api-user", builder =>
                {
                    builder.AddAuthenticationSchemes("Bearer")
                           .RequireAuthenticatedUser()
                           .RequireRightUnderScope(Domain.Security.RightNames.Read, Domain.Aggregates.MyApp.RootScopeName);
                });
            });
```