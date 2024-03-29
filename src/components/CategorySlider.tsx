import { FC } from "react";
import { IProduct } from "../interfaces";
import ProductCard from "./ProductCard";
import Slider from "./Slider";
import { useAppSelector } from "../store/hooks";
import { NavLink } from "react-router-dom";

interface IProps {
  categoryTitle: string;
  products: IProduct[];
  seeAllPath: string;
}

const CategorySlider: FC<IProps> = ({
  categoryTitle,
  products,
  seeAllPath,
}) => {
  const isMobile = useAppSelector((state) => state.cart.isMobile);
  if (products.length === 0) {
    return null;
  }
  return (
    <div className="">
      <div className="flex justify-between px-3 md:px-1 ">
        <h2 className="text-base md:text-lg font-bold text-zinc-800">
          {categoryTitle}
        </h2>
        <NavLink
          to={seeAllPath}
          className="text-md font-semibold text-primary cursor-pointer"
        >
          see all
        </NavLink>
      </div>
      {/* ---> slider in desktop <--- */}
      {!isMobile && (
        <Slider>
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </Slider>
      )}
      {/* ---> slider in mobile <--- */}
      {isMobile && (
        <div className="md:hidden mt-2 mb-3 flex gap-2 overflow-auto hide-scrollbar pl-3 pr-3">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} width="7" />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySlider;
