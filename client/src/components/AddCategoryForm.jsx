import { useBudget } from "../context/BudgetContext"

export default function AddCategoryForm() {
    const { addCategory } = useBudget();
    const handleSubmit = (e) => {
        e.preventDefault();
        const categoryName = e.target.categoryName.value.trim();
        if (categoryName) {
            addCategory(categoryName);
            e.target.categoryName.value = '';
        }
    };

  return (
    <div className="categoryadd">
        <h4>Add New Category</h4>
        <form className="categoryadd__form" onSubmit={handleSubmit}>
            <label htmlFor="categoryName">Category Name:</label>
            <input type="text" id="categoryName" name="categoryName" required placeholder='Introduce Category' />
            <button type="submit" className="categoryadd__submit">Add</button>
        </form>
      
    </div>
  )
}
