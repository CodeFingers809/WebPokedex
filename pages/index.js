/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  //pokemon api data
  const [pokemons, setPokemons] = useState({
    count: 1126,
    next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
    previous: null,
    results: [
      {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
      },
      {
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon/2/",
      },
      {
        name: "venusaur",
        url: "https://pokeapi.co/api/v2/pokemon/3/",
      },
      {
        name: "charmander",
        url: "https://pokeapi.co/api/v2/pokemon/4/",
      },
      {
        name: "charmeleon",
        url: "https://pokeapi.co/api/v2/pokemon/5/",
      },
      {
        name: "charizard",
        url: "https://pokeapi.co/api/v2/pokemon/6/",
      },
      {
        name: "squirtle",
        url: "https://pokeapi.co/api/v2/pokemon/7/",
      },
      {
        name: "wartortle",
        url: "https://pokeapi.co/api/v2/pokemon/8/",
      },
      {
        name: "blastoise",
        url: "https://pokeapi.co/api/v2/pokemon/9/",
      },
      {
        name: "caterpie",
        url: "https://pokeapi.co/api/v2/pokemon/10/",
      },
      {
        name: "metapod",
        url: "https://pokeapi.co/api/v2/pokemon/11/",
      },
      {
        name: "butterfree",
        url: "https://pokeapi.co/api/v2/pokemon/12/",
      },
      {
        name: "weedle",
        url: "https://pokeapi.co/api/v2/pokemon/13/",
      },
      {
        name: "kakuna",
        url: "https://pokeapi.co/api/v2/pokemon/14/",
      },
      {
        name: "beedrill",
        url: "https://pokeapi.co/api/v2/pokemon/15/",
      },
      {
        name: "pidgey",
        url: "https://pokeapi.co/api/v2/pokemon/16/",
      },
      {
        name: "pidgeotto",
        url: "https://pokeapi.co/api/v2/pokemon/17/",
      },
      {
        name: "pidgeot",
        url: "https://pokeapi.co/api/v2/pokemon/18/",
      },
      {
        name: "rattata",
        url: "https://pokeapi.co/api/v2/pokemon/19/",
      },
      {
        name: "raticate",
        url: "https://pokeapi.co/api/v2/pokemon/20/",
      },
    ],
  });
  //page no.
  const [pageno, setPageno] = useState(0);
  //updating the pokemon data when page is changed
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${pageno * 20}&limit=20`)
      .then((response) => {
        setPokemons(response.data);
        // console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, [pageno]);
  //dummy image if image is not found
  function addDefaultSrc(ev) {
    ev.target.src =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/0.png";
  }
  //handle inp change
  function handleChange(ev) {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126`)
      .then((response) => {
        const searchArr = [];
        const temp = response.data;
        temp.results.forEach((pokemon) => {
          if (ev.target.value.length === 0) {
            axios
              .get(
                `https://pokeapi.co/api/v2/pokemon/?offset=${
                  pageno * 20
                }&limit=20`
              )
              .then((response) => {
                setPokemons(response.data);
              })
              .catch((err) => console.log(err));
            return;
          }
          if (
            ev.target.value &&
            pokemon.name.toLowerCase().includes(ev.target.value.toLowerCase())
          ) {
            searchArr.push(pokemon);
          }
        });
        temp.results = searchArr;
        setPokemons(temp);
      })
      .catch((err) => console.log(err));
  }
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
        <title>WebPokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex align-middle justify-center p-4 mb-4">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-poke-yellow"
              name="pokemonName"
              id="pokemonName"
              type="text"
              placeholder="Search..."
              onChange={handleChange}
            ></input>
          </div>

          <div className="flex flex-wrap -m-4">
            {pokemons.results.length === 0 ? (
              <p>Sorry no Pokemon found</p>
            ) : (
              pokemons.results.map((el, i) => {
                return (
                  <div key={el.name} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <Link href={`/${el.name}`}>
                      <a className="block relative rounded-lg overflow-hidden hover:cursor-pointer hover:shadow-xl hover:shadow-poke-blue/50 p-4  bg-poke-blue group">
                        <img
                          alt="ecommerce"
                          className="object-cover object-center w-full block"
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${el.url
                            .replace("https://pokeapi.co/api/v2/pokemon/", "")
                            .replace("/", "")}.png`}
                          height="400px"
                          onError={addDefaultSrc}
                        />

                        <div className="mt-4">
                          <h2 className="group-hover:underline text-white text-center title-font text-lg font-medium uppercase">
                            {el.name}
                          </h2>
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      <div className="flex align-middle justify-between px-10 pb-16">
        <button
          onClick={() => {
            pageno - 1 !== -1 ? setPageno(pageno - 1) : pageno;
          }}
          className={`rounded  p-4 text-white ${
            pageno === 0
              ? "bg-gray-500 hover:cursor-default"
              : "bg-poke-blue hover:underline hover:cursor-pointer"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => {
            pageno + 1 !== 56 ? setPageno(pageno + 1) : pageno;
          }}
          className="hover:underline rounded bg-poke-blue p-4 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
