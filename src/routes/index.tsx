import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {

  const pokemonId = useSignal(1); // primitive, string, number, boolean
  //const pokemonId2 = useStore(); // array



  return (
    // pokemonId devuelve el valor de la señal
    // pokemonId.value devuelve el valor de la señal

    // ambos son equivalentes ya que si no se le especifica un método a la señal, devuelve el .value
    <>

      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{pokemonId}</span>

      {/* TODO: craer imagen */}

      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`}
        alt="Pokemon sprite"
        style={{ width: '200px' }} />


      <div class="mt-2">
        <button onClick$={() => pokemonId.value--} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => pokemonId.value++} class="btn btn-primary">Siguiente</button>
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
