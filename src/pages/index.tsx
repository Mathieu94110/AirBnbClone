import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>AirBnbClone</title>
        <script src="https://kit.fontawesome.com/1002cebf8d.js"></script>
      </Head>
      <Header />
      <Banner />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </div>
  );
}
