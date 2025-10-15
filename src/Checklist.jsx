import React from 'react';
import './Checklist.css';

const Checklist = () => {
  const clearChecklist = () => {
    if (confirm("Are you sure you want to clear the checklist? This is usually done at the start of a new inventory shift.")) {
      const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
      });
    }
  };

  const items = {
    "Poke Work Station - Top of the Table": [
      "Cooked White Rice",
      "Cooked Brown Rice",
      "Furikake",
      "Dried Shallots",
      "Dried Garlic",
      "Crispy Jalapenos",
      "Mixed G/S/F (Garlic, Shallots, Furikake)",
      "Pumpkin Seeds",
      "Nori Sheets"
    ],
    "Poke Work Station - Bottom of the Table (Storage)": [
      "Salmon Crackling",
      "White Rice (Dry, Bulk)",
      "Brown Rice (Dry, Bulk)",
      "Macaroni (Dry, Bulk)"
    ],
    "Inside the Salad Fridge - Top Section": [
      "Spring Mix",
      "Macaroni (Cooked/Prepped)",
      "Smoked Salmon",
      "Quinoa (Cooked)",
      "Wasabi",
      "Cheddar Cheese Slices",
      "Swiss Cheese Slices",
      "Shredded Cheddar Cheese",
      "Seaweed Tubs",
      "Shredded Cabbage",
      "Onions (Sliced/Rings)",
      "Tomatoes (Sliced/Rings)",
      "Lettuce (Sliced/Leaves)",
      "Zucchini Noodles (Prepped)",
      "Caramelized Onions",
      "Salted Butter",
      "Unsalted Butter"
    ],
    "Inside the Salad Fridge - Bottom Section": [
      "Butter Mochi Pancake Batter",
      "Coconut Macnut Pancake Batter",
      "Malasadas Dough",
      "Mochisadas Dough",
      "White Gravy (Bulk)",
      "Brown Gravy (Bulk)",
      "Macaroni Salad",
      "Wannabe Crab (Surimi)",
      "Potato Salad"
    ],
    "Shaved Ice Fridge (General Cold Storage)": [
      "Tomatoes (Bulk/Diced)",
      "Diced Carrots",
      "Diced Onions",
      "Diced Celery",
      "Lettuce (Bulk/Chopped)",
      "Meatloaf (Prepped/Patties)",
      "Kalua Pork",
      "Elvis Fried Rice (Prepped Batch)",
      "Mochiko Chicken (Marinated/Prepped)",
      "Grounded Ahi (Patty Mix)",
      "Chicken Breast (Raw/Prepped)"
    ]
  };

  return (
    <div className="container">
      <h1>Poke Ingredient Inventory Checklist</h1>
      <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Organized by station for efficient counting.</p>

      <div id="checklist">
        {Object.entries(items).map(([station, ingredients], index) => (
          <div key={station}>
            <h2>{`${index + 1}. ${station}`}</h2>
            {ingredients.map(ingredient => {
              const id = ingredient.toLowerCase().replace(/\s+/g, '-');
              return (
                <div className="checklist-item" key={id}>
                  <input type="checkbox" id={id} />
                  <label htmlFor={id}>{ingredient}</label>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={clearChecklist}>Clear Checklist for New Shift</button>
      </div>
    </div>
  );
};

export default Checklist;
