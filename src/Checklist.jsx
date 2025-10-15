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

  const saveChecklist = () => {
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const state = {};
    checkboxes.forEach(checkbox => {
      state[checkbox.id] = checkbox.checked;
    });
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'checklist-state.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importChecklist = () => {
    document.getElementById('import-file').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const state = JSON.parse(e.target.result);
          const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
          checkboxes.forEach(checkbox => {
            if (state[checkbox.id] !== undefined) {
              checkbox.checked = state[checkbox.id];
            }
          });
        } catch (error) {
          alert('Error parsing JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const copyState = () => {
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const state = {};
    checkboxes.forEach(checkbox => {
      state[checkbox.id] = checkbox.checked;
    });
    const stateString = JSON.stringify(state, null, 2);
    navigator.clipboard.writeText(stateString).then(() => {
      alert('Checklist state copied to clipboard!');
    }, () => {
      alert('Failed to copy checklist state to clipboard.');
    });
  };

  const pasteState = () => {
    navigator.clipboard.readText().then(stateString => {
      try {
        const state = JSON.parse(stateString);
        const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
          if (state[checkbox.id] !== undefined) {
            checkbox.checked = state[checkbox.id];
          }
        });
        alert('Checklist state loaded from clipboard!');
      } catch (error) {
        alert('Error parsing checklist state from clipboard.');
      }
    }, () => {
      alert('Failed to read checklist state from clipboard.');
    });
  };

  const copyCheckedItems = () => {
    let text = 'Kona Pokehouse Checklist\n\n';
    const stations = Object.entries(items);
    stations.forEach(([station, ingredients]) => {
      const checkedItems = ingredients.filter(ingredient => {
        const id = ingredient.toLowerCase().replace(/\s+/g, '-');
        const checkbox = document.getElementById(id);
        return checkbox && checkbox.checked;
      });

      if (checkedItems.length > 0) {
        text += `## ${station}\n`;
        checkedItems.forEach(item => {
          text += `- [x] ${item}\n`;
        });
        text += '\n';
      }
    });

    if (text === 'Kona Pokehouse Checklist\n\n') {
      text += 'No items checked.';
    }

    navigator.clipboard.writeText(text).then(() => {
      alert('Checklist copied to clipboard as text!');
    }, () => {
      alert('Failed to copy checklist to clipboard as text.');
    });
  };

  const copyMissingItems = () => {
    let text = 'Kona Pokehouse - Missing Items\n\n';
    const stations = Object.entries(items);
    stations.forEach(([station, ingredients]) => {
      const missingItems = ingredients.filter(ingredient => {
        const id = ingredient.toLowerCase().replace(/\s+/g, '-');
        const checkbox = document.getElementById(id);
        return checkbox && !checkbox.checked;
      });

      if (missingItems.length > 0) {
        text += `## ${station}\n`;
        missingItems.forEach(item => {
          text += `- [ ] ${item}\n`;
        });
        text += '\n';
      }
    });

    if (text === 'Kona Pokehouse - Missing Items\n\n') {
      text += 'All items are checked.';
    }

    navigator.clipboard.writeText(text).then(() => {
      alert('Missing items copied to clipboard as text!');
    }, () => {
      alert('Failed to copy missing items to clipboard as text.');
    });
  };

  const generateReport = () => {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    let report = `Kona Pokehouse - Inventory Report\n`;
    report += `Generated on: ${dateTimeString}\n\n`;

    const stations = Object.entries(items);

    report += '--- Items in Stock ---\n\n';
    let checkedItemsFound = false;
    stations.forEach(([station, ingredients]) => {
      const checkedItems = ingredients.filter(ingredient => {
        const id = ingredient.toLowerCase().replace(/\s+/g, '-');
        const checkbox = document.getElementById(id);
        return checkbox && checkbox.checked;
      });

      if (checkedItems.length > 0) {
        checkedItemsFound = true;
        report += `## ${station}\n`;
        checkedItems.forEach(item => {
          report += `- [x] ${item}\n`;
        });
        report += '\n';
      }
    });

    if (!checkedItemsFound) {
      report += 'No items in stock.\n\n';
    }

    report += '--- Missing Items ---\n\n';
    let missingItemsFound = false;
    stations.forEach(([station, ingredients]) => {
      const missingItems = ingredients.filter(ingredient => {
        const id = ingredient.toLowerCase().replace(/\s+/g, '-');
        const checkbox = document.getElementById(id);
        return checkbox && !checkbox.checked;
      });

      if (missingItems.length > 0) {
        missingItemsFound = true;
        report += `## ${station}\n`;
        missingItems.forEach(item => {
          report += `- [ ] ${item}\n`;
        });
        report += '\n';
      }
    });

    if (!missingItemsFound) {
      report += 'All items are in stock.\n\n';
    }

    navigator.clipboard.writeText(report).then(() => {
      alert('Inventory report copied to clipboard!');
    }, () => {
      alert('Failed to copy inventory report to clipboard.');
    });
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
    "Poke Work Station - Bottom of the Table": [
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
      "Onions (Rings)",
      "Tomatoes (Sliced)",
      "Lettuce",
      "Zucchini Noodles",
      "Caramelized Onions",
      "Salted Butter",
      "Unsalted Butter"
    ],
    "Inside the Salad Fridge - Bottom Section": [
      "Butter Mochi Pancake Batter",
      "Coconut Macnut Pancake Batter",
      "Malasadas Dough",
      "Mochisadas Dough",
      "White Gravy",
      "Brown Gravy",
      "Macaroni Salad",
      "Wannabe Crab",
      "Potato Salad"
    ],
    "Shaved Ice Fridge": [
      "Tomatoes",
      "Diced Carrots",
      "Diced Onions",
      "Diced Celery",
      "Lettuce",
      "Meatloaf",
      "Kalua Pork",
      "Elvis Fried Rice",
      "Mochiko Chicken (Marinated/Prepped)",
      "Grounded Ahi",
      "Chicken Breasts"
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
        <button onClick={clearChecklist} className="clear-button">Clear Checklist for New Shift</button>
      </div>

      <div className="actions action-group">
        <button onClick={saveChecklist} className="action-button">Save Checklist</button>
        <button onClick={generateReport} className="action-button">Generate Report</button>
        <button onClick={importChecklist} className="action-button">Import Checklist</button>
        <button onClick={pasteState} className="action-button">Paste State</button>
        <button onClick={copyCheckedItems} className="action-button">Copy Checked Items</button>
        <button onClick={copyMissingItems} className="action-button">Copy Missing Items</button>
        <input type="file" id="import-file" style={{ display: 'none' }} onChange={handleFileChange} accept=".json" />
      </div>
    </div>
  );
};

export default Checklist;
