import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { Film } from "./Film";
import type { StarWarsQuery } from "./__generated__/StarWarsQuery.graphql";

export const StarWars = () => {
    const data = useLazyLoadQuery<StarWarsQuery>(
        graphql`
          query StarWarsQuery {
            allFilms {
              films {
                id
                ...Film_item
              }
            }
          }
        `,
        {}
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