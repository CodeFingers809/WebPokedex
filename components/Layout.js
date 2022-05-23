import Head from "next/head";
import React from "react";
//layout wrapper for head
const Layout = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="title" content="WebPokedex" />
        <meta
          name="description"
          content="WebPokedex is an online Pokedex that displays the information about every pokemon. It is easy and simple to use"
        />
        <meta
          name="keywords"
          content="pokemon, pokemon data, pokedex, online, online pokedex, pokemon pokedex, pokemon info, pokedex info, online pokemon, pokeinfo"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="Ayush Bohra"></meta>
      </Head>
      <main className="min-h-screen container mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
