import { useNavigate } from 'react-router-dom';
import {
  NotFoundContainer,
  NotFoundImage,
  NotFoundTitle,
  NotFoundSubtitle,
  NotFoundText,
  NotFoundButton
} from './styles';

import IconeNotFound from '../../assets/images/not-found.png';

const NotFound = () => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/controle-financeiro');
    }
  };

  return (
    <NotFoundContainer>
      <NotFoundImage src={IconeNotFound} alt="Imagem de Não Encontrado" />
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundSubtitle>Página não encontrada</NotFoundSubtitle>
      <NotFoundText>Ops! A página que você procura não existe.</NotFoundText>
      <NotFoundButton onClick={handleVoltar}>Voltar</NotFoundButton>
    </NotFoundContainer>
  );
};

export default NotFound;