import {MODIFICA_TIME, TROCA_CAPITAO, SALVA_ESCALACAO_JSON} from '../actions/types';

const INITIAL_STATE = {
  
  esquemaId:null,
  capitao:null,
  atletas:[],
  escalacaoJson:null,
  timeSalvo:true,

  
  };
  
  // ====================================
  export default (state = INITIAL_STATE, action) => {
   
    switch (action.type) {
      case MODIFICA_TIME:
        return { ...state,
                  esquemaId:action.esquemaId,
                  capitao:action.capitao, 
                  atletas: [...state.atletas, action.atletaId]
                };
        
      case TROCA_CAPITAO:
      return { ...state,
                capitao:action.capitao,
                timeSalvo:false
              };
      case SALVA_ESCALACAO_JSON:
      return{
        ...state,
        escalacaoJson:action.dados,
      }
      
      case 'testeBotao':
      return{
        ...state, timeSalvo:true
      }
      
      default:
        return state;
    }
  };
  