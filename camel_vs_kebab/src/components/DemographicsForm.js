import React, { useContext } from 'react';
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

function DemographicsForm() {
  const { formData, setFormData } = useContext(DataContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the experiment page
    navigate('/experiment');
  };

  return (
    <div class="wrapper">
      <header>
        <h1>Demographics Form</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="form-container">
          <label className="form-label">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-label">
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-label">
            Programming Experience:
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="" disabled>
                Select your experience
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </main>
      <footer>
        <p>Experimentation & Evaluation - 2024</p>
      </footer>
    </div>
  );
}

export default DemographicsForm;
