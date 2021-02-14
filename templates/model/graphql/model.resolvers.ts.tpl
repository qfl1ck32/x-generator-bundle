export default {
  resolvers: {
    {{ modelClass }}: {
      
    },
    {{# each enums }}
      {{ className }}: {
        {{# each elements }}
          {{ field }}: "{{ value }}",
        {{/ each }}
      },
    {{/ each }}
  }
}