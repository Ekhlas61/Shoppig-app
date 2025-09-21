import React from 'react'
import { categoryInfos } from './catagoryFullInfos'
import CategoryCard from './CategoryCard'
import classes from './Category.module.css'
const Category = () => {
  return (
   <section className={classes.category__container}>
    {
        categoryInfos?.map((infos,index)=>{
            return <CategoryCard 
            key={infos.name ||index}
            data={infos }/>
        })
    }
   </section>
  )
}

export default Category