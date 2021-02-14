export default /* GraphQL */ `
  type {{ modelClass }} {
    {{ graphqlContents }}
  }
  {{# each enums }}
    enum {{ className }} {
      {{# each elements }}
        {{ field }}
      {{/ each }}
    }
  {{/ each }}
`
