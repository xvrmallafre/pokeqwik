import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number;
    size?: number;
    backImage: boolean;
}

export const PokemonImage = component$(({ id, size = 200, backImage = false }: Props) => {
    const imageLoaded = useSignal(false);
    useTask$(({ track }) => {
        track(() => id);

        imageLoaded.value = false;
    });



    const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    const image = backImage ? `${url}back/${id}.png` : `${url}${id}.png`;

    return (
        <div
            class="flex items-center justify-center"
            style={{ width: `${size}px`, height: `${size}px` }} >
            {!imageLoaded.value && <span>Cargando...</span>}
            <img
                src={image}
                alt="Pokemon sprite"
                style={{ width: `${size}px` }}
                onLoad$={() => imageLoaded.value = true}
                class={{
                    'hidden': !imageLoaded.value,
                    'brightness-0': true
                }}
            />
        </div>
    )
});