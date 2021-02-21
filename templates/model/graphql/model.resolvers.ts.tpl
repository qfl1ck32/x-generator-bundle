export default {
  resolvers: {
    {{ modelClass }}: {
      
    },
    {{# each localModels }}
      {{ name }}: {},
    {{/ each }}
    {{# each enums }}
      {{ className }}: {
        {{# each elements }}
          {{ field }}: "{{ value }}",
        {{/ each }}
      },
    {{/ each }}
  }
}