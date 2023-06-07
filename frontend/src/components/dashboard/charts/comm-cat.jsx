import ReactApexChart from "react-apexcharts";
import {React,useState} from 'react';

const PieChart = () => {
  const [selectedCategory, setSelectedCategory] = useState("health");

  const categories = {
    health: {
      label: "Health",
      data: [
        { community: "Community A", proportion: 30 },
        { community: "Community B", proportion: 40 },
        { community: "Community C", proportion: 30 },
      ],
    },
    education: {
      label: "Education",
      data: [
        { community: "Community X", proportion: 50 },
        { community: "Community Y", proportion: 25 },
        { community: "Community Z", proportion: 25 },
      ],
    },
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const selectedData = categories[selectedCategory].data;
  const series = selectedData.map((item) => item.proportion);
  const labels = selectedData.map((item) => item.community);

  const options = {
    labels: labels,
  };

  return (
    <div>
     <h4>Community-Category</h4>
    
      <select value={selectedCategory} onChange={handleCategoryChange} >
        <option value="health">Health</option>
        <option value="education">Education</option>
      </select>
      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={400}
        />
      </div>
    </div>
  );
};

export default PieChart;