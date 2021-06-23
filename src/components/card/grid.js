import styles from './grid.module.scss'
import Masonry from 'react-masonry-css'


export default function grids ({children}) {

    

    // const sizes = [ '250px', '280px', '300px', '320px','350px','380px','400px', '420px','450px']
    // const pickRandomSize = () => {
    //     const index = Math.floor(Math.random() * 10)
    //     return sizes[index]
    // }
    const breakPoints = {
        default: 4,
        1100: 3,
        750: 2,
        600: 1
    }

        return (
            <div className= {styles.grid}>
                <Masonry
                    breakpointCols={breakPoints}
                    className= {styles.my_masonry_grid}
                    columnClassName= {styles.my_masonry_grid_column}
                    
                >
                  {children}
                  {/* {
                    slides && slides.length > 0 ?
                    slides.map((slide, index) => (
                      <div key= {index} style= {{ height: pickRandomSize()  }}>
                          <DisplaCard product= {} />
                      </div>  
                      )) : ''
                  } */}
                </Masonry>
            </div>
        )
}