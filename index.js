import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head><title>TRIX CAR - Início</title></Head>
      <main style={{ padding: "2rem" }}>
        <h1 style={{ color: "#004080" }}>TRIX CAR MOBILIDADE URBANA</h1>
        <p>Bem-vindo ao nosso sistema de transparência e mobilidade urbana.</p>
        <ul>
          <li><Link href="/consulta">🔍 Consulta por Município</Link></li>
          <li><Link href="/relatorios">📊 Relatórios</Link></li>
          <li><Link href="/sobre">📘 Sobre</Link></li>
        </ul>
      </main>
    </>
  );
}