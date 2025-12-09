import { useEffect, useRef, useState } from "react";
import {
  DashBoardContainer,
  DashboardMainPomodoro,
  ContainerPomodoro,
  CaixaPomodoro,
  IconeRelogio,
  TempoDisplay,
  BotoesControle,
  BotaoControle,
  BotoesTempo,
  BotaoTempo,
  ContainerPergunta,
  DetalhesPergunta,
  SumarioPergunta,
  RespostaPergunta,
  ListaResposta,
  AudioAlarme
} from "./styles";

import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import MenuLateral from "../../components/MenuLateral";
import IconePomodoro from "../../assets/images/icone-relogio-pomodoro.png";
import IconePlay from "../../assets/images/icone-play.png";
import IconePausa from "../../assets/images/icone-pausa.png";
import IconeResetar from "../../assets/images/icone-resetar.png";
import IconeSeta from "../../assets/images/icone-seta-baixo.png";
import SomAlarme from "../../assets/sounds/alerme1.wav";
import Cabecalho from "../../components/Cabecalho";

const Pomodoro = () => {
  useAuthRedirect();

  const [tempo, setTempo] = useState<number>(1500); // 25:00 em segundos
  const [tempoSelecionadoAtual, setTempoSelecionadoAtual] = useState<number>(1500);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTempo((prevTempo) => {
          if (prevTempo <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            setIsRunning(false);
            if (audioRef.current) {
              audioRef.current.play();
            }
            return 0;
          }
          return prevTempo - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatarTempo = (segundos: number) => {
    const min = String(Math.floor(segundos / 60)).padStart(2, "0");
    const sec = String(segundos % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const iniciar = () => setIsRunning(true);
  
  const pausar = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  
  const resetar = () => {
    pausar();
    setTempo(tempoSelecionadoAtual);
  };

  const mudarTempo = (segundos: number) => {
    setTempo(segundos);
    setTempoSelecionadoAtual(segundos);
    pausar();
  };

  return (
    <DashBoardContainer>
      <Cabecalho />
      <MenuLateral />
      <DashboardMainPomodoro>
        <p>Pomodoro</p>

        <ContainerPomodoro>
          <CaixaPomodoro>
            <IconeRelogio src={IconePomodoro} alt="Ícone de relógio" />
            
            <TempoDisplay tempoZerado={tempo === 0}>
              {formatarTempo(tempo)}
            </TempoDisplay>

            <BotoesControle>
              {!isRunning ? (
                <BotaoControle onClick={iniciar}>
                  <img src={IconePlay} alt="Ícone de play" />
                </BotaoControle>
              ) : (
                <BotaoControle onClick={pausar}>
                  <img src={IconePausa} alt="Ícone de pausa" />
                </BotaoControle>
              )}
              
              <BotaoControle onClick={resetar}>
                <img src={IconeResetar} alt="Ícone de resetar" />
              </BotaoControle>
            </BotoesControle>

            <BotoesTempo>
              <BotaoTempo onClick={() => mudarTempo(1500)}>
                25:00
              </BotaoTempo>

              <BotaoTempo onClick={() => mudarTempo(300)}>
                5:00
              </BotaoTempo>

              <BotaoTempo onClick={() => mudarTempo(900)}>
                15:00
              </BotaoTempo>
            </BotoesTempo>
          </CaixaPomodoro>

          <AudioAlarme src={SomAlarme} ref={audioRef} preload="auto" />

          <ContainerPergunta>
            <DetalhesPergunta>
              <SumarioPergunta>
                <span>Como funciona o método Pomodoro?</span>
                <img src={IconeSeta} alt="Ícone de uma seta para baixo" />
              </SumarioPergunta>

              <RespostaPergunta>
                <p>O método Pomodoro ajuda você a manter o foco, dividindo o trabalho em blocos de tempo.</p>
                <ListaResposta>
                  <li>25:00 – Pomodoro: Trabalhe concentrado em uma tarefa.</li>
                  <li>5:00 – Pausa curta: Levante, respire, tome água.</li>
                  <li>15:00 – Pausa longa: Descanse de verdade, recarregue a mente.</li>
                </ListaResposta>
              </RespostaPergunta>
            </DetalhesPergunta>
          </ContainerPergunta>
        </ContainerPomodoro>
      </DashboardMainPomodoro>
    </DashBoardContainer>
  );
};

export default Pomodoro;