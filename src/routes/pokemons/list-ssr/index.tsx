import { component$, useComputed$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset') || '0');
    
    if (isNaN(offset)) redirect(301, pathname);
    if (offset < 0) redirect(301, pathname);
    if (offset > 140) redirect(301, pathname);

    return await getSmallPokemons(offset);
});

export default component$(() => {

    const pokemons = usePokemonList();
    const location = useLocation();

    const currentOffset = useComputed$<number>(() => {
    
        const offsetString = location.url.searchParams.get('offset');
        return Number(offsetString) || 0;

    });

    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-4xl"> Status</span>
                <span>Offset: { currentOffset }</span>
                <span>Is loading page: { location.isNavigating ? 'Si' : 'No' }</span>
            </div>

            <div class="mt-10">
                <Link
                    href={`/pokemons/list-ssr?offset=${ currentOffset.value - 10 }`} 
                    class="btn btn-primary mr-2">
                    Anteriores
                </Link>
                <Link 
                    href={`/pokemons/list-ssr?offset=${ currentOffset.value + 10 }`}
                    class="btn btn-primary mr-2">
                    Siguientes
                </Link>
            </div>

            <div class="grid grid-cols-6 mt-5">
                {
                    pokemons.value.map(({ name, id }) => (
                        <div key={name} class="m-2 flex flex-col justify-center items-center">
                            <PokemonImage id={ id } />
                            <span class="capitalize">{ name }</span>
                        </div>
                    ))
                }
            </div>
        </>
    )
});

export const head: DocumentHead = {
    title: 'SSR List | PokeQwik',
    meta: [
        {
            name: 'description',
            content: 'Página de server side rendering',
        },
    ],
};