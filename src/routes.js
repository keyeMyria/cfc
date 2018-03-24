import React, {Component} from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Welcome from './pages/welcome';
import Ligas from './pages/ligas';
import Times from './pages/times';
import MeuTime from './pages/meutime';

import {metrics, colors} from './styles';

 const createNavigator = (isLogged = false) => 
    StackNavigator(
    {
        Welcome: {screen: Welcome},
        User: {screen: MyDrawer }
        
    },{
        initialRouteName : isLogged ? 'User' : 'Welcome', 
        headerMode:'none'
    }
);


const MyDrawer = DrawerNavigator(
    {
        Parciais: {screen: TabNavigator(
                        {
                            Ligas: {screen: Ligas},
                            Times: {screen: Times}
                        },
                        {
                            tabBarPosition: 'bottom',
                            tabBarComponent: TabBarBottom,
                            tabBarOptions:{
                                showIcon:true,
                                showLabel:true,
                                activeTintColor:colors.white,
                                inactiveTintColor:colors.whiteTransparent,
                                style:{
                                    backgroundColor:colors.secundary,
                                }
                            }
                        }
                ) ,navigationOptions:{drawerLabel:'Parciais'}},
        MeuTime: {screen: MeuTime}
        // fecha parciais ======================================================
    },
     
     // Abre configs do Drawer ======================================================
     {
        
         initialRouteName:'MeuTime',
         drawerPosition:'right',


         drawerOpenRoute: "DrawerOpen",
         drawerCloseRoute: "DrawerClose",
         drawerToggleRoute: "DrawerToggle",

        
         contentOptions:{
         activeTintColor:'#000',
         inactiveTintColor:'#000',
        // activeBackgroundColor:'#fff',
         
         
     
          // labelStyle:{
              //   color:'#FFF',
              
           //  },
        },
     }
 
)

export default createNavigator;