import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {

  const pokemonId = useSignal(1);
  const pokemonImage = useSignal(false);

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;
    if (pokemonId.value + value > 151) return;

    pokemonId.value += value;
  });

  const changePokemonImage = $(() => {
    pokemonImage.value = !pokemonImage.value;
  });

  return (
    // pokemonId devuelve el valor de la señal
    // pokemonId.value devuelve el valor de la señal

    // ambos son equivalentes ya que si no se le especifica un método a la señal, devuelve el .value
    <>

      <span class="text-2xl">Buscador Simple</span>
      {/* <span class="text-9xl">{pokemonId}</span> */}

      <PokemonImage id={pokemonId.value} backImage={pokemonImage.value} />


      <div class="mt-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={() => changePokemonImage()} class="btn btn-primary">Voltear</button>
      </div>


    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Esta es mi primera aplicación con Qwik',
    },
  ],
};
