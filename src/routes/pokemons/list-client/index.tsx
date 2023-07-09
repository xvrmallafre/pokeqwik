import { $, component$, useOnDocument, useStore, useTask$ } from '@builder.io/qwik';
import { useLocation, type DocumentHead } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

interface PokemonPageState {
    currentPage: number;
    isLoading: boolean;
    pokemons: SmallPokemon[];
}

export default component$(() => {

    const pokemonState = useStore<PokemonPageState>({
        currentPage: 0,
        isLoading: false,
        pokemons: []
    });

    //useTask$ se ejecuta una primera vez del lado del servidor
    //y luego se ejecuta del lado del cliente

    //useVisibleTask$ se ejecuta siempre del lado del cliente

    useTask$(async({ track }) => {
        track( () => pokemonState.currentPage );

        const pokemons = await getSmallPokemons( pokemonState.currentPage * 10, 30 );
        pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

        pokemonState.isLoading = false;
    });

    useOnDocument('scroll', $(() => {
        const maxScroll = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;

        if (((currentScroll + 100) >= maxScroll) && !pokemonState.isLoading) {
            pokemonState.isLoading = true;
            pokemonState.currentPage++;
        }
    }));
    
    return (
    <>
        <div class="flex flex-col">
            <span class="my-5 text-4xl"> Status</span>
            <span>Página actual: { pokemonState.currentPage }</span>
            <span>Está cargando: </span>
        </div>

        <div class="mt-10">
            {/* <button class="btn btn-primary mr-2"
            onClick$={ () => pokemonState.currentPage-- } >
                Anteriores
            </button> */}
            <button class="btn btn-primary mr-2"
                onClick$={ () => pokemonState.currentPage++ }>
                Mostrar más
            </button>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
            {
                pokemonState.pokemons.map(({ name, id }) => (
                    <div key={name} class="m-2 flex flex-col justify-center items-center">
                        <PokemonImage id={ id } />
                        <span class="capitalize">{ name }</span>
                    </div>
                ))
            }
        </div>
    </>
    );
});

export const head: DocumentHead = {
    title: 'Client List | PokeQwik',
    meta: [
        {
            name: 'description',
            content: 'Página de client side rendering',
        },
    ],
};