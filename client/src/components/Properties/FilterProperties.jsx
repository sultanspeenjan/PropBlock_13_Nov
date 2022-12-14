import React from "react";
import "../../styling/Properties/FilterProperties.scss";
import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";
import { Checkbox, Button } from "@web3uikit/core";
import { Radio, Select, Input } from "antd";
const console = require("console-browserify");
const { Option } = Select;

class FilterProperties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldMin: this.props.minPrice,
      oldMax: this.props.maxPrice,
      facilitiesOptions: [
        { value: 1, label: "Free Parking" },
        { value: 2, label: "Kitchen" },
        { value: 4, label: "Security" },
        { value: 8, label: "Free WiFi" },
        { value: 16, label: "Coffee Maker" },
        { value: 64, label: "Swimming Pool" },
        { value: 128, label: "24 hour access" },
        { value: 256, label: "TV Access" },
      ],
    };
    this.handleFacilities = this.handleFacilities.bind(this);
  }

  //only made it for lowest number (least option)
  handleFacilities(arr) {
    if (arr.length > 0) {
      var lowest = Math.min(...arr);
      this.props.parentCallBack("facilities", lowest);
    } else this.props.parentCallBack("facilities", 0);
  }

  render() {
    return (
      <div className="filter-properties">
        <div className="inner-rectangle">
          <div className="upper-body">Filters</div>
          <div className="filter-body">
            <div className="filterProperty">
              <p>Price</p>
              <MultiRangeSlider
                className="slider"
                min={this.props.minPrice}
                max={this.props.maxPrice}
                onChange={({ min, max }) => {
                  //because this object calls onchange
                  //when it is contructed, i placed
                  //a check to prevent that
                  if (min != this.state.oldMin || max != this.state.oldMax) {
                    this.props.parentCallBack("prices", {
                      minPrice: min,
                      maxPrice: max,
                    });
                    this.setState({ oldMin: min, oldMax: max });
                  }
                }}
              />
            </div>
            <div className="filterProperty">
            <hr></hr>
            <p>Minimum Beds</p>
            <Input
              placeholder="0"
              label="minimum beds?"
              name="bedsNumber"
              onChange={(e) =>
                this.props.parentCallBack("minimumBeds", e.target.value)
              }
              type="number"
              min="0"
              max="20"
            />
            <hr></hr>
            <p>Minimum Baths</p>
            <Input
              placeholder="0"
              label="minimum beds?"
              name="bedsNumber"
              onChange={(e) =>
                this.props.parentCallBack("minimumBaths", e.target.value)
              }
              type="number"
              min="0"
              max="20"
              
            />
            <hr></hr>
            <p>Facilities</p>
            <Select
              mode="tags"
              size={"medium"}
              placeholder="Please select"
              onChange={this.handleFacilities}
              style={{ width: "100%", margin: "0 0 2rem 0" }}
              options={this.state.facilitiesOptions}
            />
          </div>
          {!this.props.isLoading ? (
            <button
              className="filter-button"
              onClick={() => {
                this.props.loadPropertiesParent();
              }}
            >
              Filter Properties
            </button>
          ) : (
            <button className="filter-loading">Loading ...</button>
          )}
        </div>
      </div>
      </div>
    );
  }
}

export default FilterProperties;
