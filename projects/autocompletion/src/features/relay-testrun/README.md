# Relay Test Run

A demonstration of **Facebook's Relay** GraphQL client for React, showcasing how to fetch and display Star Wars film data using Relay's modern patterns.

## What is Relay?

Relay is Facebook's powerful GraphQL client for React that provides:

- **Declarative data fetching** with GraphQL queries
- **Automatic caching** and normalization
- **Type safety** with TypeScript integration
- **Optimistic updates** and mutations
- **Code generation** for compile-time optimizations

## Project Structure

```
relay-testrun/
├── __generated__/           # Auto-generated TypeScript types
│   ├── Film_item.graphql.ts
│   └── StarWarsQuery.graphql.ts
├── Film.tsx                 # Film component using fragments
├── StarWars.tsx            # Main component with query
└── README.md               # This file
```

## How It Works

### 1. **GraphQL Schema**

The project uses the **Star Wars GraphQL API** schema (`schema.graphql`) which provides:

- Films, People, Planets, Species, Starships, Vehicles
- Connection patterns for pagination
- Node interface for global ID resolution

### 2. **Query Component (StarWars.tsx)**

```tsx
export const StarWars = () => {
  const data = useLazyLoadQuery<StarWarsQuery>(
    graphql`
      query StarWarsQuery {
        allFilms {
          films {
            id
            ...Film_item  // Fragment spread
          }
        }
      }
    `,
    {}, // No variables needed
  );

  const films = data?.allFilms?.films?.filter((film) => film != null);

  return (
    <div>
      <h1>Star Wars Films</h1>
      {films?.map((film) => (
        <Film key={film.id} film={film} />
      ))}
    </div>
  );
};
```

**Key Concepts:**

- **`useLazyLoadQuery`**: Fetches data when component mounts
- **GraphQL query**: Declares exactly what data is needed
- **Fragment spread**: `...Film_item` includes fragment data
- **Type safety**: `StarWarsQuery` type is auto-generated

### 3. **Fragment Component (Film.tsx)**

```tsx
export const Film = (props: { film: Film_item$key }) => {
  const film = useFragment<Film_item$key>(
    graphql`
      fragment Film_item on Film {
        title
        director
      }
    `,
    props.film,
  );

  return (
    <li>
      <b>{film.title}</b>: directed by <i>{film.director}</i>
    </li>
  );
};
```

**Key Concepts:**

- **`useFragment`**: Extracts specific fields from parent data
- **Fragment definition**: `fragment Film_item on Film`
- **Type safety**: `Film_item$key` ensures correct data structure
- **Reusability**: Fragment can be used in multiple components

### 4. **Code Generation**

Relay automatically generates TypeScript types in `__generated__/`:

**StarWarsQuery.graphql.ts:**

```typescript
export type StarWarsQuery$data = {
  readonly allFilms:
    | {
        readonly films:
          | ReadonlyArray<
              | {
                  readonly id: string;
                  readonly ' $fragmentSpreads': FragmentRefs<'Film_item'>;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};
```

**Film_item.graphql.ts:**

```typescript
export type Film_item$data = {
  readonly director: string | null | undefined;
  readonly title: string | null | undefined;
  readonly ' $fragmentType': 'Film_item';
};
```

## Relay vs Other GraphQL Clients

| Feature             | Relay           | Apollo Client   | urql       |
| ------------------- | --------------- | --------------- | ---------- |
| **Code Generation** | ✅ Built-in     | ⚠️ Optional     | ❌ Manual  |
| **Caching**         | ✅ Automatic    | ✅ Configurable | ✅ Simple  |
| **Type Safety**     | ✅ Compile-time | ⚠️ Runtime      | ⚠️ Manual  |
| **Bundle Size**     | ⚠️ Larger       | ✅ Medium       | ✅ Smaller |
| **Learning Curve**  | ❌ Steep        | ✅ Moderate     | ✅ Easy    |

## Key Relay Patterns

### 1. **Colocation**

Data requirements are defined where they're used:

```tsx
// Film component defines its own data needs
const film = useFragment(
  graphql`
    fragment Film_item on Film {
      title
      director
    }
  `,
  props.film,
);
```

### 2. **Fragments**

Reusable data selections:

```tsx
// Can be used in multiple components
fragment Film_item on Film {
  title
  director
  releaseDate
}
```

### 3. **Query Composition**

Parent queries include child fragments:

```tsx
query StarWarsQuery {
  allFilms {
    films {
      id
      ...Film_item  // Includes title, director
    }
  }
}
```

### 4. **Type Safety**

Compile-time type checking:

```tsx
// TypeScript knows exactly what data is available
const film: Film_item$data = {
  title: 'A New Hope',
  director: 'George Lucas',
  // releaseDate would cause TypeScript error if not in fragment
};
```

## Build Process

Relay uses a **compiler** that:

1. **Parses** GraphQL queries and fragments
2. **Validates** against the schema
3. **Generates** TypeScript types
4. **Optimizes** queries for performance

**Commands:**

```bash
# Generate types from GraphQL
yarn relay

# Watch for changes
yarn relay --watch
```

## Performance Benefits

### 1. **Automatic Caching**

- Normalized cache by ID
- Automatic cache updates
- No manual cache management

### 2. **Query Optimization**

- Combines overlapping queries
- Eliminates duplicate fields
- Optimizes network requests

### 3. **Bundle Optimization**

- Tree-shaking unused fields
- Dead code elimination
- Smaller bundle sizes

## Real-World Usage

This pattern scales to complex applications:

```tsx
// User profile with nested data
query UserProfileQuery($userId: ID!) {
  user(id: $userId) {
    ...UserHeader_item
    ...UserStats_item
    posts(first: 10) {
      edges {
        node {
          ...PostCard_item
        }
      }
    }
  }
}
```

## Getting Started

1. **Install Relay:**

   ```bash
   yarn add react-relay relay-runtime
   yarn add -D relay-compiler
   ```

2. **Configure Relay:**

   ```json
   // relay.config.json
   {
     "src": "./src",
     "schema": "./schema.graphql",
     "language": "typescript"
   }
   ```

3. **Write GraphQL:**

   ```tsx
   const data = useLazyLoadQuery(graphql`query MyQuery { ... }`, variables);
   ```

4. **Generate Types:**
   ```bash
   yarn relay
   ```

Relay provides a powerful, type-safe way to work with GraphQL in React applications, with automatic optimizations and excellent developer experience!
