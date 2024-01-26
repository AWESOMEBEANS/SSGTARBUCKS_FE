const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange, onPrevClick, onNextClick }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageGroupSize = 10;
    const totalPageGroups = Math.ceil(totalPages / pageGroupSize);
    const currentGroup = Math.ceil(currentPage / pageGroupSize);

    const startPage = (currentGroup - 1) * pageGroupSize + 1;
    const endPage = Math.min(currentGroup * pageGroupSize, totalPages);

    const pageNumbers = [];

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex mx-auto w-fit">
            <button onClick={onPrevClick} className="w-16 text-xl border-none rounded-full mx-3 font-normal" id="hoverBtn">
                Prev
            </button>
            <ul>
                {pageNumbers.map((number) => (
                    <button key={number} onClick={() => onPageChange(number)}>
                        <li className={`w-10 text-xl border-none rounded-full mx-3 font-medium ${currentPage === number ? 'bg-gray-300' : ''}`} id="hoverBtn">
                            {number}
                        </li>
                    </button>
                ))}
            </ul>
            <button
                onClick={onNextClick}
                className="w-16 text-xl border-none rounded-full mx-3 font-normal" id="hoverBtn"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;