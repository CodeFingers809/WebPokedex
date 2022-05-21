/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React from "react";

const Slug = (props) => {
  const data = props.data;
  return (
    <div>
      <Head>
        <meta name="title" content="WebPokedex" />
        <meta
          name="description"
          content="WebPokedex is an online pokedex which contains information of all pokemons in the anime."
        />
        <meta
          name="keywords"
          content="pokemon, pokedex, online pokedex, pokemon info, pokemons, web pokedex, popkedex online"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Ayush Bohra" />
        <title>{props.slug.toUpperCase()}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={data.sprites["other"]["official-artwork"].front_default}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900 uppercase">
              {data.name}
            </h1>
            <div className="mb-8 leading-relaxed">
              HEIGHT:{" " + data.height}
              <br />
              WEIGHT:{" " + data.weight}
              <br />
              BASE XP:{" " + data.base_experience}
              <br />
              {data.stats.map((stat) => {
                return (
                  <div key={stat.stat.name} className="uppercase">
                    {stat.stat.name}:{" " + stat.base_stat}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center">
              {data.types.map((type, i) => {
                const dType = type.type.name;
                return (
                  <div
                    key={type.type.name}
                    className="p-2 border-2 rounded-full px-4 m-2 mt-0"
                    style={{
                      backgroundColor: props.styles[dType]+"21",
                      borderColor: props.styles[dType]+"4B",
                      color: props.styles[dType],
                    }}
                  >
                    {type.type.name.toUpperCase()}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/" + slug);
  const parsed = await data.json();

  // Pass data to the page via props
  return {
    props: {
      data: parsed,
      slug,
      styles: {
        bug: "#234B2C",
        dark: "#040706",
        dragon: "#448B95",
        electric: "#E4E22B",
        fairy: "#EA1369",
        fighting: "#994024",
        fire: "#AB1F23",
        flying: "#93B2C7",
        ghost: "#33336B",
        grass: "#147B3D",
        ground: "#A9702C",
        ice: "#86D1F5",
        normal: "#755259",
        poison: "#9380A8",
        psychic: "#F81C91",
        rock: "#AEA6A5",
        steel: "#44BC94",
        water: "#1552E2",
      },
    },
  };
}

export default Slug;
