import React, {Component} from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Welcome from './pages/welcome';
import Parciais from './pages/parciais';
import Ligas from './pages/ligas';
import Times from './pages/times';

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
                                showLabel:false,
                                activeTintColor:colors.white,
                                inactiveTintColor:colors.whiteTransparent,
                                style:{
                                    backgroundColor:colors.secundary,
                                }
                            }
                        }
                ) }
        // fecha parciais ======================================================
    },
     
     // Abre configs do Drawer ======================================================
     {
         initialRouteName:'Parciais',
         drawerPosition:'right',

         drawerOpenRoute: "DrawerOpen",
         drawerCloseRoute: "DrawerClose",
         drawerToggleRoute: "DrawerToggle",

        
         contentOptions:{
         activeTintColor:'#000',
         inactiveTintColor:'#FFF',
         activeBackgroundColor:'#FAFAFA',
         
     
            // labelStyle:{
            //     color:'#FFF',
            // },
        },
     }
 
)

export default createNavigator;