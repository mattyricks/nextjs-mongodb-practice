import Head from 'next/head';
import clientPromise from '../lib/mongodb';
import 'tailwindcss/tailwind.css';

export default function Home({ movies }) {
  console.log(movies);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" />
      </Head>

      <div className="container mx-auto">
        <h1 className="text-5xl">Testing Tailwind, MongoDB, and NextJS</h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap my-16">
          {movies &&
            movies.map((movie) => (
              <>
                <div className="w-1/4 p-16 border border-black">
                  <h2>{movie.title}</h2>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db('sample_mflix');

  const data = await db
    .collection('movies')
    .find({ year: 2011 })
    .limit(20)
    .toArray();
  const movies = JSON.parse(JSON.stringify(data));

  return {
    props: { movies },
  };
}
