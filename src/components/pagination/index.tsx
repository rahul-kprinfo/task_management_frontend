import {
    ChevronLeftIcon,
    ChevronRightIcon,
  } from "@radix-ui/react-icons"
  import { Button } from "../ui/button"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"
  
  import { useEffect, useState } from "react"
  
  export function DataTablePagination(props: any) {
    const { setSkip, setTake, skip, take } = props
    const itemsPerPageOptions = [10, 20, 50, 100];
  
    // const [sorting, setSorting] = useState<SortingState>([]);
  
    const [pagesCards, setPageCards] = useState<any>([])
  
    let totalPages = Math.ceil(props?.totalPages / take)
  
    useEffect(() => {
      // intial setup for the multipaginations
      if (totalPages > 4 && totalPages > 0 && skip < totalPages) {
        if (skip === 1) setPageCards([skip, skip + 1, skip + 2])
        if (skip === 2) setPageCards([skip - 1, skip, skip + 1])
        if (skip === 3) setPageCards([skip - 2, skip - 1, skip, skip + 1])
        if (skip > 3) setPageCards([skip - 1, skip, skip + 1])
      }
      if (skip === totalPages) {
        setPageCards([skip - 2, skip - 1, skip])
  
      }
      if (totalPages <= 4) {
        totalPages === 4 ? setPageCards([1, 2, 3, 4]) :
          totalPages === 3 ? setPageCards([1, 2, 3]) :
            totalPages === 2 ? setPageCards([1, 2]) :
              setPageCards([1])
      }
    }, [skip, totalPages])
  
    // Math.ceil(props?.totalPages / take)
  
    // props?.setSkip(startIndex);
    // props?.setTake(pageSize);
  
    const handlePageChange = (page: any) => {
      setSkip(page);
    };
  
    console.log("props", pagesCards, skip, totalPages);
  
  
    const paginationsForGreater = () => {
      return (
        <>
          {totalPages > 1 && (
            <div className="space-x-2 flex items-center gap-2">
              {/* Previous Page Button */}
              <Button
                onClick={() => handlePageChange(skip - 1)}
                disabled={skip === 1}
                className={`rounded-md ${skip === 1
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-black bg-white"
                  } border border-black w-6 h-6`}
                variant="outline"
                size="icon"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
  
              {/* Last First Button */}
              {skip > 3 &&
                <Button
                  onClick={() => handlePageChange(1)}
                  className={`rounded-md mx-1 px-3 py-1 ${skip === 1
                    ? "text-white cursor-not-allowed"
                    : "text-black bg-white"
                    } border hover:text-white border-black w-6 h-6`}
                >
                  {1}
                </Button>
              }
  
  
              {skip > 3 && "..."}
              {pagesCards.map((data: any) => {
                if (data !== 0) {
                  return (
                    <Button
                      onClick={() =>
                        handlePageChange(
                          data
                        )
                      }
                      className={`mx-1 px-3 py-1 rounded-md ${skip ===
                        data
                        ? "text-white cursor-not-allowed"
                        : "text-black bg-white"
                        } border border-black hover:text-white w-6 h-6`}
                    >
                      {data}
                    </Button>
                  )
                }
  
              })}
  
              {totalPages > 4 && skip < totalPages - 2 && "..."}
  
              {/* Last Page Button */}
              {totalPages > 1 && skip < totalPages - 1 && (
                <Button
                  onClick={() => handlePageChange(totalPages)}
                  className={`rounded-md mx-1 px-3 py-1 ${skip === totalPages
                    ? "text-white cursor-not-allowed"
                    : "text-black bg-white"
                    } border hover:text-white border-black w-6 h-6`}
                >
                  {totalPages}
                </Button>
              )}
  
              {/* Next Page Button */}
              <Button
                onClick={() => handlePageChange(skip + 1)}
                disabled={skip === totalPages}
                className={`rounded-md ${skip === totalPages
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-black bg-white"
                  } border border-black w-6 h-6`}
                variant="outline"
                size="icon"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          )}</>
      )
    }
  
  
    const paginationsForSmallValue = () => {
      return (
        <>
          <div className="space-x-2 flex items-center gap-2">
            <Button
              onClick={() => handlePageChange(skip - 1)}
              disabled={skip === 1}
              className={`rounded-md ${skip === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-black bg-white"
                } border border-black w-6 h-6`}
              variant="outline"
              size="icon"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            {pagesCards.map((data: any) => {
              if (data !== 0) {
                return (
  
                  <Button
                    onClick={() =>
                      handlePageChange(
                        data
                      )
                    }
                    className={`mx-1 px-3 py-1 rounded-md ${skip ===
                      data
                      ? "text-white cursor-not-allowed"
                      : "text-black bg-white"
                      } border border-black hover:text-white w-6 h-6`}
                  >
                    {data}
                  </Button>
                )
              }
  
            })}
            <Button
              onClick={() => handlePageChange(skip + 1)}
              disabled={skip === totalPages}
              className={`rounded-md ${skip === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : "text-black bg-white"
                } border border-black w-6 h-6`}
              variant="outline"
              size="icon"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </>
      )
    }
  
  
    return (
      <div className="flex items-center justify-between space-x-2 py-4">
        <Select
          value={`${take}`}
          onValueChange={(value: any) => {
            setTake(Number(value));
            setSkip(1);
            props.table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={take} />
          </SelectTrigger>
          <SelectContent side="top">
            {itemsPerPageOptions.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
  
        {/* {
          totalPages < 4 && 
            {pagesCards.map((data: any) => {
              if (data !== 0) {
                return (
                  <Button
                    onClick={() =>
                      handlePageChange(
                        data
                      )
                    }
                    className={`mx-1 px-3 py-1 rounded-md ${skip ===
                      data
                      ? "text-white cursor-not-allowed"
                      : "text-black bg-white"
                      } border border-black hover:text-white w-6 h-6`}
                  >
                    {data}
                  </Button>
                )
              }
  
            })}
        } */}
        {totalPages <= 4 ? paginationsForSmallValue() : paginationsForGreater()}
  
        {/* Pagination Component */}
  
      </div>
    )
  }