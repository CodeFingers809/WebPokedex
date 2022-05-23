//Home page

/* eslint-disable @next/next/no-img-element */
//imports
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home({pokeData, colors }) {
  //pageno
  const [pageno, setPageno] = useState(44);
  //array of pokemons sliced from pokedata depending on the pageno
  const [pokeArr, setPokeArr] = useState(pokeData.slice(0, 20));
  //change pageno

  //updating pokearr when pageno changes
  useEffect(() => {
    setPokeArr(pokeData.slice(pageno * 20, pageno * 20 + 20));
  }, [pageno, pokeData]);
  //previous page
  const handlePrev=()=>{
    if(pageno!==0){
      setPageno(pageno-1)
    }
    return
  }
  const handleNext=()=>{
    if(pageno!==44){
      setPageno(pageno+1)
    }
    return
  }
  return (
    <div>
      {/* layout wrapper */}
      <Layout title={"WebPokedex"}>
        {/* container */}
        <div className="flex flex-wrap mt-12 justify-center mx-auto">
          {/* filling in all the cards */}
          {pokeArr.map((pokeman, index) => {
            return (
              <div
                className="bg-gray-200 m-4 rounded p-4"
                key={pokeman.name.english}
              >
                <Link href={"/pokemons/" + pokeman.id}>
                  <a>
                    <img
                      src={pokeman.image.hires}
                      alt=""
                      width={100}
                      height={100}
                      className="mb-4 h-[152px] w-[152px] sm:h-[202px] sm:w-[202px] m-6"
                    />
                    <div className="flex justify-center">
                      {/* making badges for the pokemon types */}
                      {pokeman.type.map((type, typeIndex) => {
                        return (
                          <span
                            key={typeIndex}
                            className="text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                            style={{
                              backgroundColor:
                                colors[type.toLowerCase()] + "27",
                              color: colors[type.toLowerCase()],
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
                  </a>
                </Link>
              </div>
            );
          })}
          {/* pagination */}
        </div>
        <div className="flex justify-between pb-8">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none disabled:bg-gray-600" onClick={handlePrev} disabled={pageno===0?true:false}>
            Previous
          </button>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none disabled:bg-gray-600"  onClick={handleNext} disabled={pageno===44?true:false}>Next</button>
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