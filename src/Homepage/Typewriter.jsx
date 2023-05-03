import React from 'react';

import Typewriter from "typewriter-effect";

function TypeWriter() {
    
    return ( 
        <div className="Typewriter">

            <Typewriter
                            
                options={{
                    loop: true,
                }}
                
                onInit={(typewriter)=> {
                    typewriter
                    .typeString("Ethereum")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Binance")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Polygon")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Avalanche")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Fantom")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Arbitrum")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Optimism")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("IoTeX")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("SKALE")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Aurora")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Gnosis")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Celo")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Harmony")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Moonbeam")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Godwoken")
                    .start();
                }}
            />
      </div>

     );
}

export default TypeWriter;