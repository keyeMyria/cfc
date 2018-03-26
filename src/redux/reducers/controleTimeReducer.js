import {MODIFICA_TIME} from '../actions/types';

const INITIAL_STATE = {
    
  timeMontado:[
               /* {
                  apelido:null,
                }*/
              ],
  
  };
  
  // ====================================
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case MODIFICA_TIME:
        return { ...state, timeMontado: [
                                        {
                                          apelido:action.apelido,
                                          atletaId:action.atletaId,
                                        },
                                        ...state.timeMontado
                                        ]  };
      
      default:
        return state;
    }
  };
  