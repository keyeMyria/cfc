import {MODIFICA_TIME, TROCA_CAPITAO} from '../actions/types';

// acao utilizada no controle do state que contem o time montado
export const modificaTime = (
                                apelido, 
                                atletaId,
                                esquemaId,
                                capitao,
                            ) => {
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
