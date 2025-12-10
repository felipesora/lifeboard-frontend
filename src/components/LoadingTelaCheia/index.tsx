import { LoadingOverlay, Spinner } from "./styles";

interface LoadingTelaCheiaProps {
  carregando: boolean;
}

const LoadingTelaCheia = ({ carregando }: LoadingTelaCheiaProps) => {
  if (!carregando) return null;

  return (
    <LoadingOverlay>
      <Spinner />
    </LoadingOverlay>
  );
};

export default LoadingTelaCheia;