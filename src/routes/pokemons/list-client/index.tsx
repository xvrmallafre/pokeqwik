import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return <>
        Hello world - List Client
    </>
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