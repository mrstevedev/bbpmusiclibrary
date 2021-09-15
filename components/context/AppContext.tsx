import { useState, useEffect, createContext } from 'react'

export const AppContext = createContext([ {}, () => {} ]);

interface Props {
    children: object
}

export const AppProvider = ( props: Props ) => {
    const [ cart, setCart ] = useState<any>( null )

    useEffect(() => {

        if(process.browser) {
            let cartData = localStorage.getItem( 'product' )
            cartData = null !== cartData ? JSON.parse( cartData ) : ''

            setCart( cartData )
        }  
    }, [])
    return (
        <AppContext.Provider value={ [ cart, setCart ] }>
            { props.children }
        </AppContext.Provider>
    )
}
