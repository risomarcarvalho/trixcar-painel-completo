PK     J��ZBd�|  |     pages/consulta.js
import { useState } from 'react';
import Head from 'next/head';

const municipios = [
  { nome: "Juazeiro do Norte", codigo: "2307304" },
  { nome: "Crato", codigo: "2304001" },
  { nome: "Fortaleza", codigo: "2304407" },
  { nome: "Barbalha", codigo: "2301900" },
  { nome: "São Paulo", codigo: "3550308" },
  { nome: "Brasília", codigo: "5300108" },
  { nome: "Salvador", codigo: "2927408" },
  { nome: "Rio de Janeiro", codigo: "3304557" }
];

export default function Consulta() {
  const [filtro, setFiltro] = useState('');
  const [codigoIbge, setCodigoIbge] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const municipiosFiltrados = municipios.filter((m) =>
    m.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const consultar = async () => {
    if (!codigoIbge) {
      setErro("Selecione um município válido.");
      return;
    }
    setLoading(true);
    setErro(null);
    setResultados([]);
    try {
      const res = await fetch(
        `https://api.portaldatransparencia.gov.br/api-de-dados/transferencias-voluntarias?codigoIbge=${codigoIbge}&pagina=1`,
        {
          headers: {
            Accept: 'application/json',
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJYVmJyU1Vmd2tyVDZSTllvVEVPV3pXWjd1Z2tkTlBFR1NaZ3o5WTFrM1BKZE5WNHZ4eHJVN3ZGU3BsQTA4cFEyWEVJcmVBd196T2dWZzN4OCIsImlhdCI6MTc0NTI2MDgzMn0.8vOm7yNI3YO7BOHSPXYDMXXIKqAb_75SLdytNk0azw4',
          },
        }
      );
      if (!res.ok) throw new Error('Erro ao buscar dados');
      const data = await res.json();
      const conv = data.map((item) => ({
        numero: item.numeroConvenio,
        orgao: item.orgaoSuperior?.nome,
        objeto: item.objeto,
        valor: item.valorGlobal,
        fonte: item.tipoProposta,
        status: item.situacao,
      }));
      setResultados(conv);
    } catch (err) {
      setErro('Erro na consulta à API. Tente novamente.');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Consulta por Município (Busca)</title>
      </Head>
      <main style={{ padding: '2rem' }}>
        <h2>🔍 Consulta por Município (com Autocomplete)</h2>
        <input
          type="text"
          placeholder="Digite o nome do município"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem', width: '300px' }}
        />
        <select
          onChange={(e) => setCodigoIbge(e.target.value)}
          style={{ marginRight: '1rem' }}
        >
          <option value="">Selecione</option>
          {municipiosFiltrados.map((m, i) => (
            <option key={i} value={m.codigo}>
              {m.nome}
            </option>
          ))}
        </select>
        <button onClick={consultar} disabled={loading}>
          Consultar
        </button>

        {loading && <p>🔄 Carregando...</p>}
        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        {resultados.length > 0 && (
          <table
            border="1"
            cellPadding="6"
            style={{ marginTop: '1rem', borderCollapse: 'collapse' }}
          >
            <thead style={{ background: '#eee' }}>
              <tr>
                <th>Nº Convênio</th>
                <th>Órgão</th>
                <th>Objeto</th>
                <th>Valor (R$)</th>
                <th>Fonte</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.numero}</td>
                  <td>{item.orgao}</td>
                  <td>{item.objeto}</td>
                  <td>
                    {Number(item.valor).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td>{item.fonte}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
PK     J��ZBd�|  |             �    pages/consulta.jsPK      ?   �    