import React, { use, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  // console.log(products);
  const [showFilter, setshowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [sortType, setSortType] = useState('relevant')
  // function CategorySelector() {
  // // State to store selected categories
  // const [category, setCategory] = useState([]);

  // // Function to handle checkbox changes
  // const toggleCategory = (event) => {
  //   // Get the value of the clicked checkbox
  //   const selectedValue = event.target.value;

  //   // Check if this value already exists in our category state
  //   const isAlreadySelected = category.includes(selectedValue);

  //   if (isAlreadySelected) {
  //     // If the category is already selected, remove it from the array
  //     const updatedCategories = category.filter((item) => item !== selectedValue);
  //     setCategory(updatedCategories);
  //   } else {
  //     // If the category is not selected, add it to the array
  //     const updatedCategories = [...category, selectedValue];
  //     setCategory(updatedCategories);
  //   }
  // };
  const toggleCategory=(e)=>{ 
    if(category.includes(e.target.value)){ 
    setCategory(prev=> prev.filter(item => item !== e.target.value )) 
  }else{ 
    setCategory(prev=> [...prev , e.target.value]) 
  } 
}
  const togglesubCategory=(e)=>{ 
    if(subCategory.includes(e.target.value)){ 
    setSubCategory(prev=> prev.filter(item => item !== e.target.value )) 
  }else{ 
    setSubCategory(prev=> [...prev , e.target.value]) 
  } 
}

const applyFilter = ()=>{
  let productCopy = products.slice();

  if(search && showSearch){
    productCopy = productCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
  }

  if(category.length>0){
    productCopy = productCopy.filter(item=> category.includes(item.category));
  }

  if(subCategory.length>0){
    productCopy = productCopy.filter(item=>subCategory.includes(item.subCategory));
  }
  setFilterProducts(productCopy);
}

const sortProducts = ()=>{
   let fproductCopy = filterProducts.slice();

   switch(sortType){
    case 'low-high' :
      setFilterProducts(fproductCopy.sort((a,b)=>(a.price - b.price)));
      break;

    case 'high-low' :
      setFilterProducts(fproductCopy.sort((a,b)=>(b.price - a.price)));
      break;

    default :
    applyFilter();
    break;
   }
}
  useEffect(()=>{
    setFilterProducts(products)
  },[])

  // useEffect(()=>{console.log(subCategory)
  // },[subCategory]);

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search, showSearch])

  useEffect(()=>{
    sortProducts();
  },[sortType])
  return (
    <div className="flex flex-col sm:flex-row border-t gap-1 sm:gap-10 pt-10">
      {/* Left side filter options */}
      <div className="min-w-60">
        <p onClick={()=>setshowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
        <img className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} src={assets.dropdown_icon} />
        </p>
      
      <div className={`border border-gray-300 pl-5 py-3 mt-5 ${showFilter? '' : 'hidden'}`}>
        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Men'} onChange={toggleCategory}/> Men
          </p>
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Women'} onChange={toggleCategory}/> Women
          </p>
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Kids'} onChange={toggleCategory}/> Kids
          </p>
        </div>
      </div>
      <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter? '' : 'hidden'}`}>
        <p className="mb-3 text-sm font-medium">TYPE</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Topwear'} onChange={togglesubCategory}/> Topwear
          </p>
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Bottomwear'} onChange={togglesubCategory}/> Bottomwear
          </p>
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Winterwear'} onChange={togglesubCategory}/> Winterwear
          </p>
        </div>
      </div>
      </div>
      {/* Right side products */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item,index)=>(
            <ProductItem key={index} name={item.name} price={item.price} id={item._id} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
