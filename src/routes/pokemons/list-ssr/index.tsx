import { component$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$ } from '@builder.io/qwik-city';

export const usePokemonList = routeLoader$(async () => {
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=10');
    const data = await resp.json();

    return data;
});

export default component$(() => {

    const pokemonResponse = usePokemonList();

    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-4xl"> Status</span>
                <span>Current offset: xxxx</span>
                <span>Is loading page: xxxx</span>
            </div>

            <div class="mt-10">
                <Link class="btn btn-primary mr-2">Anteriores</Link>
                <Link class="btn btn-primary mr-2">Siguientes</Link>
            </div>

            <div class="grid grid-cols-6 mt-5">
                <div class="m-2 flex flex-col justify-center items-center">Pokemon</div>
                <div class="m-2 flex flex-col justify-center items-center">Pokemon</div>
                <div class="m-2 flex flex-col justify-center items-center">Pokemon</div>
                <div class="m-2 flex flex-col justify-center items-center">Pokemon</div>
                <div class="m-2 flex flex-col justify-center items-center">Pokemon</div>
                <div class="m-2 flex flex-col justify-center items-center">Pokemon</div>
                <div class="m-2 flex flex-col justify-center items-center">Pokemon</div>
                <div class="m-2 flex flex-col justify-center items-center">Pokemon</div>
                <div class="m-2 flex flex-col justify-center items-center">Pokemon</div>
                <div class="m-2 flex flex-col justify-center items-center">Pokemon</div>
            </div>

            <div>
                {/* {JSON.stringify(pokemonResponse)} */}
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