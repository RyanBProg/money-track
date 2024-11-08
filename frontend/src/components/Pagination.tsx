import { useAppContext } from "../context/AppContext";

export default function Pagination() {
  const { currentPage, totalPages, setCurrentPage } = useAppContext();
  return (
    <div className="pagination-bar">
      <button
        className="page-button"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}>
        {"<"}
      </button>
      <span className="page-number">
        {currentPage} of {totalPages}
      </span>
      <button
        className="page-button"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}>
        {">"}
      </button>
    </div>
  );
}
