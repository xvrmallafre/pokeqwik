import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return (
        <>
            <h1>Demo Path</h1>
        </>
    );
});

export const head: DocumentHead = {
    title: 'Demo folder path',
    meta: [
        {
            name: 'Demo folder path',
            content: 'Qwik demo folder path',
        },
    ],
};

