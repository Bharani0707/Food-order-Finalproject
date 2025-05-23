import React from "react";
import "./ViewMenu.css";
import { menu_list } from "../../../assets/assets";

const ViewMenu = ({ category, setCategory }) => {
  return (
    <>
      <div className="ViewMenu" id="menu">
        <h2>
          Explore Our <span>Menu</span>
        </h2>
        <p className="ViewMenu-text">
          Explore a rich and diverse menu featuring all your favorite Indian
          dishes, from spicy curries to flavorful biryanis and more.
        </p>
        <div className="menu-list">
          {menu_list.map((item, index) => {
            return (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name
                  )
                }
                key={index}
                className="menu-list-item"
              >
                <img
                  className={category === item.menu_name ? "active" : ""}
                  src={item.menu_image}
                  alt=""
                ></img>
                <p>{item.menu_name}</p>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </>
  );
};

export default ViewMenu;
