const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange, onPrevClick, onNextClick }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex mx-auto w-fit">
            <button onClick={onPrevClick} hidden={currentPage === 1} className="w-16 text-xl border-none rounded-full mx-3 font-normal" id="hoverBtn">
            Prev
            </button>
            <ul >
                {pageNumbers.map((number) => (
                    <button onClick={() => onPageChange(number)}>
                        <li key={number} className="w-10 text-xl border-none rounded-full mx-3 font-medium" id="hoverBtn">
                            {number}
                        </li>
                    </button>
                ))}
            </ul>
            <button
                onClick={onNextClick}
                hidden={currentPage === Math.ceil(totalItems / itemsPerPage)}
                className="w-16 text-xl border-none rounded-full mx-3 font-normal" id="hoverBtn"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;