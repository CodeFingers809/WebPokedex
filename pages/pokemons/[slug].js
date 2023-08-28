//pokemon details page

/* eslint-disable @next/next/no-img-element */
//imports
import React from "react";
import Layout from "../../components/Layout";
import pokeData from "../../pokedex.json";

const Slug = ({ pokeman, colors }) => {
  if (pokeman.message) {
    return (
      <div className="flex items-center justify-center h-screen font-bold text-4xl">
        No such pokemon exists
      </div>
    );
  }
  return (
    <div>
      <Layout title={pokeman.name.english}>
        <div className="flex flex-wrap mt-6">
          {/* top section with img and details */}
          <div className="flex flex-wrap p-8 justify-center md:flex-nowrap">
            {/* left image */}
            <img
              src={pokeman.image.hires}
              alt=""
              className="sm:mr-20 my-auto"
              width={400}
              height={400}
            />
            {/* right container */}
            <div className="flex flex-col">
              {/* name */}
              <h1 className="font-semibold text-4xl w-full">
                <span className="font-semibold text-4xl mr-4">
                  #{pokeman.id}
                </span>
                {pokeman.name.english}
              </h1>
              {/* other langs */}
              <p className="mb-6">
                <span className="mr-2 text-sm">{pokeman.name.french}</span>
                &#8226;
                <span className="mx-2 text-sm">{pokeman.name.chinese}</span>
                &#8226;
                <span className="mx-2 text-sm">{pokeman.name.japanese}</span>
              </p>
              {/* species */}
              <p>
                <span className="font-semibold text-lg mr-2">Species:</span>
                <span className="text-lg">{pokeman.species}</span>
              </p>
              {/* desc */}
              <p>{pokeman.description}</p>
              {/* height weight */}
              <p>
                <span className="font-semibold mr-2">Height:</span>
                <span>{pokeman.profile.height}</span>
              </p>
              <p>
                <span className="font-semibold mr-2">Weight:</span>
                <span>{pokeman.profile.weight}</span>
              </p>
              {/* badges */}
              <div className="mt-4 mb-4">
                {/* making badges for the pokemon types */}
                {pokeman.type.map((type, typeIndex) => {
                  return (
                    <span
                      key={typeIndex}
                      className="font-semibold tracking-wide mr-2 px-5 py-2 rounded text-lg sm:text-xl text-white"
                      style={{
                        backgroundColor: colors[type.toLowerCase()],
                      }}
                    >
                      {type}
                    </span>
                  );
                })}
              </div>
              {/* stats */}
              <div>
                {/* all stats */}
                {pokeman.base
                  ? Object.keys(pokeman.base).map((stat, index) => {
                      let statValue = pokeman.base[stat];
                      let statPercentFactor = 0;
                      let statColor;
                      switch (stat) {
                        case "HP":
                          statPercentFactor = 2.55;
                          statColor = "#da4343";
                          break;
                        case "Attack":
                          statPercentFactor = 1.81;
                          statColor = "#f38d45";
                          break;
                        case "Defense":
                          statPercentFactor = 2.3;
                          statColor = "#f3d14a";
                          break;
                        case "Sp. Attack":
                          statPercentFactor = 1.73;
                          statColor = "#547fe4";
                          break;
                        case "Sp. Defense":
                          statPercentFactor = 2.3;
                          statColor = "#84df57";
                          break;
                        case "Speed":
                          statPercentFactor = 2.0;
                          statColor = "#f75887";
                          break;
                      }
                      return (
                        <div key={index} className="m-1">
                          <div className="flex justify-between">
                            <p className="font-semibold text-lg">{stat}</p>
                            <p>{pokeman.base[stat]}</p>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full"
                              style={{
                                width: `${statValue / statPercentFactor}%`,
                                backgroundColor: statColor,
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
          {/* bottom section */}
          {/* <div>
            <p className="font-semibold text-4xl">Evolution</p>
            
          </div> */}
        </div>
      </Layout>
    </div>
  );
};

// props
export async function getServerSideProps({ query }) {
  let pokeman = pokeData[parseInt(query.slug) - 1];
  return {
    props: {
      pokeman,
      colors: {
        // ["Normal", "Fire", "Water", "Electric", "Grass", "Ice",
        //        "Fighting", "Poison", "Ground", "Flying", "Psychic",
        //        "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"]
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
}

export default Slug;
