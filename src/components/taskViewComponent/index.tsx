import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function TaskView({ open, onClose, viewData }: any) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Task View</DialogTitle>
          <div className=" bg-white rounded-lg shadow-md p-4">
            <div className=" mb-4 pb-2">
              <p>
                <span className="font-semibold">Task Name:</span>{" "}
                {viewData?.data?.taskName}
              </p>
              <p>
                <span className="font-semibold">Assignee Name:</span>{" "}
                {viewData?.data?.user}
              </p>
              <p>
                <span className="font-semibold">Estimation:</span>{" "}
                {viewData?.data?.estimation}
              </p>
              <p>
                <span className="font-semibold">Priority:</span>{" "}
                {viewData?.data?.priority}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {viewData?.data?.taskStatus}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {viewData?.data?.description}
              </p>
            </div>
            {viewData?.childData?.length > 0 ? (
              <div>
                <div className="font-semibold mb-2">Sub Task</div>
                <div className="h-[200px] overflow-y-auto">
                  {viewData?.childData?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded p-2 mb-2"
                    >
                      <p>
                        <span className="font-semibold">S. No. </span>{" "}
                        {index + 1}
                      </p>
                      <p>
                        <span className="font-semibold">Task Name:</span>{" "}
                        {item?.taskName}
                      </p>
                      <p>
                        <span className="font-semibold">Assignee Name:</span>{" "}
                        {item?.user}
                      </p>
                      <p>
                        <span className="font-semibold">Estimation:</span>{" "}
                        {item?.estimation}
                      </p>
                      <p>
                        <span className="font-semibold">Priority:</span>{" "}
                        {item?.priority}
                      </p>
                      <p>
                        <span className="font-semibold">Status:</span>{" "}
                        {item?.taskStatus}
                      </p>
                      <p>
                        <span className="font-semibold">Description:</span>{" "}
                        {item?.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
