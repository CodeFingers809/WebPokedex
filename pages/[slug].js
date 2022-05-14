/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const Slug = (props) => {
  const data = props.data;
  return (
    <div>
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
                return (
                  <div
                    key={type.type.name}
                    className={`p-2 bg-type-${type.type.name}/30 border-2 border-type-${type.type.name} text-type-${type.type.name} rounded-full px-4 m-2 mt-0`}
                  >
                    {type.type.name}
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
  return { props: { data: parsed } };
}

export default Slug;
