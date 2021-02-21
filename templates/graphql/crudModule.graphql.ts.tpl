export default /* GraphQL */`
  type Query {
    {{ crudName }}FindOne(query: QueryInput): {{ entityType }}
    {{ crudName }}Find(query: QueryInput): [{{ entityType }}]!
    {{ crudName }}Count(filters: EJSON!): Int!
  }

  type Mutation {
    {{ crudName }}InsertOne(document: EJSON!): {{ entityType }}
    {{ crudName }}UpdateOne(_id: ObjectId!, modifier: EJSON!): {{ entityType }}!
    {{ crudName }}DeleteOne(_id: ObjectId!): Boolean
  }
`