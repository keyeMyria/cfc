import {MODIFICA_TIME, TROCA_CAPITAO, SALVA_ESCALACAO_JSON} from '../actions/types';

// acao utilizada no controle do state que contem o time montado
export const modificaTime = ( apelido, atletaId, esquemaId, capitao,) => {
    return{
      type:MODIFICA_TIME,
      apelido,
      atletaId,
      esquemaId,
      capitao,
    }
  }

// acao utilizada no controle do state que contem o capita do time
export const trocaCapitao = (capitao) => {

                return{
                type:TROCA_CAPITAO,
                capitao,
                }
        }

// acao utilizada no controle do state que contem o capita do time
export const enviarEscalacao = (capitao) => {

    return{
    type:ENVIAR_ESCALACAO,
    capitao,
    }
}


export const salvaEscalacaoJson = (dados) => {
    return{
        type: SALVA_ESCALACAO_JSON,
        dados
    }
}

export const testeBotao = () => {
    return{
        type:'testeBotao'
    }
}

