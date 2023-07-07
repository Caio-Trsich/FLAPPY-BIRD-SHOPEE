const sprites = new Image()
sprites.src = './sprites/sprites.png';

let frames = 0
const som_Hit = new Audio()
som_Hit.src = './efeitos/hit.wav'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


function fazColisao(flappyBird, chao) { //[COLISAO COM O CHAO INICIO]
    const flappyBirdY = flappyBird.y + flappyBird.altura 
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY) {
        return true
    }
    return false
} //[COLISAO COM O CHAO INICIO]


const planoFundo = { //[PLANO DE FUNDO INICIO]
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204, 
    desenha() {
        contexto.fillStyle= '#70c5ce'
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoFundo.spriteX, planoFundo.spriteY,
            planoFundo.largura, planoFundo.altura,
            planoFundo.x, planoFundo.y,
            planoFundo.largura, planoFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoFundo.spriteX, planoFundo.spriteY,
            planoFundo.largura, planoFundo.altura,
            (planoFundo.x + planoFundo.largura), planoFundo.y,
            planoFundo.largura, planoFundo.altura,
        );
    },
}  //[PLANO DE FUNDO FIM]


function criaChao() { //[CRIA CHAO INICIO]
    const chao = {
      spriteX: 0,
      spriteY: 610,
      largura: 224,
      altura: 112,
      x: 0,
      y: canvas.height - 112,
      atualiza() {
        const movimentoDoChao = 1;
        const repeteEm = chao.largura / 2;
        const movimentacao = chao.x - movimentoDoChao;
  
        chao.x = movimentacao % repeteEm;
      },
      desenha() {
        contexto.drawImage(
          sprites,
          chao.spriteX, chao.spriteY,
          chao.largura, chao.altura,
          chao.x, chao.y,
          chao.largura, chao.altura,
        );
    
        contexto.drawImage(
          sprites,
          chao.spriteX, chao.spriteY,
          chao.largura, chao.altura,
          (chao.x + chao.largura), chao.y,
          chao.largura, chao.altura,
        );
      },
    };
    return chao;
} //[CRIA CHAO FIM]
  

function criaFlappyBird() { //[FLAPPY BIRD INICIO]
    const flappyBird = { 
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {
                setTimeout( () =>{
                    mudaParaTela(Telas.GAME_OVER);
                }, 100);

                som_Hit.play()
                return
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            {spriteX: 0, spriteY: 0, },
            {spriteX: 0, spriteY: 26, },
            {spriteX: 0, spriteY: 52, },
        ],
        frameAtual: 0,
        atualizaOFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
      

        if(passouOIntervalo) {
            const baseDoIncremento = 1;
            const incremento = baseDoIncremento + flappyBird.frameAtual;
            const baseRepeticao = flappyBird.movimentos.length;
            flappyBird.frameAtual = incremento % baseRepeticao
            }
        },

        desenha() {
            flappyBird.atualizaOFrameAtual();
            const { spriteX , spriteY} = flappyBird.movimentos[flappyBird.frameAtual];

            contexto.drawImage(
                sprites,
                spriteX, spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        },
    }  
    return flappyBird;
} //[FLAPPY BIRD FIM]


const mensagemGetReady = { //[TELA DE INICIO]
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 58,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h,
        );
    }
}  //[TELA DE INICIO FIM]

    
function criaCanos() { //[CANOS INICIO]
    const canos = {
      largura: 52,
      altura: 400,
      chao: {
        spriteX: 0,
        spriteY: 169,
      },
      ceu: {
        spriteX: 52,
        spriteY: 169,
      },
      espaco: 80,
      desenha() {
        canos.pares.forEach(function(par) {
          const yRandom = par.y;
          const espacamentoEntreCanos = 90;
    
          const canoCeuX = par.x;
          const canoCeuY = yRandom; 
  
          // [Cano do Céu]
          contexto.drawImage(
            sprites, 
            canos.ceu.spriteX, canos.ceu.spriteY,
            canos.largura, canos.altura,
            canoCeuX, canoCeuY,
            canos.largura, canos.altura,
          )
          
          // [Cano do Chão]
          const canoChaoX = par.x;
          const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 
          contexto.drawImage(
            sprites, 
            canos.chao.spriteX, canos.chao.spriteY,
            canos.largura, canos.altura,
            canoChaoX, canoChaoY,
            canos.largura, canos.altura,
          )
  
          par.canoCeu = {
            x: canoCeuX,
            y: canos.altura + canoCeuY
          }
          par.canoChao = {
            x: canoChaoX,
            y: canoChaoY
          }
        })
      },
      temColisaoComOFlappyBird(par) {
        const cabecaDoFlappy = globais.flappyBird.y;
        const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
        
        if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
          if(cabecaDoFlappy <= par.canoCeu.y) {
            return true;
          }
  
          if(peDoFlappy >= par.canoChao.y) {
            return true;
          }
        }
        return false;
      },
      pares: [],
      atualiza() {
        const passou100Frames = frames % 100 === 0;
        if(passou100Frames) {
          canos.pares.push({
            x: canvas.width,
            y: -150 * (Math.random() + 1),
          });
        }
  
  
  
        canos.pares.forEach(function(par) {
          par.x = par.x - 2;
  
          if(canos.temColisaoComOFlappyBird(par)) {
              som_Hit.play()
            setTimeout( () =>{
                mudaParaTela(Telas.GAME_OVER);
            }, 100);
            }
            
            if(par.x + canos.largura <= 0) {
            canos.pares.shift();
          }
        });
  
      }
    }
  
    return canos;
  } //[CANOS FIM]
  
   
  function criaPlacar() {   //[PLACAR DE PONTOS INICIO]
    const placar = {
      pontuacao: 0,
      desenha() {
        contexto.font = '35px "VT323"';
        contexto.textAlign = 'right';
        contexto.fillStyle = 'white';
        contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);      
      },
      atualiza() {
        const intervaloDeFrames = 20;
        const passouOIntervalo = frames % intervaloDeFrames === 0;
  
        if(passouOIntervalo) {
          placar.pontuacao = placar.pontuacao + 1;
        }
      }
    }
    return placar;
  } //[PLACAR DE PONTOS FIM]


  
  const mensagemGameOver = { //[GAME OVER INICIO]
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
      contexto.drawImage(
        sprites,
        mensagemGameOver.sX, mensagemGameOver.sY,
        mensagemGameOver.w, mensagemGameOver.h,
        mensagemGameOver.x, mensagemGameOver.y,
        mensagemGameOver.w, mensagemGameOver.h
      );
    }
  } //[GAME OVER FIM]


const globais = {};
let telaAtiva = {}; 
function mudaParaTela(novaTela) { //[MUDAR PARA TELA INICIO]
    telaAtiva = novaTela

    if(telaAtiva.inicializa)
    telaAtiva.inicializa();
}; //[MUDAR PARA TELA FIM]


const Telas = { //[TELAS INICIO]
    INICIO: {
        inicializa() {
           globais.flappyBird = criaFlappyBird();
           globais.chao = criaChao();
           globais.canos = criaCanos();
        },
        desenha() {
            planoFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){
            globais.chao.atualiza();
        }
    }
}; //[TELAS FIM]


Telas.JOGO = {
    inicializa() {
        globais.placar = criaPlacar();
    },
    desenha() {
        planoFundo.desenha();
        globais.canos.desenha();
        globais.placar.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.canos.atualiza();
        globais.placar.atualiza();
        globais.flappyBird.atualiza();
        globais.chao.atualiza();
    }
}; //[TELA ATIVA FIM]


Telas.GAME_OVER = { //[GAME OVER]
    desenha() {
      mensagemGameOver.desenha();
    },
    atualiza() {
      
    },
    click() {
      mudaParaTela(Telas.INICIO);
    }
  } //[GAME OVER]


function loop() { //[LOOP INICIO]
    
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
}; //[LOOP FIM]


window.addEventListener('click', function() { //[CLICK INICIO]
    if(telaAtiva.click){
        telaAtiva.click()
    }
}); //[CLICK FIM]


mudaParaTela(Telas.INICIO);
loop();


