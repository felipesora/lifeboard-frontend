import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DadoMensal {
  name: string;
  valor: number;
}

interface GastosMensaisGraficoProps {
  dados: DadoMensal[];
}

const GastosMensaisGrafico = ({ dados }: GastosMensaisGraficoProps) => {
  return (
    <ResponsiveContainer width="95%" height={300}>
      <AreaChart
        width={500}
        height={400}
        data={dados}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="linear" dataKey="valor" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default GastosMensaisGrafico;

