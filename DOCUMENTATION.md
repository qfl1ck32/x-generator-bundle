The X-way generator is a command-line utility which enables you to write code the X-way with incredible speed bost provided by the X-way Bundle by Kaviar.

## Install

```
npm i -g @kaviar/x
x
```

## x:project

We regard a project as a set of microservices that interract together. For example, these microservices can be the main api, an admin frontend, a web frontend, etc.

## x:microservice

We can create a microservice (currently only works with backend only) using the **X-way** recommended folder structure.

## x:bundle

By default, you have the `AppBundle` for your microservice. This command is used to create additional bundle. Please note that bundle should be created when you plan on re-using that existing logic outside App. If your bundle depends on AppBundle, it would be advisable to avoid creating it.

## x:collection

Create database collections, and creates the possibility of creating GraphQL entities and models with it.

## x:collection-link

Create links using Nova between multiple **existing** collections

## x:event

Creates an event class with ability to specify the schema for it

## x:exception

Creates an exception class with ability to specify the schema for it

## x:listener

Creates an event listener, and can be useful for creating listeners for a certain collections

## x:fixtures

Sets up a nice infrastructure for running your fixtures. (Dummy data)

## x:validator

Creates a validator including type definitions that can be used together with `validator` bundle.

## x:server-route

Creates an entry point to listen for server routes (non-GraphQL) requests to your API.

## x:service

Creates a service class and ability to specify multiple methods (incl. tests)

## x:graphql-entity

Creates the GraphQL entity with ability to specify the input model for it.

## x:graphql-input

Creates a GraphQL input with ability to enter the schema for it, and also create an actual validatable model.

## x:graphql-mutation

Creates a GraphQL mutation with ability to specify input, security checks and other useful things.

## x:graphql-query

Creates a GraphQL mutation with ability to specify input, security checks and other useful things.

## x:graphql-crud

Creates a CRUD module for a specified Collection. Note that the CRUD is going to be generic for data inserts, updates and filters. The advantage is that it works for a prototype and you can make it better later.
