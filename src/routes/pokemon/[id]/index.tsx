import { component$ } from '@builder.io/qwik';
import { useLocation, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {

    const id = Number(params.id);

    if (isNaN(id)) {
        redirect(301, '/')
    }

    if (id < 1 || id > 151) {
        redirect(301, '/')
    }

    return id;
});

export default component$(() => {
    const pokemonId = usePokemonId();

    return (
        <>
            <span class="text-5xl">
                Pokemon: {pokemonId}
            </span>
            <PokemonImage id={pokemonId.value} />
        </>
    );
});