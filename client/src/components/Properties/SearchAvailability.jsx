import React from "react";
import "../../styling/Properties/SearchAvailability.scss";
import {
  TagOutlined,
  SearchOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { AutoComplete, Select, InputNumber, message } from "antd";
import location_icon from "../../assets/location-icon.png";
import property_type_icon from "../../assets/home-icon.png";
import beds_icon from "../../assets/beds-icon.svg";
import price_tag_icon from "../../assets/tag-icon.png";

const SearchAvailability = (props) => {
  const countryOptions = [
    {
      value: "Abu Dhabi",
    },
    {
      value: "Dubai",
    },
    {
      value: "Ajman",
    },
    {
      value: "Sharjah",
    },
    {
      value: "Ras Al Khaima",
    },
    {
      value: "Umm Al Quwain",
    },
    {
      value: "Fujairah",
    },
    {
      value: "Al Ain",
    },
  ];
  const { Option } = Select;

  return (
    <div className="searchBar">
      <div className="locationFilter">
        <div className="filterDiv">
          <label htmlFor="location">Location </label>
          <img src={location_icon} alt="location_icon" />
        </div>
        <div className="inputDiv">
          <AutoComplete
            id="location"
            style={{
              width: "100%",
            }}
            onChange={(e) => {
              props.parentCallBack("city", e)
            }}
            options={countryOptions}
            placeholder={props.filterValues.city.length == 0 ? "All" : props.filterValues.city}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </div>
      </div>
      <div className="horizontal_line"></div>
      <div className="propertyTypeFilter">
        <div className="filterDiv">
          <label htmlFor="location">Property Type</label>
          <img src={property_type_icon} alt="property_icon" />
        </div>
        <div className="inputDiv">
          <Select
            placeholder={
              (props.filterValues.propertyType === undefined || props.filterValues.propertyType.length == 0)
               ? "All" : props.filterValues.propertyType
            }
            style={{
              width: "100%",
            }}
            onChange={(e) => {
              props.parentCallBack("propertyType", e)
            }}
          >
            <Option value="">All</Option>
            <Option value="apartment">Apartment</Option>
            <Option value="villa">Villa</Option>
            <Option value="townhouse">Townhouse</Option>
            <Option value="penthouse">Penthouse</Option>
            <Option value="duplex">Duplex</Option>
          </Select>
        </div>
      </div>
      <div className="horizontal_line"></div>
      <div className="priceFilter">
        <div className="filterDiv">
          <label htmlFor="location">Max Price</label>
          <img src={price_tag_icon} alt="price_icon" />
        </div>
        <div className="inputDiv">
          <InputNumber
            style={{
              width: "100%",
            }}
            value={props.filterValues.prices.maxPrice}
            onChange={(e) => props.parentCallBack("prices", {
              minPrice: props.filterValues.minPrice,
              maxPrice: e
            })}
            defaultValue="1"
            min="0"
            max="10000000"
          />
        </div>
      </div>
      <div id="searchButton" onClick={() => {props.loadProperties()}}>
        <SearchOutlined className="searchBarIcon" />
      </div>
    </div>
  );
};

export default SearchAvailability;
