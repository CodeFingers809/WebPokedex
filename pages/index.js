//Home page

/* eslint-disable @next/next/no-img-element */
//imports
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home({ pokeData, colors }) {
  //pageno
  const [pageno, setPageno] = useState(0);
  //array of pokemons sliced from pokedata depending on the pageno
  const [pokeArr, setPokeArr] = useState(pokeData.slice(0, 20));
  // state of input
  const [input, setInput] = useState("");
  // search results array
  const [searchResults, setSearchResults] = useState(pokeData);
  // filtered search results array
  const [filteredArr, setFilteredArr] = useState(pokeData);
  const [filter, setFilter] = useState("All");
  //updating pokearr when pageno changes
  useEffect(() => {
    setPokeArr(searchResults.slice(pageno * 20, pageno * 20 + 20));
  }, [pageno, searchResults]);
  useEffect(() => {
    setPokeArr(filteredArr.slice(pageno * 20, pageno * 20 + 20));
  }, [pageno, filteredArr]);
  //previous page
  const handlePrev = () => {
    if (pageno !== 0) {
      setPageno(pageno - 1);
    }
    return;
  };
  const handleNext = () => {
    if (pageno !== 44) {
      setPageno(pageno + 1);
    }
    return;
  };
  const handleFilterChange = (e) => {
    const selFilter = e.target.value;
    setFilter(e.target.value);
    if (selFilter === "All") {
      if(input.length===0) setFilteredArr(pokeData)
      else setFilteredArr(pokeData.filter(pokeman=>{
        return pokeman.name.english.toLowerCase().includes(input.toLowerCase())
      }))
      return;
    }
    let temp = [];
    if (input.length !== 0) {
      let temp2 = pokeData.filter((pokeman) => {
        return pokeman.name.english.toLowerCase().includes(input.toLowerCase());
      });
      temp = temp2.filter((pokeman) => {
        return pokeman.type.includes(selFilter);
      });
    } else {
      temp = pokeData.filter((pokeman) => {
        return pokeman.type.includes(selFilter);
      });
    }
    setPageno(0);
    setFilteredArr(temp);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.length === 0) {
      if(filter==="All")
      setSearchResults(pokeData);
      else setSearchResults(pokeData.filter(pokeman=>{
        return pokeman.type.includes(filter)
      }));
      return;
    }
    let temp = [];
    if (filter !== "All") {
      let temp2 = pokeData.filter((pokeman) => {
        return pokeman.type.includes(filter);
      });
      temp = temp2.filter((pokeman) => {
        return (
          pokeman.name.english.toLowerCase().includes(value.toLowerCase())
        );
      });
    } else {
      temp = pokeData.filter((pokeman) => {
        return pokeman.name.english.toLowerCase().includes(value.toLowerCase());
      });
    }
    setPageno(0);
    setSearchResults(temp);
  };
  return (
    <div>
      {/* layout wrapper */}
      <Layout title={"WebPokedex"}>
        <div className="flex justify-center mt-12">
          <input
            type="text"
            id="searchInp"
            value={input}
            onChange={handleChange}
            className="mx-8 w-full sm:w-3/4 bg-gray-100 px-6 py-2 rounded border border-poke-yellow outline-none"
            placeholder="Search"
          />
        </div>
        <div className="flex px-8 sm:px-16 py-4 items-center">
          <label
            htmlFor="types"
            className="block mr-6 font-medium text-gray-900 text-lg sm:text-2xl"
          >
            Type
          </label>
          <select
            id="types"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 sm:p-2.5"
            value={filter}
            onChange={handleFilterChange}
            defaultValue="All"
          >
            <option value="All" >
              All
            </option>
            <option value="Normal">Normal</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Electric">Electric</option>
            <option value="Grass">Grass</option>
            <option value="Ice">Ice</option>
            <option value="Fighting">Fighting</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
            <option value="Flying">Flying</option>
            <option value="Psychic">Psychic</option>
            <option value="Bug">Bug</option>
            <option value="Rock">Rock</option>
            <option value="Ghost">Ghost</option>
            <option value="Dragon">Dragon</option>
            <option value="Dark">Dark</option>
            <option value="Steel">Steel</option>
            <option value="Fairy">Fairy</option>
          </select>
        </div>
        {/* container */}
        <div className="flex flex-wrap justify-center mx-auto">
          {/* filling in all the cards */}
          {pokeArr.map((pokeman, index) => {
            return (
              <Link href={"/pokemons/" + pokeman.id} key={pokeman.name.english}>
                <a>
                  <div className="bg-gray-200 m-4 rounded p-4">
                    <img
                      src={pokeman.image.hires}
                      alt=""
                      width={100}
                      height={100}
                      className="mb-4 h-[152px] w-[152px] sm:h-[202px] sm:w-[202px] m-6"
                      loading="lazy"
                    />
                    <div className="flex justify-center">
                      {/* making badges for the pokemon types */}
                      {pokeman.type.map((type, typeIndex) => {
                        return (
                          <span
                            key={typeIndex}
                            className="text-sm font-medium mr-2 px-2.5 py-0.5 rounded text-white"
                            style={{
                              backgroundColor: colors[type.toLowerCase()],
                            }}
                          >
                            {type}
                          </span>
                        );
                      })}
                    </div>
                    <p className="capitalize text-gray-800 text-center sm:text-2xl text-lg">
                      <span className="font-bold mr-2">{pokeman.id}.</span>
                      {pokeman.name.english}
                    </p>
                  </div>
                </a>
              </Link>
            );
          })}
          {/* pagination */}
        </div>
        <div className="flex justify-between pb-8">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 mb-2 focus:outline-none disabled:bg-gray-600"
            onClick={handlePrev}
            disabled={pageno === 0 ? true : false}
          >
            Previous
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 mb-2 focus:outline-none disabled:bg-gray-600"
            onClick={handleNext}
            disabled={searchResults.length / 20 - pageno < 1 ? true : false}
          >
            Next
          </button>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://api.pikaserve.xyz/pokemon/all");
    const data = await res.json();
    return {
      props: {
        pokeData: data,
        colors: {
          normal: "#A8A77A",
          fire: "#EE8130",
          water: "#6390F0",
          electric: "#F7D02C",
          grass: "#7AC74C",
          ice: "#96D9D6",
          fighting: "#C22E28",
          poison: "#A33EA1",
          ground: "#E2BF65",
          flying: "#A98FF3",
          psychic: "#F95587",
          bug: "#A6B91A",
          rock: "#B6A136",
          ghost: "#735797",
          dragon: "#6F35FC",
          dark: "#705746",
          steel: "#B7B7CE",
          fairy: "#D685AD",
        },
      },
    };
  } catch (err) {
    console.log(err);
  }
}
